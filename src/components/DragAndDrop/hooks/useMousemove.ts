import { useEffect, useState, useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { DragAndDropHelpers } from 'src/components/DragAndDrop/helpers/DragAndDrop.helpers';

export interface DraggedItemMetadataProps {
	itemId: string;
	itemHeight: number;
	itemOrder: number;
}

export const useMousemove = () => {
	const { getContainersOfItems } = DragAndDropHelpers;

	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

	const {
		items,
		setDraggedItemMetadata,
		draggedItemMetadata,
		draggedItemPositionDifference,
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
							cursorPosition.x -
							draggedItemPositionDifference.posX,
						posY:
							cursorPosition.y -
							draggedItemPositionDifference.posY,
					},
				},
			});
		}
	}, [cursorPosition]);

	return {
		containersOfItems,
	};
};
