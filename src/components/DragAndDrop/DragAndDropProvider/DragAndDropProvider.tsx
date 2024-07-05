import React, { useEffect, useRef } from 'react';
import { useMousemove } from 'src/components/DragAndDrop/hooks/useMousemove';
import { createContext, useContextSelector } from 'use-context-selector';
import {
	OnDragItemProps,
	OnDropItemProps,
	OnItemDimensionsChange,
} from 'src/components/DragAndDrop/DragAndDropItem/DragAndDropItem';
import {
	DraggedItemPositionDifference,
	DraggedItemsMetadata,
	DroppedItemMetadata,
	ItemsSlotsInfo,
	Items,
	SlotsPositionDifference,
	useDragAndDrop,
	ProviderPosition,
} from 'src/components/DragAndDrop/hooks/useDragAndDrop';
import styled from 'styled-components';
import { ItemsSlots } from '../ItemsSlots/ItemsSlots';

export const DragAndDropContext = createContext<DragAndDropContextProps>({
	providerPosition: { posX: 0, posY: 0 },
	setProviderPosition: () => {
		/**/
	},
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
	parentItemOfDraggedItemId: undefined,
	setParentItemOfDraggedItemId: () => {
		/**/
	},
	itemsSlots: {},
	setItemsSlots: () => {
		/**/
	},
	setCurrentSlotNumber: () => {
		/**/
	},
	setIsMouseOver: () => {
		/**/
	},
	canDisplaySlots: false,
	setCanDisplaySlots: () => {
		/**/
	},
	focusedContainerId: undefined,
	setFocusedContainerId: () => {
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
	providerPosition: ProviderPosition;
	setProviderPosition: (position: ProviderPosition) => void;
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
	parentItemOfDraggedItemId?: string;
	setParentItemOfDraggedItemId: (parentItemId: string | undefined) => void;
	itemsSlots: ItemsSlotsInfo;
	setItemsSlots: (itemsSlots: ItemsSlotsInfo) => void;
	setCurrentSlotNumber: (
		namespace: string,
		containerId: string,
		currentSlotNumber: number,
	) => void;
	setIsMouseOver: (
		namespace: string,
		containerId: string,
		isMouseOver: boolean,
	) => void;
	canDisplaySlots: boolean;
	setCanDisplaySlots: (canDisplaySlots: boolean) => void;
	focusedContainerId?: string;
	setFocusedContainerId: (containrId: string) => void;
};

type DragAndDropProveiderProps = {
	children: React.ReactNode;
	dragAndDropItems: Items;
};

export const DragAndDropProvider = ({
	children,
	dragAndDropItems,
}: DragAndDropProveiderProps) => {
	const {
		providerPosition,
		setProviderPosition,
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
		parentItemOfDraggedItemId,
		setParentItemOfDraggedItemId,
		itemsSlots,
		setItemsSlots,
		setCurrentSlotNumber,
		setIsMouseOver,
		canDisplaySlots,
		setCanDisplaySlots,
		focusedContainerId,
		setFocusedContainerId,
	} = useDragAndDrop(dragAndDropItems);

	return (
		<DragAndDropContext.Provider
			value={{
				providerPosition,
				setProviderPosition,
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
				parentItemOfDraggedItemId,
				setParentItemOfDraggedItemId,
				itemsSlots,
				setItemsSlots,
				setCurrentSlotNumber,
				setIsMouseOver,
				canDisplaySlots,
				setCanDisplaySlots,
				focusedContainerId,
				setFocusedContainerId,
			}}
		>
			<ContainerWrapper>
				<DragAndDropProviderComponent>
					{children}
				</DragAndDropProviderComponent>
				<ItemsSlots />
			</ContainerWrapper>
		</DragAndDropContext.Provider>
	);
};

interface ContainerWrapperProps {
	children?: React.ReactNode;
}

const ContainerWrapper = ({ children }: ContainerWrapperProps) => {
	const providerContainerRef = useRef<HTMLDivElement>(null);

	const setProviderPosition = useContextSelector(
		DragAndDropContext,
		(state) => state.setProviderPosition,
	);

	useEffect(() => {
		setProviderPosition({
			posX:
				providerContainerRef.current?.getBoundingClientRect().left ?? 0,
			posY:
				providerContainerRef.current?.getBoundingClientRect().top ?? 0,
		});
	}, [
		providerContainerRef.current?.getBoundingClientRect().top,
		providerContainerRef.current?.getBoundingClientRect().left,
	]);

	return (
		<ProviderContainer ref={providerContainerRef}>
			{children}
		</ProviderContainer>
	);
};

const ProviderContainer = styled.div`
	position: relative;
`;
