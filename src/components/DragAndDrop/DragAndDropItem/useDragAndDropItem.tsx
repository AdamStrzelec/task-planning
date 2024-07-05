import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { useContextSelector } from 'use-context-selector';
import { isEmpty } from 'lodash';
import { DragAndDropContainerContext } from '../DragAndDropContainer/DragAndDropContainer';
import {
	DragAndDropItemContext,
	DragAndDropItemProps,
} from './DragAndDropItem';

type UseDragAndDropItemProps = Pick<DragAndDropItemProps, 'id'>;

export const useDragAndDropItem = ({ id }: UseDragAndDropItemProps) => {
	const onDragItem = useContextSelector(
		DragAndDropContext,
		(state) => state.onDragItem,
	);

	const onDropItem = useContextSelector(
		DragAndDropContext,
		(state) => state.onDropItem,
	);

	const draggedPosX =
		useContextSelector(
			DragAndDropContext,
			(state) => state.draggedItemMetadata.draggedItem[id]?.posX,
		) || 0;
	const draggedPosY =
		useContextSelector(
			DragAndDropContext,
			(state) => state.draggedItemMetadata.draggedItem[id]?.posY,
		) || 0;

	const canDisplaySlots = useContextSelector(
		DragAndDropContext,
		(state) => state.canDisplaySlots,
	);

	const setCanDisplaySlots = useContextSelector(
		DragAndDropContext,
		(state) => state.setCanDisplaySlots,
	);

	const {
		id: draggedItemId,
		order: draggedItemOrder,
		containerId: draggedItemContainerId,
		height: draggedItemHeight,
		width: draggedItemWidth,
	} = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo,
	);

	const isDragged = draggedItemId === id;

	if (
		(isDragged && !canDisplaySlots && Math.abs(draggedPosX) > 5) ||
		Math.abs(draggedPosY) > 5
	) {
		setCanDisplaySlots(true);
	}

	const namespace = useContextSelector(
		DragAndDropContext,
		(state) => state.items[id].namespace,
	);

	const { namespace: draggedItemNamespace } = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo,
	);

	const { containerId, order } = useContextSelector(
		DragAndDropContext,
		(state) => state.items[id],
	);

	const { droppedItemInfo } = useContextSelector(
		DragAndDropContext,
		(state) => state.droppedItemMetadata,
	);

	const shouldWrapperAnimate = () =>
		(!!draggedItemId && draggedItemId !== id) ||
		(!!droppedItemInfo.startPosition &&
			droppedItemInfo.startPosition.containerId === containerId &&
			!droppedItemInfo.targetPosition);

	const shouldItemAnimate = () => {
		return (
			!!droppedItemInfo &&
			droppedItemInfo.id === id &&
			isEmpty(droppedItemInfo.targetPosition)
		);
	};

	const { containerId: contId, direction } = useContextSelector(
		DragAndDropContainerContext,
		(state) => state,
	);

	const slotNumber =
		useContextSelector(
			DragAndDropContext,
			(state) =>
				state.itemsSlots?.[namespace]?.[containerId].currentSlotNumber,
		) ?? 0;

	const isMouseOver =
		useContextSelector(
			DragAndDropContext,
			(state) => state.itemsSlots?.[namespace]?.[containerId].isMouseOver,
		) ?? false;

	const parentItemId = useContextSelector(
		DragAndDropItemContext,
		(state) => state.parentItemId,
	);

	const parentItemOfDraggedItemId = useContextSelector(
		DragAndDropContext,
		(state) => state.parentItemOfDraggedItemId,
	);

	const setParentItemOfDraggedItemId = useContextSelector(
		DragAndDropContext,
		(state) => state.setParentItemOfDraggedItemId,
	);

	const focusedContainerId = useContextSelector(
		DragAndDropContext,
		(state) => state.focusedContainerId,
	);

	return {
		onDragItem,
		onDropItem,
		draggedPosX,
		draggedPosY,
		draggedItemNamespace,
		order,
		draggedItemOrder,
		draggedItemContainerId,
		draggedItemHeight,
		draggedItemWidth,
		shouldWrapperAnimate,
		shouldItemAnimate,
		isDragged,
		containerId: contId,
		direction,
		slotNumber,
		isMouseOver,
		draggedItemId,
		parentItemId,
		parentItemOfDraggedItemId,
		setParentItemOfDraggedItemId,
		namespace,
		canDisplaySlots,
		focusedContainerId,
	};
};
