import OracleCardEditing from './editing';
import OracleCardStatic from './static';

import type { Meta, StoryObj } from '@storybook/react';

export default {
	title: 'Spread Card',
	component: OracleCardEditing,
	render(args) {
		return (
			<div className="w-96">
				<OracleCardEditing {...args} />
			</div>
		);
	},
} satisfies Meta<typeof OracleCardEditing & { static?: boolean }>;
type Story = StoryObj<typeof OracleCardEditing>;

export const EmptySpread: Story = {
	args: {
		position: {
			name: '',
		},
	},
};

export const TemplateSpread: Story = {
	args: {
		isCardAllowed: false,
		position: {
			name: 'Past',
		},
	},
};

export const FilledSpread: Story = {
	args: {
		position: {
			name: 'Past',
			card: {
				name: 'fool',
			},
			notes: 'This is a note',
		},
	},
};

export const StaticSpread: Story = {
	args: {
		position: {
			name: 'Past',
			card: {
				name: 'fool',
			},
			notes: 'This is a note',
		},
	},
	render(args) {
		return (
			<div className="w-96">
				<OracleCardStatic {...args} />
			</div>
		);
	},
};
