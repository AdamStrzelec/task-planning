import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { GlobalStyle } from '../src/global/global.styles';
import {Theme} from '../src/theme/theme'

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
};

export const decorators = [
	withThemeFromJSXProvider({
		Provider: Theme,
	  GlobalStyles: GlobalStyle,
	}),
  ];

export default preview;
