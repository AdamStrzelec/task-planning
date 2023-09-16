import React from 'react';
import { storiesOf } from '@storybook/react';
import { DragElement } from './DragElement';

// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DragElement> = {
	component: DragElement,
};

export default meta;
type Story = StoryObj<typeof DragElement>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
	render: () => (
		<DragElement
			id={'1'}
			posX={0}
			posY={0}
			color={'red'}
			onDragItem={() => {
				return;
			}}
		/>
	),
};
