import { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/preset-create-react-app',
		'@storybook/addon-onboarding',
		'@storybook/addon-interactions',
		'storybook-preset-inline-svg',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	staticDirs: ['../public'],
	webpackFinal: async (config) => {
		const fileLoaderRule = config?.module?.rules?.find(
			//@ts-expect-error asd
            (rule) => rule?.test && rule.test.test(".svg")
        );
		//@ts-expect-error asd
        fileLoaderRule.exclude = /\.svg$/;
		//@ts-expect-error asd
        config.module.rules.push({
            test: /\.svg$/,
            enforce: "pre",
            loader: require.resolve("@svgr/webpack")
        });

		return config;
	},
};

export default config;
