import { isEmpty } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { createContext } from 'use-context-selector';
import { DragAndDropHelpers } from '../helpers/DragAndDrop.helpers';

type ContainerDirection = 'row' | 'column';
interface DragAndDropContainerProps {
	containerId: string;
	direction?: ContainerDirection;
	children: (
		items: {
			id: string;
			containerId: string;
			order: number;
			color: string;
			width: number;
			height: number;
		}[],
	) => React.ReactNode;
}

type DragAndDropContainerContextProps = {
	containerId?: string;
	isMouseOver: boolean;
	slotNumber: number;
	direction: ContainerDirection;
};

export const DragAndDropContainerContext =
	createContext<DragAndDropContainerContextProps>({
		containerId: undefined,
		isMouseOver: false,
		slotNumber: 0,
		direction: 'column',
	});

const DragAndDropContainerComponent: React.FC<DragAndDropContainerProps> = ({
	containerId,
	direction = 'column',
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

	const { getContainersOfItems } = DragAndDropHelpers;

	const items = useContextSelector(
		DragAndDropContext,
		(state) => state.items,
	);

	const containersOfItems = useMemo(
		() => getContainersOfItems(items),
		[items],
	);

	const sortedItems = !isEmpty(containersOfItems[containerId])
		? Object.keys(containersOfItems[containerId])
				.map((key) => items[key])
				.sort((a, b) => a.order - b.order)
		: [];

	return (
		<DragAndDropContainerContext.Provider
			value={{ containerId, isMouseOver, slotNumber, direction }}
		>
			<div
				onMouseDown={() => setIsMouseOver(true)}
				style={{
					position: 'relative',
					height: 700,
					width: 100,
					backgroundColor: 'gray',
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: draggedItemId
							? draggedItemContainerId === containerId
								? 100
								: 99
							: draggedItemContainerId === containerId
							? 119
							: 120,
						display: 'flex',
						flexDirection: direction,
					}}
				>
					{children(sortedItems)}
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
						position: 'relative',
						top: `${slotPositionDiffY}px`,
						left: `${slotPositionDiffX}px`,
						zIndex: 110,
						// backgroundColor: 'rgba(0, 0, 0, 0.3)',
						width: '100%',
						height: '100%',
						display: 'flex',
						flexFlow: direction,
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
		return prevProps.containerId === newProps.containerId;
	},
);
