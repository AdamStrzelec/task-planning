import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { IconManager } from 'src/components/atoms/IconManager/IconManager';

const itemTitleColors = {
	red: '#e45300',
	green: '#50c878',
	blue: '#0091e4',
	yellow: '#ffd700',
	purple: '#9d61ac',
};

type TitleBackgroundColor = keyof typeof itemTitleColors;

interface DraggableItemProps {
	id: string;
	title: string;
	text: string;
	titleColor?: TitleBackgroundColor;
	onDeleteItem?: (id: string) => void;
	onEdit?: (id: string) => void;
}

export const DraggableItem = ({
	id,
	title,
	text,
	titleColor = 'blue',
	onDeleteItem,
	onEdit,
}: DraggableItemProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<DraggebleItemWrapper>
			<HeaderWrapper>
				<ItemTitle titleColor={titleColor}>{title}</ItemTitle>
				<OptionsButton
					onClick={() => {
						setIsExpanded(!isExpanded);
					}}
				>
					<IconManager
						name={'Options'}
						size={13}
						color={'itemText'}
					/>
				</OptionsButton>
			</HeaderWrapper>
			<DescriptionWrapper isExpanded={isExpanded}>
				<ItemDescription>{text}</ItemDescription>
			</DescriptionWrapper>
			{isExpanded && (
				<OptionsWrapper>
					<OptionsButton onClick={() => onEdit?.(id)}>
						<IconManager
							name={'Edit'}
							size={23}
							color={'blueInfo'}
						/>
					</OptionsButton>
					<OptionsButton onClick={() => onDeleteItem?.(id)}>
						<IconManager
							name={'Basket'}
							size={20}
							color={'errorRed'}
						/>
					</OptionsButton>
				</OptionsWrapper>
			)}
		</DraggebleItemWrapper>
	);
};

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
`;

const DraggebleItemWrapper = styled.div(
	({ theme: { colors } }) => css`
		width: 100%;
		background-color: ${colors.powderWhite};
		border-radius: 5px;
		padding: 15px 10px;
		/* border: 1px solid black; */
	`,
);

const ItemTitle = styled.h3<{ titleColor: TitleBackgroundColor }>(
	({ titleColor, theme: { colors, fontSize } }) => css`
		margin: 0;
		font-weight: 500;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		background-color: ${itemTitleColors[titleColor]};
		padding: 4px 10px;
		border-radius: 7px;
		color: ${colors.powderWhite};
		font-size: ${fontSize.s}px;
	`,
);

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

const DescriptionWrapper = styled.div<{ isExpanded: boolean }>(
	({ theme: { colors }, isExpanded }) => css`
		padding: 0 8px;
		background-color: ${colors.powderWhite};
		margin-top: 6px;
		overflow: hidden;
		width: 100%;

		${() =>
			!isExpanded &&
			css`
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			`}
	`,
);

const ItemDescription = styled.p(
	({ theme: { colors, fontSize } }) => css`
		margin: 0;
		color: ${colors.itemText};
		font-size: ${fontSize.s}px;
	`,
);

const OptionsWrapper = styled.div`
	width: 100%;
	padding: 15px 20px 0px 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;
