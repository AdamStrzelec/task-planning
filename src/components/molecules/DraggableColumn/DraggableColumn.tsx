import React from 'react';
import { IconManager } from 'src/components/atoms/IconManager/IconManager';
import styled, { css } from 'styled-components';

interface DraggableColumnProps {
	id: string;
	children: React.ReactNode;
	title: string;
	draggedItemContainerId?: string;
	draggedItemHeight?: number;
	focusedContainerId?: string;
}

export const DraggableColumn = ({
	id,
	children,
	title,
	draggedItemContainerId,
	draggedItemHeight,
	focusedContainerId,
}: DraggableColumnProps) => {
	return (
		<Wrapper>
			<HeaderWrapper>
				<Title>{title}</Title>
				<OptionsButton>
					<IconManager name={'Options'} />
				</OptionsButton>
			</HeaderWrapper>
			<AddItemButtonWrapper>
				<AddItemButton>
					Add Item{' '}
					<AddItemIconWrapper>
						<IconManager name={'Plus'} />
					</AddItemIconWrapper>
				</AddItemButton>
			</AddItemButtonWrapper>
			<ContentWrapper>{children}</ContentWrapper>
			<DraggedItemSpacer
				space={
					focusedContainerId == draggedItemContainerId
						? 0
						: !!draggedItemHeight && focusedContainerId === id
						? draggedItemHeight
						: 0
				}
				shouldAnimate={!!draggedItemHeight}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 350px;
	backdrop-filter: blur(10px);
	background-color: rgba(255, 255, 255, 0.4);
	border-radius: 7px;
`;

const HeaderWrapper = styled.div`
	background-color: rgba(255, 255, 255, 0.4);
	padding: 15px 20px;
	border-top-left-radius: 7px;
	border-top-right-radius: 7px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
`;

const Title = styled.h2(
	({ theme: { colors, fontSize } }) => css`
		color: ${colors.itemText};
		font-size: ${fontSize.m}px;
		margin: 0;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	`,
);

const ContentWrapper = styled.div`
	padding: 15px 20px;
`;

const OptionsButton = styled.button(
	() => css`
		width: 22px;
		height: 22px;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		background-color: transparent;
	`,
);

const AddItemButtonWrapper = styled.div`
	padding: 10px 15px 0;
	display: flex;
	justify-content: flex-end;
`;

const AddItemButton = styled.button(
	({ theme: { colors, fontSize } }) => css`
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		background-color: rgba(255, 255, 255, 0.4);
		color: ${colors.itemText};
		font-size: ${fontSize.s}px;
		padding: 5px 12px;
		border-radius: 15px;
	`,
);

const AddItemIconWrapper = styled.div`
	margin-top: -2px;
	padding: 0 3px;
`;

const DraggedItemSpacer = styled.div<{ space: number; shouldAnimate: boolean }>(
	({ space, shouldAnimate }) => css`
		width: 100%;
		height: ${space}px;
		${shouldAnimate &&
		css`
			transition: height 0.3s ease-in-out;
		`}
	`,
);
