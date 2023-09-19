import React, { useState } from 'react';
import { DragAndDropColumn } from '../DragAndDropColumn/DragAndDropColumn';
import { DragAndDropItem } from '../DragAndDropItem/DragAndDropItem';
import { DragAndDropHelpers } from '../helpers/DragAndDrop.helpers';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

export const DragAndDropContainer = () => {
	const { items, onDragItem, onDropItem, draggedItemMetadata } =
		useDragAndDrop();
	const [slotNumber, setSlotNumber] = useState(0);
	const { getSpaceForCurrentlyDraggedItem } = DragAndDropHelpers;

	return (
		<DragAndDropColumn
			columnId={'1'}
			items={items.current}
			onDragItem={onDragItem}
			onDropItem={onDropItem}
			draggedItemMetadata={draggedItemMetadata}
		/>
		// <div style={{ position: 'relative' }}>
		// 	<div
		// 		style={{
		// 			position: 'absolute',
		// 			top: 0,
		// 			left: 0,
		// 			zIndex: draggedItemMetadata ? 100 : 120,
		// 		}}
		// 	>
		// 		<DragAndDropItem
		// 			id={'1'}
		// 			posX={items.current['1'].posX}
		// 			posY={items.current['1'].posY}
		// 			color={items.current['1'].color}
		// 			isDragged={items.current['1'].isDragged}
		// 			onDragItem={onDragItem}
		// 			onDropItem={onDropItem}
		// 			spaceForDraggedItem={getSpaceForCurrentlyDraggedItem({
		// 				itemOrder: items.current['1'].order,
		// 				slotNumber,
		// 				draggedItemHeight: draggedItemMetadata?.itemHeight,
		// 				draggedItemOrder: draggedItemMetadata?.itemOrder,
		// 			})}
		// 		/>
		// 		<DragAndDropItem
		// 			id={'2'}
		// 			posX={items.current['2'].posX}
		// 			posY={items.current['2'].posY}
		// 			color={items.current['2'].color}
		// 			isDragged={items.current['2'].isDragged}
		// 			onDragItem={onDragItem}
		// 			onDropItem={onDropItem}
		// 			spaceForDraggedItem={getSpaceForCurrentlyDraggedItem({
		// 				itemOrder: items.current['2'].order,
		// 				slotNumber,
		// 				draggedItemHeight: draggedItemMetadata?.itemHeight,
		// 				draggedItemOrder: draggedItemMetadata?.itemOrder,
		// 			})}
		// 		/>
		// 		<DragAndDropItem
		// 			id={'3'}
		// 			posX={items.current['3'].posX}
		// 			posY={items.current['3'].posY}
		// 			color={items.current['3'].color}
		// 			isDragged={items.current['3'].isDragged}
		// 			onDragItem={onDragItem}
		// 			onDropItem={onDropItem}
		// 			spaceForDraggedItem={getSpaceForCurrentlyDraggedItem({
		// 				itemOrder: items.current['3'].order,
		// 				slotNumber,
		// 				draggedItemHeight: draggedItemMetadata?.itemHeight,
		// 				draggedItemOrder: draggedItemMetadata?.itemOrder,
		// 			})}
		// 		/>
		// 		<DragAndDropItem
		// 			id={'4'}
		// 			posX={items.current['4'].posX}
		// 			posY={items.current['4'].posY}
		// 			color={items.current['4'].color}
		// 			isDragged={items.current['4'].isDragged}
		// 			onDragItem={onDragItem}
		// 			onDropItem={onDropItem}
		// 			spaceForDraggedItem={getSpaceForCurrentlyDraggedItem({
		// 				itemOrder: items.current['4'].order,
		// 				slotNumber,
		// 				draggedItemHeight: draggedItemMetadata?.itemHeight,
		// 				draggedItemOrder: draggedItemMetadata?.itemOrder,
		// 			})}
		// 		/>
		// 		<DragAndDropItem
		// 			id={'5'}
		// 			posX={items.current['5'].posX}
		// 			posY={items.current['5'].posY}
		// 			color={items.current['5'].color}
		// 			isDragged={items.current['5'].isDragged}
		// 			onDragItem={onDragItem}
		// 			onDropItem={onDropItem}
		// 			spaceForDraggedItem={getSpaceForCurrentlyDraggedItem({
		// 				itemOrder: items.current['5'].order,
		// 				slotNumber,
		// 				draggedItemHeight: draggedItemMetadata?.itemHeight,
		// 				draggedItemOrder: draggedItemMetadata?.itemOrder,
		// 			})}
		// 		/>
		// 	</div>
		// 	<div
		// 		onMouseLeave={() => setSlotNumber(0)}
		// 		style={{
		// 			position: 'absolute',
		// 			top: 0,
		// 			left: 0,
		// 			zIndex: 101,
		// 			backgroundColor: 'rgba(0, 0, 0, 0.3)',
		// 		}}
		// 	>
		// 		<div
		// 			onMouseOver={() => setSlotNumber(1)}
		// 			style={{
		// 				width: 100,
		// 				height: 100,
		// 			}}
		// 		></div>
		// 		<div
		// 			onMouseOver={() => setSlotNumber(2)}
		// 			style={{
		// 				width: 100,
		// 				height: 100,
		// 			}}
		// 		></div>
		// 		<div
		// 			onMouseOver={() => setSlotNumber(3)}
		// 			style={{
		// 				width: 100,
		// 				height: 100,
		// 			}}
		// 		></div>
		// 		<div
		// 			onMouseOver={() => setSlotNumber(4)}
		// 			style={{
		// 				width: 100,
		// 				height: 100,
		// 			}}
		// 		></div>
		// 		<div
		// 			onMouseOver={() => setSlotNumber(5)}
		// 			style={{
		// 				width: 100,
		// 				height: 100,
		// 			}}
		// 		></div>
		// 		<div
		// 			onMouseOver={() => setSlotNumber(6)}
		// 			style={{
		// 				width: 100,
		// 				height: 100,
		// 			}}
		// 		></div>
		// 	</div>
		// </div>
	);
};
