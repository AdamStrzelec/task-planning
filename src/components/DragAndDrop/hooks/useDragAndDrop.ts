import { useState, useCallback } from 'react';
import {
	onDragItemProps,
	onDropItemProps,
} from 'src/components/DragAndDrop/DragAndDropItem/DragAndDropItem';
import { DragAndDropHelpers } from 'src/components/DragAndDrop/helpers/DragAndDrop.helpers';
import { mockedItems } from 'src/components/DragAndDrop/mocks/mockedItems';

export type Items = Record<
	string,
	{
		id: string;
		containerId: string;
		order: number;
		isDragged: boolean;
		color: string;
		width: number;
		height: number;
	}
>;

export type DraggedItemsMetadata = {
	draggedItem: Record<
		string,
		{
			id: string;
			containerId: string;
			order: number;
			posX: number;
			posY: number;
			width: number;
			height: number;
		}
	>;
	draggedItemInfo: Partial<{
		id: string;
		containerId: string;
		width: number;
		height: number;
		order: number;
	}>;
};

export type DroppedItemMetadata = {
	droppedItemInfo: Partial<{
		id: string;
		startPosition: {
			order: number;
			containerId: string;
		};
		targetPosition: {
			order: number;
			containerId: string;
		};
	}>;
};

export type SlotsPositionDifference = {
	posX: number;
	posY: number;
};

export type DraggedItemPositionDifference = {
	posX: number;
	posY: number;
};

export const useDragAndDrop = () => {
	const [items, setItems] = useState<Items>(mockedItems);
	const [draggedItemMetadata, setDraggedItemMetadata] =
		useState<DraggedItemsMetadata>({
			draggedItem: {},
			draggedItemInfo: {
				id: undefined,
				containerId: undefined,
				width: undefined,
				height: undefined,
				order: undefined,
			},
		});
	const [droppedItemMetadata, setDroppedItemMetadata] =
		useState<DroppedItemMetadata>({ droppedItemInfo: {} });
	const [slotsPositionDifference, setSlotsPositionDifference] =
		useState<SlotsPositionDifference>({
			posX: 0,
			posY: 0,
		});

	const [draggedItemPositionDifference, setDraggedItemPositionDifference] =
		useState<DraggedItemPositionDifference>({ posX: 0, posY: 0 });

	const { changeItemsPositionInfoAfterDropItem } = DragAndDropHelpers;

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
			setDraggedItemPositionDifference({ posX, posY });
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

			setDraggedItemPositionDifference({ posX: 0, posY: 0 });

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
		items,
		setItems,
		onDragItem,
		onDropItem,
		draggedItemMetadata,
		droppedItemMetadata,
		slotsPositionDifference,
		draggedItemPositionDifference,
		setDraggedItemMetadata,
		setDroppedItemMetadata,
		setSlotsPositionDifference,
		setDraggedItemPositionDifference,
	};
};
