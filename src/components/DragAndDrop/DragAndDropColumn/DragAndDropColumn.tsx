import { isEqual } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import {
	DragAndDropContext,
	Items,
} from 'src/components/DragAndDrop/DragAndDropContainer/DragAndDropContainer';
import { DragAndDropItem } from 'src/components/DragAndDrop/DragAndDropItem/DragAndDropItem';
import { DragAndDropHelpers } from 'src/components/DragAndDrop/helpers/DragAndDrop.helpers';
import {
	onDragItemProps,
	onDropItemProps,
} from 'src/components/DragAndDrop/DragAndDropItem/DragAndDropItem';

interface DragAndDropColumnProps {
	columnId: string;
	items: Items;
	onDragItem: ({
		id,
		posX,
		posY,
		windowPositionX,
		windowPositionY,
		width,
		height,
	}: onDragItemProps) => void;
	onDropItem: ({ id, columnId, order }: onDropItemProps) => void;
}

const DragAndDropColumnComponent = ({
	columnId,
	items,
	onDragItem,
	onDropItem,
}: DragAndDropColumnProps) => {
	const [slotNumber, setSlotNumber] = useState(0);
	const [isMouseOver, setIsMouseOver] = useState(false);
	const { getSpaceForCurrentlyDraggedItem } = DragAndDropHelpers;

	const setCurrentSlot = useCallback((slotNumber: number) => {
		setSlotNumber(slotNumber);
	}, []);

	const {
		height = 0,
		order = 0,
		id: draggedItemId,
		columnId: draggedItemColumnId,
	} = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo,
	);

	const { posX: slotPositionDiffX, posY: slotPositionDiffY } =
		useContextSelector(
			DragAndDropContext,
			(state) => state.slotsPositionDifference,
		);

	const sortedItems = Object.keys(items)
		.map((key) => items[key])
		.sort((a, b) => a.order - b.order);

	return (
		<div
			onMouseDown={() => setIsMouseOver(true)}
			style={{
				position: 'relative',
				minHeight: 700,
				width: 100,
				backgroundColor: 'gray',
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: draggedItemId ? 100 : 120,
				}}
			>
				{sortedItems.map((item) => (
					<DragAndDropItem
						key={item.id}
						id={item.id}
						color={item.color}
						isDragged={item.isDragged}
						onDragItem={onDragItem}
						onDropItem={onDropItem}
						spaceForDraggedItem={getSpaceForCurrentlyDraggedItem({
							itemOrder: item.order,
							slotNumber,
							draggedItemHeight: height,
							draggedItemOrder: order,
							draggedItemColumnId,
							columnId,
							isMouseOver,
						})}
					/>
				))}
			</div>
			<div
				onMouseOver={() => {
					setIsMouseOver(true);
				}}
				onMouseLeave={() => {
					setIsMouseOver(false);
					setSlotNumber(0);
				}}
				onMouseUp={() =>
					onDropItem({
						id: draggedItemId || '',
						columnId,
						order: slotNumber,
					})
				}
				style={{
					position: 'absolute',
					top: `${slotPositionDiffY}px`,
					left: `${slotPositionDiffX}px`,
					zIndex: 101,
					// backgroundColor: 'rgba(0, 0, 0, 0.3)',
					width: '100%',
					height: '100%',
					display: 'flex',
					flexFlow: 'column',
				}}
			>
				{sortedItems.map((item, index) => (
					<ItemSlot
						height={item.height}
						width={item.width}
						setSlotNumber={setCurrentSlot}
						onDropItem={onDropItem}
						slotNumber={index + 1}
						columnId={columnId}
						key={item.id}
					/>
				))}
				<div
					onMouseOver={() => {
						setSlotNumber(
							draggedItemColumnId === columnId
								? sortedItems.length
								: sortedItems.length + 1,
						);
					}}
					style={{
						flexGrow: 1,
						// border: '1px solid white',
					}}
				></div>
			</div>
		</div>
	);
};

type ItemSlotProps = {
	width: number;
	height: number;
	slotNumber: number;
	setSlotNumber: (slot: number) => void;
	columnId: string;
	onDropItem: ({
		id,
		columnId,
		order,
		posX,
		posY,
	}: {
		id: string;
		columnId?: string;
		order?: number;
		posX?: number;
		posY?: number;
	}) => void;
};

const ItemSlotComponent = ({
	width,
	height,
	slotNumber,
	setSlotNumber,
}: ItemSlotProps) => {
	return (
		<div
			onMouseOver={() => setSlotNumber(slotNumber)}
			style={{
				width,
				height,
				// border: '1px solid white',
			}}
		/>
	);
};

const ItemSlot = React.memo(ItemSlotComponent);

export const DragAndDropColumn = React.memo(
	DragAndDropColumnComponent,
	(prevProps, newProps) => {
		return (
			prevProps.columnId === newProps.columnId &&
			isEqual(prevProps.items, newProps.items) &&
			prevProps.onDragItem === newProps.onDragItem &&
			prevProps.onDropItem === newProps.onDropItem
		);
	},
);
