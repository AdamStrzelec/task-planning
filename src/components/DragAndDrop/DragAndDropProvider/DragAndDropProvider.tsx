import React from 'react';
import { DragAndDropContainer } from 'src/components/DragAndDrop/DragAndDropContainer/DragAndDropContainer';
import { useMousemove } from 'src/components/DragAndDrop/hooks/useMousemove';
import { createContext } from 'use-context-selector';
import {
	onDragItemProps,
	onDropItemProps,
} from 'src/components/DragAndDrop/DragAndDropItem/DragAndDropItem';
import {
	DraggedItemPositionDifference,
	DraggedItemsMetadata,
	DroppedItemMetadata,
	Items,
	SlotsPositionDifference,
	useDragAndDrop,
} from 'src/components/DragAndDrop/hooks/useDragAndDrop';

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
	draggedItemPositionDifference: {
		posX: 0,
		posY: 0,
	},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setDraggedItemPositionDifference: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onDragItem: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onDropItem: () => {},
});

export const DragAndDropProviderComponent = () => {
	const { containersOfItems } = useMousemove();

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
			/>
			<DragAndDropContainer
				containerId={'2'}
				items={containersOfItems['2']}
			/>
			<DragAndDropContainer
				containerId={'3'}
				items={containersOfItems['3']}
			/>
		</div>
	);
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
	draggedItemPositionDifference: DraggedItemPositionDifference;
	setDraggedItemPositionDifference: (
		positionDifference: DraggedItemPositionDifference,
	) => void;
	onDragItem: (props: onDragItemProps) => void;
	onDropItem: (props: onDropItemProps) => void;
};

export const DragAndDropProvider = () => {
	const {
		draggedItemMetadata,
		draggedItemPositionDifference,
		droppedItemMetadata,
		items,
		onDragItem,
		onDropItem,
		setItems,
		slotsPositionDifference,
		setDraggedItemMetadata,
		setDraggedItemPositionDifference,
		setDroppedItemMetadata,
		setSlotsPositionDifference,
	} = useDragAndDrop();

	return (
		<DragAndDropContext.Provider
			value={{
				items,
				setItems,
				draggedItemMetadata,
				setDraggedItemMetadata,
				droppedItemMetadata,
				setDroppedItemMetadata,
				slotsPositionDifference,
				setSlotsPositionDifference,
				draggedItemPositionDifference,
				setDraggedItemPositionDifference,
				onDragItem,
				onDropItem,
			}}
		>
			<DragAndDropProviderComponent />
		</DragAndDropContext.Provider>
	);
};
