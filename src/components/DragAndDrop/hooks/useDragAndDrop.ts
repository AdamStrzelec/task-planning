import { useEffect, useCallback, useState, useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
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
	const { changeItemsPositionInfoAfterDropItem, getContainersOfItems } =
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
		setSlotsPositionDifference,
	} = useContextSelector(DragAndDropContext, (state) => state);

	const containersOfItems = useMemo(
		() => getContainersOfItems(items),
		[items],
	);

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
						containerId: items[draggedItemId].containerId,
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

	const onDragItem = useCallback(
		({
			id,
			posX,
			posY,
			windowPositionX,
			windowPositionY,
			clickPositionX,
			clickPositionY,
			width,
			height,
		}: onDragItemProps) => {
			setDraggedItemPositionDifference({ x: posX, y: posY });
			setDroppedItemMetadata({ droppedItemInfo: {} });

			const diffX = clickPositionX - windowPositionX - width / 2;
			const diffY = clickPositionY - windowPositionY - height / 2;
			setSlotsPositionDifference({
				posX: diffX,
				posY: diffY,
			});

			if (id) {
				setDraggedItemMetadata({
					draggedItem: {
						[id]: {
							containerId: items[id].containerId,
							id: id,
							height: items[id].height,
							width: items[id].width,
							order: items[id].order,
							posX: 0,
							posY: 0,
						},
					},
					draggedItemInfo: {
						containerId: items[id].containerId,
						id: items[id].id,
						width: items[id].width,
						height: items[id].height,
						order: items[id].order,
					},
				});
			}
		},
		[],
	);

	const onDropItem = useCallback(
		({ id, containerId, order }: onDropItemProps) => {
			if (containerId && order) {
				const draggedItemOrder =
					draggedItemMetadata.draggedItemInfo.order;

				changeItemsPositionInfoAfterDropItem({
					draggedItemId: id,
					draggedItemOrder,
					draggedItemTargetContainerId: containerId,
					draggedItemTargetOrder: order,
					items,
					setItems,
				});
			}

			setDraggedItemPositionDifference({ x: 0, y: 0 });

			setDroppedItemMetadata({
				droppedItemInfo: {
					id,
					...(!!draggedItemMetadata.draggedItemInfo.containerId && {
						startPosition: {
							containerId:
								draggedItemMetadata.draggedItemInfo.containerId,
							order:
								draggedItemMetadata.draggedItemInfo.order || 0,
						},
					}),
					...(!!containerId && {
						targetPosition: { containerId, order: order || 0 },
					}),
				},
			});

			setDraggedItemMetadata({
				draggedItem: {},
				draggedItemInfo: {
					containerId: undefined,
					id: undefined,
					width: undefined,
					height: undefined,
					order: undefined,
				},
			});

			setSlotsPositionDifference({
				posX: 0,
				posY: 0,
			});
		},
		[draggedItemMetadata.draggedItemInfo],
	);

	return {
		containersOfItems,
		onDragItem,
		onDropItem,
	};
};
