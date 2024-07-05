import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { useContextSelector } from 'use-context-selector';
import { createContext } from 'use-context-selector';
import { DragAndDropHelpers } from '../helpers/DragAndDrop.helpers';
import { useDragAndDropItem } from './useDragAndDropItem';
import { isEqual } from 'lodash';

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

export interface DragAndDropItemProps {
	id: string;
	padding?: number;
	children?: ({
		draggedItemContainerId,
		focusedContainerId,
		draggedItemWidth,
		draggedItemHeight,
	}: {
		draggedItemContainerId: string;
		focusedContainerId: string;
		draggedItemWidth: number;
		draggedItemHeight: number;
	}) => React.ReactNode;
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
	const {
		containerId,
		direction,
		draggedItemContainerId,
		draggedItemHeight,
		draggedItemNamespace,
		draggedItemOrder,
		draggedItemWidth,
		isDragged,
		isMouseOver,
		onDragItem,
		onDropItem,
		order,
		parentItemId,
		parentItemOfDraggedItemId,
		setParentItemOfDraggedItemId,
		shouldItemAnimate,
		shouldWrapperAnimate,
		slotNumber,
		draggedPosX,
		draggedPosY,
		namespace,
		canDisplaySlots,
		focusedContainerId,
	} = useDragAndDropItem({ id });

	const itemRef = useRef<HTMLDivElement>(null);

	const onItemDimensionsChange = useContextSelector(
		DragAndDropContext,
		(state) => state.onItemDimensionsChange,
	);
	const onDimensionsChange = () => {
		onItemDimensionsChange({
			id,
			width: itemRef.current?.getBoundingClientRect().width || 0,
			height: itemRef.current?.getBoundingClientRect().height || 0,
		});
	};
	useEffect(() => {
		onDimensionsChange();
	}, [
		itemRef.current?.getBoundingClientRect().width,
		itemRef.current?.getBoundingClientRect().height,
	]);

	const { getSpaceForCurrentlyDraggedItem } = DragAndDropHelpers;

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
					containerId: containerId || '',
					isMouseOver,
					namespace,
					draggedItemNamespace,
					canDisplaySlots,
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
							!isDragged && draggedPosX !== 0 ? 100 : draggedPosX
						}px, ${draggedPosY}px, 0px)`,
						userSelect: 'none',
						padding: 5,
					}}
					onMouseDown={(event) => {
						event.stopPropagation();
						setParentItemOfDraggedItemId(parentItemId);
						onDimensionsChange();
						onDragItem({
							id,
							posX: Math.abs(event.pageX - draggedPosX),
							posY: Math.abs(event.pageY - draggedPosY),
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
					{children?.({
						draggedItemContainerId: draggedItemContainerId ?? '',
						focusedContainerId: focusedContainerId ?? '',
						draggedItemWidth: draggedItemWidth ?? 0,
						draggedItemHeight: draggedItemHeight ?? 0,
					})}
				</div>
			</DraggableWrapper>
		</DragAndDropItemContext.Provider>
	);
};

export const DragAndDropItem = React.memo(
	DragAndDropItemComponent,
	(prevProps, nextProps) => isEqual(prevProps, nextProps),
);

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
		position: 'relative';
	`,
);
