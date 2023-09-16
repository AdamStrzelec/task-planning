import { DragElement } from 'src/components/DragElement/DragElement';
import React, { useEffect, useCallback, useRef, useState } from 'react';
import './App.css';
import { GlobalStyle } from './global/global.styles';

function App() {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
	const [draggedItemPositionDifference, setDraggedItemPositionDifference] =
		useState({ x: 0, y: 0 });
	const items = useRef({
		'1': {
			id: '1',
			posX: 100,
			posY: 100,
			color: 'orange',
		},
		'2': {
			id: '2',
			posX: 200,
			posY: 100,
			color: 'green',
		},
		'3': {
			id: '3',
			posX: 300,
			posY: 100,
			color: 'blue',
		},
		'4': {
			id: '4',
			posX: 400,
			posY: 100,
			color: 'yellow',
		},
		'5': {
			id: '5',
			posX: 500,
			posY: 100,
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
		if (draggedItemId) {
			const newValue = {
				[draggedItemId]: {
					id: draggedItemId,
					posX: cursorPosition.x - draggedItemPositionDifference.x,
					posY: cursorPosition.y - draggedItemPositionDifference.y,
				},
			};
			items.current = {
				...items.current,
				...newValue,
			};
		}
	}, [cursorPosition, draggedItemId, draggedItemPositionDifference]);

	const onDragItem = useCallback(
		(id: string | null, x: number, y: number) => {
			setDraggedItemPositionDifference({ x, y });
			setDraggedItemId(id);
		},
		[],
	);

	return (
		<div>
			<GlobalStyle />
			<DragElement
				id={'1'}
				posX={items.current['1'].posX}
				posY={items.current['1'].posY}
				color={items.current['1'].color}
				onDragItem={onDragItem}
			/>
			<DragElement
				id={'2'}
				posX={items.current['2'].posX}
				posY={items.current['2'].posY}
				color={items.current['2'].color}
				onDragItem={onDragItem}
			/>
			<DragElement
				id={'3'}
				posX={items.current['3'].posX}
				posY={items.current['3'].posY}
				color={items.current['3'].color}
				onDragItem={onDragItem}
			/>
			<DragElement
				id={'4'}
				posX={items.current['4'].posX}
				posY={items.current['4'].posY}
				color={items.current['4'].color}
				onDragItem={onDragItem}
			/>
			<DragElement
				id={'5'}
				posX={items.current['5'].posX}
				posY={items.current['5'].posY}
				color={items.current['5'].color}
				onDragItem={onDragItem}
			/>
		</div>
	);
}

export default App;
