import OracleCard from './index';

import type { Meta, StoryObj } from '@storybook/react';

export default {
	title: 'Spread Card',
	component: OracleCard,
	render(args) {
		return (
			<div className="w-96">
				<OracleCard {...args} />
			</div>
		);
	},
} satisfies Meta<typeof OracleCard>;
type Story = StoryObj<typeof OracleCard>;

export const EmptySpread: Story = {
	args: {
		spread: {
			name: '',
		},
	},
};
export const TemplateSpread: Story = {
	args: {
		spread: {
			name: 'Past',
		},
	},
};

export const FilledSpread: Story = {
	args: {
		spread: {
			name: 'Past',
			card: {
				name: 'fool',
			},
		},
	},
};
