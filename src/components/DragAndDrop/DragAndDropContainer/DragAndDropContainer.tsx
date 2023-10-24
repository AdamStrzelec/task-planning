import React, { useState, useRef } from 'react';
import { DragAndDropColumn } from 'src/components/DragAndDrop/DragAndDropColumn/DragAndDropColumn';
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
			columnId: undefined,
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

export const DragAndDropContainerComponent = () => {
	const { columnsOfItems, onDragItem, onDropItem } = useDragAndDrop();

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: '200px 200px 200px',
			}}
		>
			<DragAndDropColumn
				columnId={'1'}
				items={columnsOfItems['1']}
				onDragItem={onDragItem}
				onDropItem={onDropItem}
			/>
			<DragAndDropColumn
				columnId={'2'}
				items={columnsOfItems['2']}
				onDragItem={onDragItem}
				onDropItem={onDropItem}
			/>
			<DragAndDropColumn
				columnId={'3'}
				items={columnsOfItems['3']}
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
		columnId: string;
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
			columnId: string;
			order: number;
			posX: number;
			posY: number;
			width: number;
			height: number;
		}
	>;
	draggedItemInfo: Partial<{
		id: string;
		columnId: string;
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
			columnId: string;
		};
		targetPosition: {
			order: number;
			columnId: string;
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

export const DragAndDropContainer = () => {
	const items = useRef<Items>(mockedItems);
	const [draggedItemMetadata, setDraggedItemMetadata] =
		useState<DraggedItemsMetadata>({
			draggedItem: {},
			draggedItemInfo: {
				id: undefined,
				columnId: undefined,
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
			<DragAndDropContainerComponent />
		</DragAndDropContext.Provider>
	);
};
