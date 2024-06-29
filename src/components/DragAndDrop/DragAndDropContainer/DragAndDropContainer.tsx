import React, { useEffect, useRef } from 'react';
import { useContextSelector } from 'use-context-selector';
import { DragAndDropContext } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { createContext } from 'use-context-selector';
import { useDragAndDropContainer } from './useDragAndDropContainer';

export type ContainerDirection = 'row' | 'column';
export interface DragAndDropContainerProps {
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
	onContainerFocused?: () => void;
	onContainerUnfocused?: () => void;
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
	onContainerFocused,
	onContainerUnfocused,
}) => {
	const {
		draggedItemNamespace,
		isMouseOver,
		setIsMouseOver,
		sortedItems,
		isContainerFocused,
	} = useDragAndDropContainer({
		containerId,
		namespace,
	});

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

	useEffect(() => {
		if (isContainerFocused) {
			onContainerFocused?.();
		} else {
			onContainerUnfocused?.();
		}
	}, [isContainerFocused]);

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

export const DragAndDropContainer = React.memo(
	DragAndDropContainerComponent,
	(prevProps, newProps) => {
		return prevProps.containerId === newProps.containerId;
	},
);
