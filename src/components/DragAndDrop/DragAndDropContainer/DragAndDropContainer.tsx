import { isEmpty } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { createContext } from 'use-context-selector';
import { DragAndDropHelpers } from '../helpers/DragAndDrop.helpers';

export type ContainerDirection = 'row' | 'column';
interface DragAndDropContainerProps {
	containerId: string;
	direction?: ContainerDirection;
	children: (
		items: {
			id: string;
			containerId: string;
			order: number;
			width: number;
			height: number;
			childrenContainerId: string;
		}[],
	) => React.ReactNode;
	namespace: string;
	options?: {
		slotsPositionXWithOffset?: boolean;
		slotsPositionYWithOffset?: boolean;
	};
}

type DragAndDropContainerContextProps = {
	containerId?: string;
	isMouseOver: boolean;
	direction: ContainerDirection;
};

export const DragAndDropContainerContext =
	createContext<DragAndDropContainerContextProps>({
		containerId: undefined,
		isMouseOver: false,
		direction: 'column',
	});

const DragAndDropContainerComponent: React.FC<DragAndDropContainerProps> = ({
	containerId,
	direction = 'column',
	children,
	namespace,
	options = {
		slotsPositionXWithOffset: true,
		slotsPositionYWithOffset: true,
	},
}) => {
	const [isMouseOver, setIsMouseOver] = useState(false);

	const draggedItemNamespace = useContextSelector(
		DragAndDropContext,
		(state) => state.draggedItemMetadata.draggedItemInfo.namespace,
	);

	const setItemsSlots = useContextSelector(
		DragAndDropContext,
		(state) => state.setItemsSlots,
	);

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setItemsSlots({
			[namespace]: {
				[containerId]: {
					containerId,
					currentSlotNumber: 0,
					slotsItems: sortedItems,
					slotsMetadata: {
						posX:
							containerRef.current?.getBoundingClientRect()
								.left ?? 0,
						posY:
							containerRef.current?.getBoundingClientRect().top ??
							0,
					},
					isMouseOver: false,
					direction,
					options: {
						slotsPositionXWithOffset:
							options.slotsPositionXWithOffset,
						slotsPositionYWithOffset:
							options.slotsPositionYWithOffset,
					},
				},
			},
		});
	}, [
		draggedItemNamespace,
		containerRef.current?.getBoundingClientRect().top,
		containerRef.current?.getBoundingClientRect().left,
	]);

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
			value={{
				containerId,
				isMouseOver,
				direction,
			}}
		>
			<div
				ref={containerRef}
				onMouseDown={() => setIsMouseOver(true)}
				style={{
					position: 'relative',
					backgroundColor: 'gray',
					transition: 'height 0.2s ease-in-out',
				}}
			>
				<div
					style={{
						...(direction === 'column' && {
							display: 'flex',
							flexDirection: 'column',
						}),
						...(direction === 'row' && {
							display: 'inline-flex',
						}),
						flexFlow: direction,
					}}
				>
					{children(sortedItems)}
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
	draggedItemNamespace,
}: ItemSlotProps) => {
	return (
		<div
			onMouseOver={() => {
				if (namespace === draggedItemNamespace) {
					setSlotNumber(slotNumber);
				}
			}}
			style={{
				width,
				height,
				/*this is added to watch behavior of intesm slots */
				border: '1px solid white',
			}}
		/>
	);
};

export const DragAndDropContainer = React.memo(
	DragAndDropContainerComponent,
	(prevProps, newProps) => {
		return prevProps.containerId === newProps.containerId;
	},
);
