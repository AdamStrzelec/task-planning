import React, { useEffect, useCallback, useRef, useState } from 'react';

export interface DraggedItemMetadataProps {
	itemId: string;
	itemHeight: number;
	itemOrder: number;
}

export const useDragAndDrop = () => {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [draggedItemPositionDifference, setDraggedItemPositionDifference] =
		useState({ x: 0, y: 0 });
	const [draggedItemMetadata, setDraggedItemMetadata] =
		useState<DraggedItemMetadataProps | null>(null);

	const items = useRef({
		'1': {
			id: '1',
			columnId: '1',
			order: 1,
			isDragged: false,
			posX: 0,
			posY: 0,
			color: 'orange',
		},
		'2': {
			id: '2',
			columnId: '1',
			order: 2,
			isDragged: false,
			posX: 0,
			posY: 0,
			color: 'green',
		},
		'3': {
			id: '3',
			columnId: '1',
			order: 3,
			isDragged: false,
			posX: 0,
			posY: 0,
			color: 'blue',
		},
		'4': {
			id: '4',
			columnId: '1',
			order: 4,
			isDragged: false,
			posX: 0,
			posY: 0,
			color: 'yellow',
		},
		'5': {
			id: '5',
			columnId: '1',
			order: 5,
			isDragged: false,
			posX: 0,
			posY: 0,
			color: 'red',
		},
	});

	const handleBoxPosition = (event: MouseEvent) => {
		setCursorPosition({ x: event.pageX, y: event.pageY });
	};

	useEffect(() => {
		window.addEventListener('mousemove', (event) =>
			handleBoxPosition(event),
		);

		return () => {
			window.removeEventListener('mousemove', (event) =>
				handleBoxPosition(event),
			);
		};
	}, []);

	useEffect(() => {
		if (draggedItemMetadata) {
			const newValue = {
				[draggedItemMetadata.itemId]: {
					//@ts-expect-error add types
					...items.current[draggedItemMetadata.itemId],
					isDragged: true,
					posX: cursorPosition.x - draggedItemPositionDifference.x,
					posY: cursorPosition.y - draggedItemPositionDifference.y,
				},
			};
			items.current = {
				...items.current,
				...newValue,
			};
		}
	}, [cursorPosition, draggedItemMetadata, draggedItemPositionDifference]);

	const onDragItem = useCallback(
		//TODO remove null
		(id: string | null, x: number, y: number) => {
			setDraggedItemPositionDifference({ x, y });
			if (id) {
				setDraggedItemMetadata({
					itemId: id,
					itemHeight: 100,
					//@ts-expect-error add types for items
					itemOrder: items.current[`${id}`].order,
				});
			}
		},
		[],
	);

	const onDropItem = useCallback(
		(id: string, columnId?: string, order?: number) => {
			const newValue = {
				[id]: {
					//@ts-expect-error add types
					...items.current[id],
					isDragged: false,
					posX: 0,
					posY: 0,
				},
			};
			items.current = {
				...items.current,
				...newValue,
			};

			setDraggedItemPositionDifference({ x: 0, y: 0 });
			setDraggedItemMetadata(null);
			// setDraggedItemId(null);
		},
		[],
	);

	return {
		items,
		onDragItem,
		onDropItem,
		// draggedItemId,
		draggedItemMetadata,
	};
};
