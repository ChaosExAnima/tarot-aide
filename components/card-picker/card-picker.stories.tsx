import CardsIcon from 'components/icons/cards';

import CardPicker from './index';

import type { Meta, StoryObj } from '@storybook/react';

export default {
	title: 'Card Picker',
	component: CardPicker,
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
