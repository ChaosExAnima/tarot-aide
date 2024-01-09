import CardsIcon from 'components/icons/cards';
import { AllCards, AllSuitsWithMajor } from 'lib/cards/constants';
import {
	displayCardFullName,
	displaySuitName,
	getCardFromName,
} from 'lib/cards/utils';

import CardPicker from './index';

import type { Meta, StoryObj } from '@storybook/react';

export default {
	title: 'Card Picker',
	component: CardPicker,
	argTypes: {
		disabledSuits: {
			control: {
				type: 'multi-select',
				labels: AllSuitsWithMajor.reduce(
					(labels, suit) => ({
						...labels,
						[suit]: displaySuitName(suit),
					}),
					{},
				),
			},
			options: AllSuitsWithMajor,
		},
		disabledCards: {
			control: {
				type: 'multi-select',
				labels: AllCards.reduce(
					(labels, cardName) => ({
						...labels,
						[cardName]: displayCardFullName(
							getCardFromName(cardName)!,
						),
					}),
					{},
				),
			},
			options: AllCards,
		},
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
