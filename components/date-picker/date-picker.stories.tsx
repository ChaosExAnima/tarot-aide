import DatePicker from '.';

import type { Meta, StoryObj } from '@storybook/react';

export default {
	title: 'Date Picker',
	component: DatePicker,
	parameters: {},
} satisfies Meta<typeof DatePicker>;
type Story = StoryObj<typeof DatePicker>;

export const Primary: Story = {};
