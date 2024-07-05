import React from 'react';
import { DraggableColumn } from './DraggableColumn';
import type { Meta, StoryObj } from '@storybook/react';
import { DraggableItem } from '../DraggableItem/DraggableItem';

// eslint-disable-next-line storybook/story-exports
const meta: Meta<typeof DraggableColumn> = {
	component: DraggableColumn,
};

export default meta;
type Story = StoryObj<typeof DraggableColumn>;

export const Primary: Story = {
	render: (args) => (
		<div style={{ backgroundColor: 'blue', padding: 20 }}>
			<DraggableColumn {...args}>
				<div style={{ padding: 5 }}>
					<DraggableItem
						id={'1'}
						text={'Item 1 text'}
						title={'Item 1'}
					/>
				</div>
				<div style={{ padding: 5 }}>
					<DraggableItem
						id={'2'}
						text={'Item 2 text'}
						title={'Item 2'}
					/>
				</div>
				<div style={{ padding: 5 }}>
					<DraggableItem
						id={'3'}
						text={'Item 3 text'}
						title={'Item 3'}
					/>
				</div>
			</DraggableColumn>
		</div>
	),
	args: {
		id: '1',
		title: 'In progress',
	},
};
