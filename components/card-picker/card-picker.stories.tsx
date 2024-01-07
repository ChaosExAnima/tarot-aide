import CardsIcon from 'components/icons/cards';

import CardPicker from './index';

import type { Meta, StoryObj } from '@storybook/react';

export default {
	title: 'Card Picker',
	component: CardPicker,
	argTypes: {
		onPick: { action: 'picked' },
	},
	render(args) {
		return (
			<CardPicker {...args} isIconOnly>
				<CardsIcon />
			</CardPicker>
		);
	},
} as Meta<typeof CardPicker>;
type Story = StoryObj<typeof CardPicker>;

export const Primary: Story = {};

export const DisabledSuits: Story = {
	args: {
		disabledSuits: ['major', 'cups'],
	},
};

export const DisabledCards: Story = {
	args: {
		disabledCards: [
			'death',
			'ace of cups',
			'nine of wands',
			'king of swords',
			'queen of pentacles',
		],
	},
};
