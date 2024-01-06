import OracleCard from './index';

import type { Meta, StoryObj } from '@storybook/react';

export default {
	component: OracleCard,
	args: {
		card: {
			name: 'fool',
		},
	},
} satisfies Meta<typeof OracleCard>;
type Story = StoryObj<typeof OracleCard>;

export const Primary: Story = {};
