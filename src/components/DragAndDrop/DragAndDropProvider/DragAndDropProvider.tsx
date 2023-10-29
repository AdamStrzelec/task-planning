import React from 'react';
import { useMousemove } from 'src/components/DragAndDrop/hooks/useMousemove';
import { createContext } from 'use-context-selector';
import {
	OnDragItemProps,
	OnDropItemProps,
	OnItemDimensionsChange,
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
	setItems: () => {
		/**/
	},
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
	setDraggedItemMetadata: () => {
		/**/
	},
	droppedItemMetadata: { droppedItemInfo: {} },
	setDroppedItemMetadata: () => {
		/**/
	},
	slotsPositionDifference: {
		posX: 0,
		posY: 0,
	},
	setSlotsPositionDifference: () => {
		/**/
	},
	draggedItemPositionDifference: {
		posX: 0,
		posY: 0,
	},
	setDraggedItemPositionDifference: () => {
		/**/
	},
	onDragItem: () => {
		/**/
	},
	onDropItem: () => {
		/**/
	},
	onItemDimensionsChange: () => {
		/**/
	},
});

type DragAndDropProveiderComponentProps = {
	children: React.ReactNode;
};

export const DragAndDropProviderComponent: React.FC<
	DragAndDropProveiderComponentProps
> = ({ children }) => {
	useMousemove();

	return <>{children}</>;
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
	onDragItem: (props: OnDragItemProps) => void;
	onDropItem: (props: OnDropItemProps) => void;
	onItemDimensionsChange: (props: OnItemDimensionsChange) => void;
};

type DragAndDropProveiderProps = {
	children: React.ReactNode;
};

export const DragAndDropProvider: React.FC<DragAndDropProveiderProps> = ({
	children,
}) => {
	const {
		draggedItemMetadata,
		draggedItemPositionDifference,
		droppedItemMetadata,
		items,
		onDragItem,
		onDropItem,
		onItemDimensionsChange,
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
				onItemDimensionsChange,
			}}
		>
			<DragAndDropProviderComponent>
				{children}
			</DragAndDropProviderComponent>
		</DragAndDropContext.Provider>
	);
};
