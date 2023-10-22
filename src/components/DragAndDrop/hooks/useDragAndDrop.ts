import { useEffect, useCallback, useState, useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropContainer/DragAndDropContainer';
import {
	onDragItemProps,
	onDropItemProps,
} from 'src/components/DragAndDrop/DragAndDropItem/DragAndDropItem';
import { DragAndDropHelpers } from 'src/components/DragAndDrop/helpers/DragAndDrop.helpers';

export interface DraggedItemMetadataProps {
	itemId: string;
	itemHeight: number;
	itemOrder: number;
}

export const useDragAndDrop = () => {
	const { changeItemsPositionInfoAfterDropItem, getColumnsOfItems } =
		DragAndDropHelpers;

	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [draggedItemPositionDifference, setDraggedItemPositionDifference] =
		useState({ x: 0, y: 0 });

	const {
		items,
		setItems,
		setDraggedItemMetadata,
		draggedItemMetadata,
		setDroppedItemMetadata,
	} = useContextSelector(DragAndDropContext, (state) => state);

	const columnsOfItems = useMemo(() => getColumnsOfItems(items), [items]);

	const handleCursorPosition = (event: MouseEvent) => {
		setCursorPosition({ x: event.pageX, y: event.pageY });
	};

	useEffect(() => {
		window.addEventListener('mousemove', (event) =>
			handleCursorPosition(event),
		);

		return () => {
			window.removeEventListener('mousemove', (event) =>
				handleCursorPosition(event),
			);
		};
	}, []);

	const draggedItemId = useMemo(() => {
		return Object.keys(draggedItemMetadata.draggedItem)[0];
	}, [draggedItemMetadata.draggedItemInfo]);

	useEffect(() => {
		if (draggedItemId) {
			setDraggedItemMetadata({
				...draggedItemMetadata,
				draggedItem: {
					[draggedItemId]: {
						columnId: items[draggedItemId].columnId,
						id: draggedItemId,
						height: items[draggedItemId].height,
						width: items[draggedItemId].width,
						order: items[draggedItemId].order,
						posX:
							cursorPosition.x - draggedItemPositionDifference.x,
						posY:
							cursorPosition.y - draggedItemPositionDifference.y,
					},
				},
			});
		}
	}, [cursorPosition]);

	const onDragItem = useCallback(({ id, posX, posY }: onDragItemProps) => {
		setDraggedItemPositionDifference({ x: posX, y: posY });
		setDroppedItemMetadata({ droppedItemInfo: {} });

		if (id) {
			setDraggedItemMetadata({
				draggedItem: {
					[id]: {
						columnId: items[id].columnId,
						id: id,
						height: items[id].height,
						width: items[id].width,
						order: items[id].order,
						posX: 0,
						posY: 0,
					},
				},
				draggedItemInfo: {
					columnId: items[id].columnId,
					id: items[id].id,
					width: 100,
					height: 100,
					order: items[id].order,
				},
			});
		}
	}, []);

	const onDropItem = useCallback(
		({ id, columnId, order }: onDropItemProps) => {
			if (columnId && order) {
				const draggedItemOrder =
					draggedItemMetadata.draggedItemInfo.order;

				changeItemsPositionInfoAfterDropItem({
					draggedItemId: id,
					draggedItemOrder,
					draggedItemTargetColumnId: columnId,
					draggedItemTargetOrder: order,
					items,
					setItems,
				});
			}

			setDraggedItemPositionDifference({ x: 0, y: 0 });

			setDroppedItemMetadata({
				droppedItemInfo: {
					id,
					...(!!draggedItemMetadata.draggedItemInfo.columnId && {
						startPosition: {
							columnId:
								draggedItemMetadata.draggedItemInfo.columnId,
							order:
								draggedItemMetadata.draggedItemInfo.order || 0,
						},
					}),
					...(!!columnId && {
						targetPosition: { columnId, order: order || 0 },
					}),
				},
			});

			setDraggedItemMetadata({
				draggedItem: {},
				draggedItemInfo: {
					columnId: undefined,
					id: undefined,
					width: undefined,
					height: undefined,
					order: undefined,
				},
			});
		},
		[draggedItemMetadata.draggedItemInfo],
	);

	return {
		columnsOfItems,
		onDragItem,
		onDropItem,
	};
};
