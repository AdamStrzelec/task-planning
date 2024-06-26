import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { useContextSelector } from 'use-context-selector';
import { isEmpty } from 'lodash';
import { DragAndDropContainerContext } from '../DragAndDropContainer/DragAndDropContainer';
import { createContext } from 'use-context-selector';
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
	padding?: number;
	children?: React.ReactNode;
}

type DragAndDropItemContextProps = {
	parentItemId?: string;
};

export const DragAndDropItemContext =
	createContext<DragAndDropItemContextProps>({
		parentItemId: undefined,
	});

export const DragAndDropItemComponent = ({
	id,
	padding,
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

	const namespace = useContextSelector(
		DragAndDropContext,
		(state) => state.items[id].namespace,
	);

	const { namespace: draggedItemNamespace } = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo,
	);

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

	const shouldItemAnimate = () => {
		return (
			!!droppedItemInfo &&
			droppedItemInfo.id === id &&
			isEmpty(droppedItemInfo.targetPosition)
		);
	};

	const isDragged = draggedItemId === id;

	const { containerId: contId, direction } = useContextSelector(
		DragAndDropContainerContext,
		(state) => state,
	);

	const slotNumber =
		useContextSelector(
			DragAndDropContext,
			(state) =>
				state.itemsSlots?.[namespace]?.[containerId].currentSlotNumber,
		) ?? 0;

	const isMouseOver =
		useContextSelector(
			DragAndDropContext,
			(state) => state.itemsSlots?.[namespace]?.[containerId].isMouseOver,
		) ?? false;

	const { getSpaceForCurrentlyDraggedItem } = DragAndDropHelpers;

	const parentItemId = useContextSelector(
		DragAndDropItemContext,
		(state) => state.parentItemId,
	);

	const parentItemOfDraggedItemId = useContextSelector(
		DragAndDropContext,
		(state) => state.parentItemOfDraggedItemId,
	);

	const setParentItemOfDraggedItemId = useContextSelector(
		DragAndDropContext,
		(state) => state.setParentItemOfDraggedItemId,
	);

	return (
		<DragAndDropItemContext.Provider
			value={{
				parentItemId: id,
			}}
		>
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
					namespace,
					draggedItemNamespace,
				})}
				direction={direction}
				shouldAnimate={shouldWrapperAnimate()}
				zIndex={id === parentItemOfDraggedItemId || isDragged ? 99 : 98}
			>
				<div
					ref={itemRef}
					style={{
						...(shouldItemAnimate() && {
							transition: 'transform 0.2s ease-in-out',
						}),
						transform: `translate3d(${
							!isDragged && x !== 0 ? 100 : x
						}px, ${y}px, 0px)`,
						userSelect: 'none',
						padding: 20,
					}}
					onMouseDown={(event) => {
						event.stopPropagation();
						setParentItemOfDraggedItemId(parentItemId);
						onDragItem({
							id,
							posX: Math.abs(event.pageX - x),
							posY: Math.abs(event.pageY - y),
							clickPositionX: event.pageX,
							clickPositionY: event.pageY,
							windowPositionX:
								itemRef.current?.getBoundingClientRect().x || 0,
							windowPositionY:
								itemRef.current?.getBoundingClientRect().y || 0,
							width:
								itemRef.current?.getBoundingClientRect()
									.width || 0,
							height:
								itemRef.current?.getBoundingClientRect()
									.height || 0,
						});
					}}
					onMouseUp={(event) => {
						event.stopPropagation();
						onDropItem({
							id,
						});
					}}
				>
					{children}
				</div>
			</DraggableWrapper>
		</DragAndDropItemContext.Provider>
	);
};

export const DragAndDropItem = React.memo(DragAndDropItemComponent);

const DraggableWrapper = styled.div<{
	spaceForDraggedItem: number;
	shouldAnimate: boolean;
	direction: 'column' | 'row';
	zIndex: number;
}>(
	({ spaceForDraggedItem, shouldAnimate, direction, zIndex }) => css`
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
		z-index: ${zIndex};
		width: 100%;
	`,
);
