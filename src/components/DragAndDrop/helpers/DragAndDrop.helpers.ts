const getSpaceForCurrentlyDraggedItem = ({
	itemOrder,
	draggedItemOrder = 0,
	slotNumber,
	draggedItemHeight = 0,
}: {
	itemOrder: number;
	draggedItemOrder?: number;
	slotNumber: number;
	draggedItemHeight?: number;
}) => {
	if (draggedItemOrder === itemOrder || slotNumber === 0) {
		return 0;
	}
	if (slotNumber >= itemOrder && draggedItemOrder < itemOrder) {
		return -draggedItemHeight;
	}
	if (slotNumber <= itemOrder && draggedItemOrder > itemOrder) {
		return draggedItemHeight;
	}
	return 0;
};

export const DragAndDropHelpers = {
	getSpaceForCurrentlyDraggedItem,
};
