import React from 'react';
import styled from 'styled-components';
import * as Icons from 'src/assets/Icons/SVGs';
import { theme } from 'src/theme/theme';

export type IconNames = keyof typeof Icons;

type IconsColors = keyof typeof theme.colors;

interface IconManagerProps {
	name: IconNames;
	color?: IconsColors;
	bgColor?: IconsColors;
	size?: number;
	rotate?: number;
}

export const IconManager = ({
	name,
	color,
	bgColor,
	size,
	rotate,
}: IconManagerProps) => {
	const Icon = Icons[name];
	return (
		<IconWrapper rotate={rotate}>
			<Icon
				fill={color ? theme.colors[color] : theme.colors['onyx']}
				bgColor={bgColor ? theme.colors[bgColor] : theme.colors['onyx']}
				size={size}
			/>
		</IconWrapper>
	);
};

const IconWrapper = styled.div<{ rotate?: number }>`
	transform: rotate(${({ rotate }) => rotate || 0}deg);
	display: flex;
`;
