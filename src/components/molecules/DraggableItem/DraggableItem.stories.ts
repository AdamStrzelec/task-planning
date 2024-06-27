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
		id: '1',
		title: 'In progress asddasadssda qwwqeqw asdsad',
		text: 'text asd adsdwqewqeqw assadsasda qwwqeqw asdsad qwwqee asddsa sadsadsa qwwqeqew xzcxz asadas qweqwqwe asddsa xzcz qwewqewqwe sadassadds xxcx',
	},
};
