import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { useContextSelector } from 'use-context-selector';
import { isEmpty } from 'lodash';
import { DragAndDropContainerContext } from '../DragAndDropContainer/DragAndDropContainer';
import { DragAndDropHelpers } from '../helpers/DragAndDrop.helpers';

export interface OnDragItemProps {
	id: string;
	posX: number;
	posY: number;
	clickPositionX: number;
	clickPositionY: number;
	windowPositionX: number;
	windowPositionY: number;
	width: number;
	height: number;
}

export interface OnDropItemProps {
	id: string;
	containerId?: string;
	order?: number;
}

export interface OnItemDimensionsChange {
	id: string;
	width: number;
	height: number;
}

interface DragAndDropItemProps {
	id: string;
	color: string;
	children?: React.ReactNode;
}

export const DragAndDropItemComponent = ({
	id,
	color,
	children,
}: DragAndDropItemProps) => {
	const itemRef = useRef<HTMLDivElement>(null);

	const onItemDimensionsChange = useContextSelector(
		DragAndDropContext,
		(state) => state.onItemDimensionsChange,
	);

	useEffect(() => {
		onItemDimensionsChange({
			id,
			width: itemRef.current?.getBoundingClientRect().width || 0,
			height: itemRef.current?.getBoundingClientRect().height || 0,
		});
	}, [
		itemRef.current?.getBoundingClientRect().width,
		itemRef.current?.getBoundingClientRect().height,
	]);

	const onDragItem = useContextSelector(
		DragAndDropContext,
		(state) => state.onDragItem,
	);

	const onDropItem = useContextSelector(
		DragAndDropContext,
		(state) => state.onDropItem,
	);

	const x =
		useContextSelector(
			DragAndDropContext,
			(state) => state.draggedItemMetadata.draggedItem[id]?.posX,
		) || 0;
	const y =
		useContextSelector(
			DragAndDropContext,
			(state) => state.draggedItemMetadata.draggedItem[id]?.posY,
		) || 0;

	const { containerId, order } = useContextSelector(
		DragAndDropContext,
		(state) => state.items[id],
	);

	const {
		id: draggedItemId,
		order: draggedItemOrder,
		containerId: draggedItemContainerId,
		height: draggedItemHeight,
		width: draggedItemWidth,
	} = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo,
	);

	const { droppedItemInfo } = useContextSelector(
		DragAndDropContext,
		(state) => state.droppedItemMetadata,
	);
	const shouldWrapperAnimate = () =>
		(!!draggedItemId && draggedItemId !== id) ||
		(!!droppedItemInfo.startPosition &&
			droppedItemInfo.startPosition.containerId === containerId &&
			!droppedItemInfo.targetPosition);

	const shouldItemAnimate = () =>
		!!droppedItemInfo &&
		droppedItemInfo.id === id &&
		isEmpty(droppedItemInfo.targetPosition);

	const isDragged = draggedItemId === id;

	const {
		isMouseOver,
		containerId: contId,
		slotNumber,
		direction,
	} = useContextSelector(DragAndDropContainerContext, (state) => state);

	const { getSpaceForCurrentlyDraggedItem } = DragAndDropHelpers;

	return (
		<DraggableWrapper
			spaceForDraggedItem={getSpaceForCurrentlyDraggedItem({
				itemOrder: order,
				slotNumber,
				draggedItemSize:
					direction === 'column'
						? draggedItemHeight
						: draggedItemWidth,
				draggedItemOrder,
				draggedItemContainerId,
				containerId: contId || '',
				isMouseOver,
			})}
			direction={direction}
			isDragged={isDragged}
			shouldAnimate={shouldWrapperAnimate()}
		>
			<DraggebleDiv
				ref={itemRef}
				style={{
					...(shouldItemAnimate() && {
						transition: 'transform 0.2s ease-in-out',
					}),
					transform: `translate3d(${
						!isDragged && x !== 0 ? 100 : x
					}px, ${y}px, 0px)`,
					backgroundColor: `${color}`,
					userSelect: 'none',
					position: 'relative',
				}}
				isDragged={isDragged}
				onMouseDown={(obj) => {
					onDragItem({
						id,
						posX: Math.abs(obj.pageX - x),
						posY: Math.abs(obj.pageY - y),
						clickPositionX: obj.pageX,
						clickPositionY: obj.pageY,
						windowPositionX:
							itemRef.current?.getBoundingClientRect().x || 0,
						windowPositionY:
							itemRef.current?.getBoundingClientRect().y || 0,
						width:
							itemRef.current?.getBoundingClientRect().width || 0,
						height:
							itemRef.current?.getBoundingClientRect().height ||
							0,
					});
				}}
				onMouseUp={() => {
					onDropItem({
						id,
					});
				}}
			>
				{children}
			</DraggebleDiv>
		</DraggableWrapper>
	);
};

export const DragAndDropItem = React.memo(DragAndDropItemComponent);

const DraggebleDiv = styled.div<{
	isDragged?: boolean;
}>(
	({ isDragged }) => css`
		position: relative;
		z-index: ${isDragged ? 10 : 1};
	`,
);

const DraggableWrapper = styled.div<{
	spaceForDraggedItem: number;
	isDragged?: boolean;
	shouldAnimate: boolean;
	direction: 'column' | 'row';
}>(
	({ spaceForDraggedItem, isDragged, shouldAnimate, direction }) => css`
		${shouldAnimate &&
		css`
			transition: transform 0.3s ease-in-out;
		`}
		${direction === 'column'
			? css`
					transform: translateY(${spaceForDraggedItem}px);
			  `
			: css`
					transform: translateX(${spaceForDraggedItem}px);
			  `}
		position: relative;
		z-index: ${isDragged ? 10 : 1};
	`,
);
