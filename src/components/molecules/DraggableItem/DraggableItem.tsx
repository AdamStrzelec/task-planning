import React from 'react';
import styled, { css } from 'styled-components';

interface DraggableItemProps {
	title: string;
	text: string;
}

export const DraggableItem = ({ title, text }: DraggableItemProps) => {
	return (
		<DraggebleItemWrapper>
			<h3>{title}</h3>
			<p>{text}</p>
		</DraggebleItemWrapper>
	);
};

const DraggebleItemWrapper = styled.div(
	({ theme: { colors } }) => css`
		width: 100%;
		height: 100%;
		background-color: ${colors.persianGreen};
		border-radius: 10px;
		padding: 5px;
	`,
);
