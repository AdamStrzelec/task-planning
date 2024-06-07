import React from 'react';
import styled, { css } from 'styled-components';
import { OptionsIcon } from 'src/assets/Icons/Icons';

interface DraggableItemProps {
	id: string;
	title: string;
	text: string;
}

export const DraggableItem = ({ title, text }: DraggableItemProps) => {
	return (
		// <div
		// 	style={{
		// 		padding: 30,
		// 		backgroundColor: 'red',
		// 		border: '1px solid blue',
		// 	}}
		// >
		<DraggebleItemWrapper>
			<HeaderWrapper>
				<ItemTitle>{title}</ItemTitle>
				<OptionsButton>
					<StyledOptionsIcon />
				</OptionsButton>
			</HeaderWrapper>
			<DescriptionWrapper>
				<ItemDescription>{text}</ItemDescription>
			</DescriptionWrapper>
		</DraggebleItemWrapper>
		// </div>
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
		/* height: 100%; */
		background-color: ${colors.lightBlue};
		border-radius: 7px;
		padding: 12px 8px;
	`,
);

const ItemTitle = styled.h3`
	margin: 0;
	font-weight: 500;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

const OptionsButton = styled.button(
	({ theme: { colors } }) => css`
		width: 22px;
		height: 22px;
		background-color: ${colors.powderWhite};
		border: none;
		border-radius: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	`,
);

const StyledOptionsIcon = styled(OptionsIcon)(
	({ theme: { colors } }) => css`
		width: 10px;
		height: 10px;
		fill: ${colors.onyx};
	`,
);

const DescriptionWrapper = styled.div(
	({ theme: { colors } }) => css`
		padding: 8px;
		background-color: ${colors.powderWhite};
		margin-top: 6px;
		border-radius: 5px;
	`,
);

const ItemDescription = styled.p`
	margin: 0;
`;
