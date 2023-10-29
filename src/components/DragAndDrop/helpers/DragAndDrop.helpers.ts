import { Items } from 'src/components/DragAndDrop/hooks/useDragAndDrop';

const getSpaceForCurrentlyDraggedItem = ({
	itemOrder,
	draggedItemOrder = 0,
	slotNumber,
	draggedItemSize = 0,
	draggedItemContainerId,
	containerId,
	isMouseOver,
}: {
	itemOrder: number;
	draggedItemOrder?: number;
	slotNumber: number;
	draggedItemSize?: number;
	draggedItemContainerId?: string;
	containerId: string;
	isMouseOver: boolean;
}) => {
	if (!isMouseOver && draggedItemContainerId === containerId) {
		if (draggedItemOrder < itemOrder) {
			return -draggedItemSize;
		}
	}

	if (draggedItemContainerId && draggedItemContainerId === containerId) {
		if (draggedItemOrder === itemOrder || slotNumber === 0) {
			return 0;
		}
		if (slotNumber >= itemOrder && draggedItemOrder < itemOrder) {
			return -draggedItemSize;
		}
		if (slotNumber <= itemOrder && draggedItemOrder > itemOrder) {
			return draggedItemSize;
		}
	}

	if (
		draggedItemContainerId &&
		draggedItemContainerId !== containerId &&
		isMouseOver
	) {
		if (slotNumber <= itemOrder) {
			return draggedItemSize;
		}
	}

	return 0;
};

const changeItemsPositionInfoAfterDropItem = ({
	items,
	setItems,
	draggedItemOrder,
	draggedItemTargetOrder,
	draggedItemId,
	draggedItemTargetContainerId,
}: {
	items: Items;
	setItems: (items: Items) => void;
	draggedItemOrder?: number;
	draggedItemTargetOrder: number;
	draggedItemId: string;
	draggedItemTargetContainerId: string;
}) => {
	const newItems = { ...items };

	if (newItems[draggedItemId].containerId !== draggedItemTargetContainerId) {
		Object.keys(items).forEach((key) => {
			if (items[key].containerId === draggedItemTargetContainerId) {
				if (items[key].order >= draggedItemTargetOrder) {
					newItems[key].order += 1;
				}
			}
			if (items[draggedItemId].containerId === items[key].containerId) {
				if (items[key].order > items[draggedItemId].order) {
					newItems[key].order -= 1;
				}
			}
		});
		newItems[draggedItemId].containerId = draggedItemTargetContainerId;
		newItems[draggedItemId].order = draggedItemTargetOrder;
	} else {
		Object.keys(items).forEach((key) => {
			if (
				items[key].containerId === draggedItemTargetContainerId &&
				draggedItemOrder &&
				draggedItemOrder < items[key].order &&
				draggedItemTargetOrder >= items[key].order
			) {
				newItems[key].order -= 1;
			}

			if (
				items[key].containerId === draggedItemTargetContainerId &&
				draggedItemOrder &&
				draggedItemOrder > items[key].order &&
				draggedItemTargetOrder <= items[key].order
			) {
				newItems[key].order += 1;
			}
		});
		newItems[draggedItemId].containerId = draggedItemTargetContainerId;
		newItems[draggedItemId].order = draggedItemTargetOrder;
	}
	setItems(newItems);
};

const getContainersOfItems = <
	T extends Record<string, { containerId: string }>,
>(
	items: T,
) => {
	const sortedColumns = Object.keys(items).reduce(
		(accumulator, current) => ({
			...{
				...accumulator,
				[items[current].containerId]: {
					...accumulator[items[current].containerId],
					...{
						[current]: items[current],
					},
				},
			},
		}),
		{} as Record<string, Record<string, any>>,
	);
	return sortedColumns;
};

export const DragAndDropHelpers = {
	getSpaceForCurrentlyDraggedItem,
	changeItemsPositionInfoAfterDropItem,
	getContainersOfItems,
};
