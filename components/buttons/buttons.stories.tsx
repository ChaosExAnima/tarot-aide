import { Button } from '@nextui-org/react';

import CancelButton from './cancel';
import SaveButton from './save';

import type { Meta, StoryObj } from '@storybook/react';

export default {
	title: 'Button Types',
	component: Button,
} satisfies Meta<typeof Button>;
type Story = StoryObj<typeof Button>;

export const Cancel: Story = {
	render(args) {
		return <CancelButton {...args} />;
	},
};

export const Save: Story = {
	render(args) {
		return <SaveButton {...args} />;
	},
};
