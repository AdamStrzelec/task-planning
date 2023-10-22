import React from 'react';
import styled, { css } from 'styled-components';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropContainer/DragAndDropContainer';
import { useContextSelector } from 'use-context-selector';
import { isEmpty } from 'lodash';

export interface onDragItemProps {
	id: string;
	posX: number;
	posY: number;
}

export interface onDropItemProps {
	id: string;
	columnId?: string;
	order?: number;
}

interface DragAndDropItemProps {
	id: string;
	isDragged: boolean;
	color: string;
	onDragItem: ({ id, posX, posY }: onDragItemProps) => void;
	onDropItem: ({ id, columnId, order }: onDropItemProps) => void;
	spaceForDraggedItem?: number;
}

export const DragAndDropItemComponent = ({
	id,
	color,
	onDragItem,
	onDropItem,
	spaceForDraggedItem = 0,
}: DragAndDropItemProps) => {
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
		columnId,
		order,
	} = useContextSelector(DragAndDropContext, (state) => state.items[id]);

	const { id: draggedItemId } = useContextSelector(
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
			droppedItemInfo.startPosition.columnId === columnId &&
			!droppedItemInfo.targetPosition);

	const shouldItemAnimate = () =>
		!!droppedItemInfo &&
		droppedItemInfo.id === id &&
		isEmpty(droppedItemInfo.targetPosition);

	const isDragged = draggedItemId === id;

	return (
		<DraggableWrapper
			spaceForDraggedItem={spaceForDraggedItem}
			isDragged={isDragged}
			shouldAnimate={shouldWrapperAnimate()}
		>
			<DraggebleDiv
				style={{
					...(shouldItemAnimate() && {
						transition: 'transform 0.2s ease-in-out',
					}),
					transform: `translate3d(${
						!isDragged && x !== 0 ? 100 : x
					}px, ${y}px, 0px)`,
					backgroundColor: `${color}`,
				}}
				isDragged={isDragged}
				onMouseDown={(obj) => {
					onDragItem({
						id,
						posX: Math.abs(obj.pageX - x),
						posY: Math.abs(obj.pageY - y),
					});
				}}
				onMouseUp={() => {
					onDropItem({
						id,
					});
				}}
			>
				<p style={{ margin: 0, padding: 5 }}>id: {itemId}</p>
				<p style={{ margin: 0, padding: 5 }}>col: {columnId}</p>
				<p style={{ margin: 0, padding: 5 }}>order: {order}</p>
			</DraggebleDiv>
		</DraggableWrapper>
	);
};

export const DragAndDropItem = React.memo(DragAndDropItemComponent);

const DraggebleDiv = styled.div<{
	isDragged?: boolean;
}>(
	({ isDragged }) => css`
		width: 100px;
		height: 100px;
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
