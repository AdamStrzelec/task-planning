import { useState, useCallback } from 'react';
import {
	OnDragItemProps,
	OnDropItemProps,
} from 'src/components/DragAndDrop/DragAndDropItem/DragAndDropItem';
import { DragAndDropHelpers } from 'src/components/DragAndDrop/helpers/DragAndDrop.helpers';
import { ContainerDirection } from 'src/components/DragAndDrop/DragAndDropContainer/DragAndDropContainer';

export type Item = {
	id: string;
	containerId: string;
	order: number;
	width: number;
	height: number;
	namespace: string;
	childrenContainerId: string;
};

export type Items = Record<string, Item>;

type Namespace = string;

type ContainerId = string;

export type ItemsSlotsInfo = Record<
	Namespace,
	Record<
		ContainerId,
		{
			slotsItems: Item[];
			slotsMetadata: {
				posX: number;
				posY: number;
			};
			containerId: string;
			isMouseOver: boolean;
			currentSlotNumber: number;
			direction: ContainerDirection;
			options?: {
				slotsPositionXWithOffset?: boolean;
				slotsPositionYWithOffset?: boolean;
			};
		}
	>
>;

export type DraggedItemsMetadata = {
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
			namespace: string;
		}
	>;
	draggedItemInfo: Partial<{
		id: string;
		containerId: string;
		width: number;
		height: number;
		order: number;
		namespace: string;
	}>;
};

export type DroppedItemMetadata = {
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

type Position = {
	posX: number;
	posY: number;
};

export type ProviderPosition = Position;

export type SlotsPositionDifference = Position;

export type DraggedItemPositionDifference = Position;

export const useDragAndDrop = (dragAndDropItems: Items) => {
	const [items, setItems] = useState<Items>(dragAndDropItems);
	const [focusedContainerIdState, setfocusedContainerIdState] = useState('');
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

	const [draggedItemPositionDifference, setDraggedItemPositionDifference] =
		useState<DraggedItemPositionDifference>({ posX: 0, posY: 0 });

	const [parentItemOfDraggedItemId, setParentItemOfDraggedItemId] = useState<
		string | undefined
	>(undefined);
	const [canDisplaySlotsState, setCanDisplaySlotsState] = useState(false);

	const setCanDisplaySlots = useCallback((canDisplaySlots: boolean) => {
		setCanDisplaySlotsState(canDisplaySlots);
	}, []);

	const [itemsSlotsState, setItemsSlotsState] = useState<ItemsSlotsInfo>({});

	const setItemsSlots = useCallback((slots: ItemsSlotsInfo) => {
		const key = Object.keys(slots)[0];

		setItemsSlotsState((prevState) => {
			const namespaceSlots = {
				[key]: { ...prevState[key], ...slots[key] },
			};
			return {
				...prevState,
				...namespaceSlots,
			};
		});
	}, []);

	const setCurrentSlotNumber = useCallback(
		(namespace: string, containerId: string, slotNumber: number) => {
			setItemsSlotsState((prevState) => {
				const prevStateNamespace = prevState[namespace] || {};
				const container = prevStateNamespace[containerId] || {};
				return {
					...prevState,
					[namespace]: {
						...prevStateNamespace,
						[containerId]: {
							...container,
							currentSlotNumber: slotNumber,
						},
					},
				};
			});
		},
		[],
	);

	const setIsMouseOver = useCallback(
		(namespace: string, containerId: string, isMouseOver: boolean) => {
			setItemsSlotsState((prevState) => {
				const prevStateNamespace = prevState[namespace] || {};
				const container = prevStateNamespace[containerId] || {};
				return {
					...prevState,
					[namespace]: {
						...prevStateNamespace,
						[containerId]: {
							...container,
							isMouseOver: isMouseOver,
						},
					},
				};
			});
		},
		[],
	);

	const [providerPosition, setProviderPosition] = useState<ProviderPosition>({
		posX: 0,
		posY: 0,
	});

	const { changeItemsPositionInfoAfterDropItem } = DragAndDropHelpers;

	const onDragItem = useCallback(
		({
			id,
			posX,
			posY,
			windowPositionX,
			windowPositionY,
			clickPositionX,
			clickPositionY,
			width,
			height,
		}: OnDragItemProps) => {
			setDraggedItemPositionDifference({ posX, posY });
			setDroppedItemMetadata({ droppedItemInfo: {} });

			const diffX = clickPositionX - windowPositionX - width / 2;
			const diffY = clickPositionY - windowPositionY - height / 2;

			setSlotsPositionDifference({
				posX: diffX,
				posY: diffY,
			});

			if (id) {
				setDraggedItemMetadata({
					draggedItem: {
						[id]: {
							containerId: items[id].containerId,
							id: id,
							height: items[id].height,
							width: items[id].width,
							order: items[id].order,
							namespace: items[id].namespace,
							posX: 0,
							posY: 0,
						},
					},
					draggedItemInfo: {
						containerId: items[id].containerId,
						id: items[id].id,
						width: items[id].width,
						height: items[id].height,
						order: items[id].order,
						namespace: items[id].namespace,
					},
				});
			}
		},
		[],
	);

	const onDropItem = useCallback(
		({ id, containerId, order }: OnDropItemProps) => {
			if (containerId && order) {
				const draggedItemOrder =
					draggedItemMetadata.draggedItemInfo.order;

				changeItemsPositionInfoAfterDropItem({
					draggedItemId: id,
					draggedItemOrder,
					draggedItemTargetContainerId: containerId,
					draggedItemTargetOrder: order,
					items,
					setItems,
				});
			}

			setDraggedItemPositionDifference({ posX: 0, posY: 0 });
			setCanDisplaySlots(false);

			setDroppedItemMetadata({
				droppedItemInfo: {
					id,
					...(!!draggedItemMetadata.draggedItemInfo.containerId && {
						startPosition: {
							containerId:
								draggedItemMetadata.draggedItemInfo.containerId,
							order:
								draggedItemMetadata.draggedItemInfo.order || 0,
						},
					}),
					...(!!containerId && {
						targetPosition: { containerId, order: order || 0 },
					}),
				},
			});

			setDraggedItemMetadata({
				draggedItem: {},
				draggedItemInfo: {
					containerId: undefined,
					id: undefined,
					width: undefined,
					height: undefined,
					order: undefined,
				},
			});

			setSlotsPositionDifference({
				posX: 0,
				posY: 0,
			});
		},
		[draggedItemMetadata.draggedItemInfo],
	);

	const onItemDimensionsChange = useCallback(
		({
			id,
			width,
			height,
		}: {
			id: string;
			width: number;
			height: number;
		}) => {
			const newItems = { ...items };

			newItems[id].width = width;
			newItems[id].height = height;

			setItems(newItems);
		},
		[],
	);

	const setFocusedContainerId = useCallback((containerId: string) => {
		setfocusedContainerIdState(containerId);
	}, []);

	return {
		providerPosition,
		setProviderPosition,
		items,
		setItems,
		onDragItem,
		onDropItem,
		onItemDimensionsChange,
		draggedItemMetadata,
		droppedItemMetadata,
		slotsPositionDifference,
		draggedItemPositionDifference,
		setDraggedItemMetadata,
		setDroppedItemMetadata,
		setSlotsPositionDifference,
		setDraggedItemPositionDifference,
		parentItemOfDraggedItemId,
		setParentItemOfDraggedItemId,
		setItemsSlots,
		itemsSlots: itemsSlotsState,
		setCurrentSlotNumber,
		setIsMouseOver,
		canDisplaySlots: canDisplaySlotsState,
		setCanDisplaySlots,
		focusedContainerId: focusedContainerIdState,
		setFocusedContainerId,
	};
};
