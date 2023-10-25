import { isEqual, isEmpty } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { DragAndDropItem } from 'src/components/DragAndDrop/DragAndDropItem/DragAndDropItem';
import { Items } from 'src/components/DragAndDrop/hooks/useDragAndDrop';
import { createContext } from 'use-context-selector';

interface DragAndDropContainerProps {
	containerId: string;
	items: Items;
	children?: React.ReactNode;
}

type DragAndDropContainerContextProps = {
	containerId?: string;
	isMouseOver: boolean;
	slotNumber: number;
};

export const DragAndDropContainerContext =
	createContext<DragAndDropContainerContextProps>({
		containerId: undefined,
		isMouseOver: false,
		slotNumber: 0,
	});

const DragAndDropContainerComponent: React.FC<DragAndDropContainerProps> = ({
	containerId,
	items,
	children,
}) => {
	const [slotNumber, setSlotNumber] = useState(0);
	const [isMouseOver, setIsMouseOver] = useState(false);

	const setCurrentSlot = useCallback((slotNumber: number) => {
		setSlotNumber(slotNumber);
	}, []);

	const { id: draggedItemId, containerId: draggedItemContainerId } =
		useContextSelector(
			DragAndDropContext,
			(state) => state.draggedItemMetadata.draggedItemInfo,
		);

	const { posX: slotPositionDiffX, posY: slotPositionDiffY } =
		useContextSelector(
			DragAndDropContext,
			(state) => state.slotsPositionDifference,
		);

	const onDropItem = useContextSelector(
		DragAndDropContext,
		(state) => state.onDropItem,
	);

	const sortedItems = !isEmpty(items)
		? Object.keys(items)
				.map((key) => items[key])
				.sort((a, b) => a.order - b.order)
		: [];

	return (
		<DragAndDropContainerContext.Provider
			value={{ containerId, isMouseOver, slotNumber }}
		>
			<div
				onMouseDown={() => setIsMouseOver(true)}
				style={{
					position: 'relative',
					minHeight: 700,
					width: 100,
					backgroundColor: 'gray',
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: draggedItemId ? 100 : 120,
					}}
				>
					{sortedItems.map((item) => (
						<DragAndDropItem
							key={item.id}
							id={item.id}
							color={item.color}
						>
							<p style={{ margin: 0 }}>{item.color}</p>
						</DragAndDropItem>
					))}
				</div>
				<div
					onMouseOver={() => {
						setIsMouseOver(true);
					}}
					onMouseLeave={() => {
						setIsMouseOver(false);
						setSlotNumber(0);
					}}
					onMouseUp={() =>
						onDropItem({
							id: draggedItemId || '',
							containerId,
							order: slotNumber,
						})
					}
					style={{
						position: 'absolute',
						top: `${slotPositionDiffY}px`,
						left: `${slotPositionDiffX}px`,
						zIndex: 101,
						// backgroundColor: 'rgba(0, 0, 0, 0.3)',
						width: '100%',
						height: '100%',
						display: 'flex',
						flexFlow: 'column',
					}}
				>
					{sortedItems.map((item, index) => (
						<ItemSlot
							height={item.height}
							width={item.width}
							setSlotNumber={setCurrentSlot}
							onDropItem={onDropItem}
							slotNumber={index + 1}
							containerId={containerId}
							key={item.id}
						/>
					))}
					<div
						onMouseOver={() => {
							setSlotNumber(
								draggedItemContainerId === containerId
									? sortedItems.length
									: sortedItems.length + 1,
							);
						}}
						style={{
							flexGrow: 1,
							// border: '1px solid white',
						}}
					></div>
				</div>
			</div>
		</DragAndDropContainerContext.Provider>
	);
};

type ItemSlotProps = {
	width: number;
	height: number;
	slotNumber: number;
	setSlotNumber: (slot: number) => void;
	containerId: string;
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
}: ItemSlotProps) => {
	return (
		<div
			onMouseOver={() => setSlotNumber(slotNumber)}
			style={{
				width,
				height,
				// border: '1px solid white',
			}}
		/>
	);
};

const ItemSlot = React.memo(ItemSlotComponent);

export const DragAndDropContainer = React.memo(
	DragAndDropContainerComponent,
	(prevProps, newProps) => {
		return (
			prevProps.containerId === newProps.containerId &&
			isEqual(prevProps.items, newProps.items)
		);
	},
);
