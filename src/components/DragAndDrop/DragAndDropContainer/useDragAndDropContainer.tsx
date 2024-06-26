import { isEmpty } from 'lodash';
import { useMemo, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';

import { DragAndDropHelpers } from '../helpers/DragAndDrop.helpers';
import { DragAndDropContainerProps } from './DragAndDropContainer';

export const useDragAndDropContainer = ({
	containerId,
}: Pick<DragAndDropContainerProps, 'containerId'>) => {
	const [isMouseOver, setIsMouseOver] = useState(false);

	const draggedItemNamespace = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo.namespace,
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

	return {
		isMouseOver,
		setIsMouseOver,
		draggedItemNamespace,
		sortedItems,
	};
};
