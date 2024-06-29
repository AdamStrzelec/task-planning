import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';

import { DragAndDropHelpers } from '../helpers/DragAndDrop.helpers';
import { DragAndDropContainerProps } from './DragAndDropContainer';

export const useDragAndDropContainer = ({
	containerId,
	namespace,
}: Pick<DragAndDropContainerProps, 'containerId' | 'namespace'>) => {
	const [isMouseOver, setIsMouseOver] = useState(false);
	const [isContainerFocused, setIsContainerFocused] = useState(false);

	const draggedItemNamespace = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo.namespace,
	);

	const isMouseOverSlot = useContextSelector(
		DragAndDropContext,
		(state) => state.itemsSlots?.[namespace]?.[containerId].isMouseOver,
	);

	const canDisplaySlots = useContextSelector(
		DragAndDropContext,
		(state) => state.canDisplaySlots,
	);

	const draggedItemContainerId = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo.containerId,
	);

	const { getContainersOfItems } = DragAndDropHelpers;

	const items = useContextSelector(
		DragAndDropContext,
		(state) => state.items,
	);

	const containersOfItems = useMemo(
		() => getContainersOfItems(items),
		[items],
	);

	const sortedItems = !isEmpty(containersOfItems[containerId])
		? Object.keys(containersOfItems[containerId])
				.map((key) => items[key])
				.sort((a, b) => a.order - b.order)
		: [];

	useEffect(() => {
		if (
			(!canDisplaySlots && draggedItemContainerId === containerId) ||
			isMouseOverSlot
		) {
			setIsContainerFocused(true);
		} else {
			setIsContainerFocused(false);
		}
	}, [isMouseOverSlot, draggedItemContainerId]);

	return {
		isMouseOver,
		setIsMouseOver,
		draggedItemNamespace,
		sortedItems,
		isContainerFocused,
	};
};
