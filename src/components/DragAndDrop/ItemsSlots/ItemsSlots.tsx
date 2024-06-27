import React from 'react';
import { useContextSelector } from 'use-context-selector';
import { DragAndDropContext } from '../DragAndDropProvider/DragAndDropProvider';
import { maxBy } from 'lodash';

export const ItemsSlots = () => {
	const itemsSlots = useContextSelector(
		DragAndDropContext,
		(state) => state.itemsSlots,
	);

	const canDisplaySlots = useContextSelector(
		DragAndDropContext,
		(state) => state.canDisplaySlots,
	);

	const draggedItemNamespace = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo.namespace,
	);

	const draggedItemId = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo.id,
	);

	const draggedItemContainerId = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo.containerId,
	);

	const draggedItemWidth = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo.width,
	);

	const draggedItemHeight = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo.height,
	);

	const providerPosition = useContextSelector(
		DragAndDropContext,
		(state) => state.providerPosition,
	);

	const { posX: slotPositionDiffX, posY: slotPositionDiffY } =
		useContextSelector(
			DragAndDropContext,
			(state) => state.slotsPositionDifference,
		);

	const setSlotNumber = useContextSelector(
		DragAndDropContext,
		(state) => state.setCurrentSlotNumber,
	);

	const onDropItem = useContextSelector(
		DragAndDropContext,
		(state) => state.onDropItem,
	);

	const setIsMouseOver = useContextSelector(
		DragAndDropContext,
		(state) => state.setIsMouseOver,
	);

	return (
		<div>
			<>
				{draggedItemNamespace &&
					canDisplaySlots &&
					Object.keys(itemsSlots[draggedItemNamespace]).map(
						(item, index) => {
							const containerSlots =
								itemsSlots[draggedItemNamespace][item];
							const maxSlotWidth =
								maxBy(containerSlots.slotsItems, 'width')
									?.width ?? 0;
							const maxSlotHeight =
								maxBy(containerSlots.slotsItems, 'height')
									?.height ?? 0;
							const posXWithOffset =
								containerSlots.slotsMetadata.posX -
								providerPosition.posX +
								slotPositionDiffX -
								window.scrollX;
							const posYWithOffset =
								containerSlots.slotsMetadata.posY -
								providerPosition.posY +
								slotPositionDiffY -
								window.scrollY;

							const posXWithoutOffset =
								containerSlots.slotsMetadata.posX -
								providerPosition.posX -
								window.scrollY;
							const posYWithoutOffset =
								containerSlots.slotsMetadata.posY -
								providerPosition.posY -
								window.scrollY;
							return (
								<div
									onMouseOver={() => {
										setIsMouseOver(
											draggedItemNamespace,
											item,
											true,
										);
									}}
									onMouseLeave={() => {
										setIsMouseOver(
											draggedItemNamespace,
											item,
											false,
										);
										setSlotNumber(
											draggedItemNamespace,
											item,
											0,
										);
									}}
									onMouseUp={() =>
										onDropItem({
											id: draggedItemId || '',
											containerId:
												containerSlots.containerId,
											order: containerSlots.currentSlotNumber,
										})
									}
									key={index}
									style={{
										position: 'absolute',
										top: containerSlots.options
											?.slotsPositionYWithOffset
											? posYWithOffset
											: posYWithoutOffset,
										left: containerSlots.options
											?.slotsPositionXWithOffset
											? posXWithOffset
											: posXWithoutOffset,
										zIndex: 110,
										// backgroundColor: 'rgba(0, 255, 0, 0.3)',
										// border: '1px solid white',
										display: 'flex',
										flexFlow: containerSlots.direction,
									}}
								>
									{containerSlots.slotsItems.map(
										(itemSlot, index) => {
											return (
												<ItemSlot
													height={
														containerSlots.direction ===
														'row'
															? maxSlotHeight
															: itemSlot.height
													}
													width={
														containerSlots.direction ===
														'column'
															? maxSlotWidth
															: itemSlot.width
													}
													setSlotNumber={
														setSlotNumber
													}
													onDropItem={onDropItem}
													slotNumber={index + 1}
													namespace={
														draggedItemNamespace
													}
													containerId={
														containerSlots.containerId
													}
													draggedItemNamespace={
														draggedItemNamespace
													}
													key={itemSlot.id}
												/>
											);
										},
									)}
									{draggedItemContainerId !==
										containerSlots.containerId && (
										<ItemSlot
											height={draggedItemHeight ?? 0}
											width={draggedItemWidth ?? 0}
											setSlotNumber={setSlotNumber}
											onDropItem={onDropItem}
											slotNumber={
												containerSlots.slotsItems
													.length + 1
											}
											namespace={draggedItemNamespace}
											containerId={
												containerSlots.containerId
											}
											draggedItemNamespace={
												draggedItemNamespace
											}
										/>
									)}
								</div>
							);
						},
					)}
			</>
		</div>
	);
};

type ItemSlotProps = {
	width: number;
	height: number;
	slotNumber: number;
	setSlotNumber: (
		namespace: string,
		containerId: string,
		slot: number,
	) => void;
	containerId: string;
	namespace: string;
	draggedItemNamespace?: string;
	onDropItem: ({
		id,
		containerId,
		order,
		posX,
		posY,
	}: {
		id: string;
		containerId?: string;
		order?: number;
		posX?: number;
		posY?: number;
	}) => void;
};

const ItemSlotComponent = ({
	width,
	height,
	slotNumber,
	setSlotNumber,
	namespace,
	containerId,
	draggedItemNamespace,
}: ItemSlotProps) => {
	return (
		<div
			onMouseOver={() => {
				if (namespace === draggedItemNamespace) {
					setSlotNumber(namespace, containerId, slotNumber);
				}
			}}
			style={{
				width,
				height,
				/*this is added to watch behavior of intesm slots */
				// border: '1px solid white',
			}}
		/>
	);
};

const ItemSlot = React.memo(ItemSlotComponent);
