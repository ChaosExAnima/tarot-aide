import Card from './index';

import type { Meta, StoryObj } from '@storybook/react';

export default {
	title: 'Card',
	component: Card,
} satisfies Meta<typeof Card>;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
	args: {
		link: false,
		card: {
			name: 'Test Card',
			image: 'https://picsum.photos/seed/storybook/300/550.webp?blur',
		},
		width: 300,
		height: 550,
	},
};
