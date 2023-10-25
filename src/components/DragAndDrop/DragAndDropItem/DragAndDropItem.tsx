import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { useContextSelector } from 'use-context-selector';
import { isEmpty } from 'lodash';
import { DragAndDropContainerContext } from '../DragAndDropContainer/DragAndDropContainer';
import { DragAndDropHelpers } from '../helpers/DragAndDrop.helpers';

export interface onDragItemProps {
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

export interface onDropItemProps {
	id: string;
	containerId?: string;
	order?: number;
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
	const { width, height } = useContextSelector(
		DragAndDropContext,
		(state) => state.items[id],
	);

	//TODO zaimplementować funkcję która będzie zmieniało width i height z poziomu itemu na podstawie children

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

	const {
		id: itemId,
		containerId,
		order,
	} = useContextSelector(DragAndDropContext, (state) => state.items[id]);

	const {
		id: draggedItemId,
		order: draggedItemOrder,
		containerId: draggedItemContainerId,
		height: draggedItemHeight,
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

	const itemRef = useRef<HTMLDivElement>(null);

	const {
		isMouseOver,
		containerId: contId,
		slotNumber,
	} = useContextSelector(DragAndDropContainerContext, (state) => state);

	console.log(isMouseOver + ' ' + contId);

	const { getSpaceForCurrentlyDraggedItem } = DragAndDropHelpers;

	return (
		<DraggableWrapper
			spaceForDraggedItem={getSpaceForCurrentlyDraggedItem({
				itemOrder: order,
				slotNumber,
				draggedItemHeight,
				draggedItemOrder,
				draggedItemContainerId,
				containerId: contId || '',
				isMouseOver,
			})}
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
				width={width}
				height={height}
				onMouseUp={() => {
					onDropItem({
						id,
					});
				}}
			>
				{children}
				{/* <p style={{ margin: 0, padding: 5 }}>id: {itemId}</p>
				<p style={{ margin: 0, padding: 5 }}>col: {containerId}</p>
				<p style={{ margin: 0, padding: 5 }}>order: {order}</p> */}
			</DraggebleDiv>
		</DraggableWrapper>
	);
};

export const DragAndDropItem = React.memo(DragAndDropItemComponent);

const DraggebleDiv = styled.div<{
	isDragged?: boolean;
	width: number;
	height: number;
}>(
	({ isDragged, width, height }) => css`
		width: ${width}px;
		height: ${height}px;
		position: relative;
		z-index: ${isDragged ? 10 : 1};
	`,
);

const DraggableWrapper = styled.div<{
	spaceForDraggedItem: number;
	isDragged?: boolean;
	shouldAnimate: boolean;
}>(
	({ spaceForDraggedItem, isDragged, shouldAnimate }) => css`
		${shouldAnimate &&
		css`
			transition: transform 0.3s ease-in-out;
		`}

		transform: translateY(${spaceForDraggedItem}px);
		position: relative;
		z-index: ${isDragged ? 10 : 1};
	`,
);
