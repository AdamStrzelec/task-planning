import React from 'react';
import { ThemeProvider } from 'styled-components';

export const theme = {
	colors: {
		powderWhite: '#f3f6f4',
		persianGreen: '#06B49A',
		lightBlue: '#AFDBD2',
		onyx: '#36313D',
		itemText: '#4b4e56',
		errorRed: '#C80036',
		blueInfo: '#3572EF',
	},
	fontSize: {
		xxs: 10,
		xs: 14,
		s: 16,
		m: 20,
		l: 26,
		xl: 32,
	},
};

interface ThemeProps {
	children: React.ReactNode;
}

export type ThemeType = typeof theme;

export const Theme = ({ children }: ThemeProps) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);
