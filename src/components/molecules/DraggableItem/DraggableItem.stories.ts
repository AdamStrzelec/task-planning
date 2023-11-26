import { DraggableItem } from './DraggableItem';
import type { Meta, StoryObj } from '@storybook/react';

// eslint-disable-next-line storybook/story-exports
const meta: Meta<typeof DraggableItem> = {
	component: DraggableItem,
};

export default meta;
type Story = StoryObj<typeof DraggableItem>;

export const Primary: Story = {
	args: {
		title: 'title',
		text: 'text',
	},
};
