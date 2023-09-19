import React from 'react';
import styled, { css } from 'styled-components';

interface DragAndDropItemProps {
	id: string;
	posX: number;
	posY: number;
	isDragged: boolean;
	color: string;
	onDragItem: (itemId: string | null, posX: number, posY: number) => void;
	onDropItem: (id: string) => void;
	spaceForDraggedItem?: number;
}

export const DragAndDropItemComponent = ({
	id,
	posX,
	posY,
	isDragged,
	color,
	onDragItem,
	onDropItem,
	spaceForDraggedItem = 0,
}: DragAndDropItemProps) => {
	return (
		<DraggableWrapper
			spaceForDraggedItem={spaceForDraggedItem}
			isDragged={isDragged}
		>
			<DraggebleDiv
				style={{
					transform: `translate3d(${posX}px, ${posY}px, ${posY}px)`,
					backgroundColor: `${color}`,
				}}
				isDragged={isDragged}
				onMouseDown={(obj) => {
					onDragItem(
						id,
						Math.abs(obj.pageX - posX),
						Math.abs(obj.pageY - posY),
					);
				}}
				onMouseUp={() => {
					onDropItem(id);
				}}
			></DraggebleDiv>
		</DraggableWrapper>
	);
};

export const DragAndDropItem = React.memo(DragAndDropItemComponent);

const DraggebleDiv = styled.div<{ isDragged?: boolean }>(
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
}>(
	({ spaceForDraggedItem, isDragged }) => css`
		transition: transform 0.3s ease-in-out;
		transform: translateY(${spaceForDraggedItem}px);
		position: relative;
		z-index: ${isDragged ? 10 : 1};
	`,
);
