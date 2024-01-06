import CardsIcon from './cards';

import type { Meta, StoryObj } from '@storybook/react';

function Icon() {
	return <svg />;
}

export default {
	title: 'Icons',
	component: Icon,
} satisfies Meta<typeof Icon>;
type Story = StoryObj<typeof Icon>;

export const Cards: Story = {
	render() {
		return <CardsIcon className="min-h-20" />;
	},
};
