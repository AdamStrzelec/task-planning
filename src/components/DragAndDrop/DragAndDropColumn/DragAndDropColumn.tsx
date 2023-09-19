import React, { useState } from 'react';
import { DragAndDropItem } from '../DragAndDropItem/DragAndDropItem';
import { DragAndDropHelpers } from '../helpers/DragAndDrop.helpers';
import { DraggedItemMetadataProps } from '../hooks/useDragAndDrop';

interface DragAndDropColumnProps {
	columnId: string;
	items: Record<
		string,
		{
			id: string;
			columnId: string;
			order: number;
			isDragged: boolean;
			posX: number;
			posY: number;
			color: string;
		}
	>;
	draggedItemMetadata: DraggedItemMetadataProps | null;
	onDragItem: (itemId: string | null, posX: number, posY: number) => void;
	onDropItem: (id: string, columnId?: string, order?: number) => void;
}

export const DragAndDropColumn = ({
	columnId,
	items,
	draggedItemMetadata,
	onDragItem,
	onDropItem,
}: DragAndDropColumnProps) => {
	const [slotNumber, setSlotNumber] = useState(0);
	const { getSpaceForCurrentlyDraggedItem } = DragAndDropHelpers;

	return (
		<div style={{ position: 'relative' }}>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: draggedItemMetadata ? 100 : 120,
				}}
			>
				<DragAndDropItem
					id={'1'}
					posX={items['1'].posX}
					posY={items['1'].posY}
					color={items['1'].color}
					isDragged={items['1'].isDragged}
					onDragItem={onDragItem}
					onDropItem={onDropItem}
					spaceForDraggedItem={getSpaceForCurrentlyDraggedItem({
						itemOrder: items['1'].order,
						slotNumber,
						draggedItemHeight: draggedItemMetadata?.itemHeight,
						draggedItemOrder: draggedItemMetadata?.itemOrder,
					})}
				/>
				<DragAndDropItem
					id={'2'}
					posX={items['2'].posX}
					posY={items['2'].posY}
					color={items['2'].color}
					isDragged={items['2'].isDragged}
					onDragItem={onDragItem}
					onDropItem={onDropItem}
					spaceForDraggedItem={getSpaceForCurrentlyDraggedItem({
						itemOrder: items['2'].order,
						slotNumber,
						draggedItemHeight: draggedItemMetadata?.itemHeight,
						draggedItemOrder: draggedItemMetadata?.itemOrder,
					})}
				/>
				<DragAndDropItem
					id={'3'}
					posX={items['3'].posX}
					posY={items['3'].posY}
					color={items['3'].color}
					isDragged={items['3'].isDragged}
					onDragItem={onDragItem}
					onDropItem={onDropItem}
					spaceForDraggedItem={getSpaceForCurrentlyDraggedItem({
						itemOrder: items['3'].order,
						slotNumber,
						draggedItemHeight: draggedItemMetadata?.itemHeight,
						draggedItemOrder: draggedItemMetadata?.itemOrder,
					})}
				/>
				<DragAndDropItem
					id={'4'}
					posX={items['4'].posX}
					posY={items['4'].posY}
					color={items['4'].color}
					isDragged={items['4'].isDragged}
					onDragItem={onDragItem}
					onDropItem={onDropItem}
					spaceForDraggedItem={getSpaceForCurrentlyDraggedItem({
						itemOrder: items['4'].order,
						slotNumber,
						draggedItemHeight: draggedItemMetadata?.itemHeight,
						draggedItemOrder: draggedItemMetadata?.itemOrder,
					})}
				/>
				<DragAndDropItem
					id={'5'}
					posX={items['5'].posX}
					posY={items['5'].posY}
					color={items['5'].color}
					isDragged={items['5'].isDragged}
					onDragItem={onDragItem}
					onDropItem={onDropItem}
					spaceForDraggedItem={getSpaceForCurrentlyDraggedItem({
						itemOrder: items['5'].order,
						slotNumber,
						draggedItemHeight: draggedItemMetadata?.itemHeight,
						draggedItemOrder: draggedItemMetadata?.itemOrder,
					})}
				/>
			</div>
			<div
				onMouseLeave={() => setSlotNumber(0)}
				onMouseUp={() =>
					onDropItem(
						draggedItemMetadata?.itemId || '0',
						columnId,
						slotNumber,
					)
				}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: 101,
					backgroundColor: 'rgba(0, 0, 0, 0.3)',
				}}
			>
				<div
					onMouseOver={() => setSlotNumber(1)}
					style={{
						width: 100,
						height: 100,
					}}
				></div>
				<div
					onMouseOver={() => setSlotNumber(2)}
					style={{
						width: 100,
						height: 100,
					}}
				></div>
				<div
					onMouseOver={() => setSlotNumber(3)}
					style={{
						width: 100,
						height: 100,
					}}
				></div>
				<div
					onMouseOver={() => setSlotNumber(4)}
					style={{
						width: 100,
						height: 100,
					}}
				></div>
				<div
					onMouseOver={() => setSlotNumber(5)}
					style={{
						width: 100,
						height: 100,
					}}
				></div>
				<div
					onMouseOver={() => setSlotNumber(6)}
					style={{
						width: 100,
						height: 100,
					}}
				></div>
			</div>
		</div>
	);
};
