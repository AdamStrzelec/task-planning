import React, { useState, useRef } from 'react';
import { DragAndDropContainer } from 'src/components/DragAndDrop/DragAndDropContainer/DragAndDropContainer';
import { useDragAndDrop } from 'src/components/DragAndDrop/hooks/useDragAndDrop';
import { mockedItems } from 'src/components/DragAndDrop/mocks/mockedItems';
import { createContext } from 'use-context-selector';

export const DragAndDropContext = createContext<DragAndDropContextProps>({
	items: {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setItems: () => {},
	draggedItemMetadata: {
		draggedItem: {},
		draggedItemInfo: {
			id: undefined,
			containerId: undefined,
			width: undefined,
			height: undefined,
			order: undefined,
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setDraggedItemMetadata: () => {},
	droppedItemMetadata: { droppedItemInfo: {} },
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setDroppedItemMetadata: () => {},
	slotsPositionDifference: {
		posX: 0,
		posY: 0,
	},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setSlotsPositionDifference: () => {},
});

export const DragAndDropProviderComponent = () => {
	const { containersOfItems, onDragItem, onDropItem } = useDragAndDrop();

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '200px 200px 200px',
			}}
		>
			<DragAndDropContainer
				containerId={'1'}
				items={containersOfItems['1']}
				onDragItem={onDragItem}
				onDropItem={onDropItem}
			/>
			<DragAndDropContainer
				containerId={'2'}
				items={containersOfItems['2']}
				onDragItem={onDragItem}
				onDropItem={onDropItem}
			/>
			<DragAndDropContainer
				containerId={'3'}
				items={containersOfItems['3']}
				onDragItem={onDragItem}
				onDropItem={onDropItem}
			/>
		</div>
	);
};

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

type DraggedItemsMetadata = {
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

type DroppedItemMetadata = {
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

type SlotsPositionDifference = {
	posX: number;
	posY: number;
};

type DragAndDropContextProps = {
	items: Items;
	setItems: (items: Items) => void;
	draggedItemMetadata: DraggedItemsMetadata;
	setDraggedItemMetadata: (itemMetadata: DraggedItemsMetadata) => void;
	droppedItemMetadata: DroppedItemMetadata;
	setDroppedItemMetadata: (itemMetadata: DroppedItemMetadata) => void;
	slotsPositionDifference: SlotsPositionDifference;
	setSlotsPositionDifference: (
		positionDifference: SlotsPositionDifference,
	) => void;
};

export const DragAndDropProvider = () => {
	const items = useRef<Items>(mockedItems);
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

	return (
		<DragAndDropContext.Provider
			value={{
				items: items.current,
				setItems: (newItems: Items) => (items.current = newItems),
				draggedItemMetadata,
				setDraggedItemMetadata,
				droppedItemMetadata,
				setDroppedItemMetadata,
				slotsPositionDifference,
				setSlotsPositionDifference,
			}}
		>
			<DragAndDropProviderComponent />
		</DragAndDropContext.Provider>
	);
};
