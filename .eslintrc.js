module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:storybook/recommended"
    ],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'react', 'prettier'],
	rules: {
		indent: ['error', 'tab'],
		'prettier/prettier': [2, { useTabs: true }],
		// indent: ["error", "tab"],
		// "linebreak-style": ["error", "unix"],
		// quotes: ["error", "single"],
		// semi: ["error", "always"],
	},
};