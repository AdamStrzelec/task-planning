import { Items } from 'src/components/DragAndDrop/DragAndDropContainer/DragAndDropContainer';

const getSpaceForCurrentlyDraggedItem = ({
	itemOrder,
	draggedItemOrder = 0,
	slotNumber,
	draggedItemHeight = 0,
	draggedItemColumnId,
	columnId,
	isMouseOver,
}: {
	itemOrder: number;
	draggedItemOrder?: number;
	slotNumber: number;
	draggedItemHeight?: number;
	draggedItemColumnId?: string;
	columnId: string;
	isMouseOver: boolean;
}) => {
	if (!isMouseOver && draggedItemColumnId === columnId) {
		if (draggedItemOrder < itemOrder) {
			return -draggedItemHeight;
		}
	}

	if (draggedItemColumnId && draggedItemColumnId === columnId) {
		if (draggedItemOrder === itemOrder || slotNumber === 0) {
			return 0;
		}
		if (slotNumber >= itemOrder && draggedItemOrder < itemOrder) {
			return -draggedItemHeight;
		}
		if (slotNumber <= itemOrder && draggedItemOrder > itemOrder) {
			return draggedItemHeight;
		}
	}

	if (
		draggedItemColumnId &&
		draggedItemColumnId !== columnId &&
		isMouseOver
	) {
		if (slotNumber <= itemOrder) {
			return draggedItemHeight;
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
	draggedItemTargetColumnId,
}: {
	items: Items;
	setItems: (items: Items) => void;
	draggedItemOrder?: number;
	draggedItemTargetOrder: number;
	draggedItemId: string;
	draggedItemTargetColumnId: string;
}) => {
	const newItems = { ...items };

	if (newItems[draggedItemId].columnId !== draggedItemTargetColumnId) {
		Object.keys(items).forEach((key) => {
			if (items[key].columnId === draggedItemTargetColumnId) {
				if (items[key].order >= draggedItemTargetOrder) {
					newItems[key].order += 1;
				}
			}
			if (items[draggedItemId].columnId === items[key].columnId) {
				if (items[key].order > items[draggedItemId].order) {
					newItems[key].order -= 1;
				}
			}
		});
		newItems[draggedItemId].columnId = draggedItemTargetColumnId;
		newItems[draggedItemId].order = draggedItemTargetOrder;
	} else {
		Object.keys(items).forEach((key) => {
			if (
				items[key].columnId === draggedItemTargetColumnId &&
				draggedItemOrder &&
				draggedItemOrder < items[key].order &&
				draggedItemTargetOrder >= items[key].order
			) {
				newItems[key].order -= 1;
			}

			if (
				items[key].columnId === draggedItemTargetColumnId &&
				draggedItemOrder &&
				draggedItemOrder > items[key].order &&
				draggedItemTargetOrder <= items[key].order
			) {
				newItems[key].order += 1;
			}
		});
		newItems[draggedItemId].columnId = draggedItemTargetColumnId;
		newItems[draggedItemId].order = draggedItemTargetOrder;
	}
	setItems(newItems);
};

const getColumnsOfItems = <T extends Record<string, { columnId: string }>>(
	items: T,
) => {
	const sortedColumns = Object.keys(items).reduce(
		(accumulator, current) => ({
			...{
				...accumulator,
				[items[current].columnId]: {
					...accumulator[items[current].columnId],
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
	getColumnsOfItems,
};
