import { ClassNameProps } from 'lib/types';

import CardsIcon from './cards';
import CupsIcon from './cups';
import MajorArcanaIcon from './major';
import PentaclesIcon from './pentacles';
import SwordsIcon from './swords';
import WandsIcon from './wands';

import type { Meta, StoryObj } from '@storybook/react';

function Icon() {
	return <svg />;
}

type CustomArgs = ClassNameProps & { size: number };

export default {
	title: 'Icons',
	component: Icon,
	args: {
		size: 5,
	},
	argTypes: {
		size: {
			options: [5, 10, 20, 40],
			control: {
				type: 'select',
			},
		},
	},
} satisfies Meta<CustomArgs>;
type Story = StoryObj<CustomArgs>;

export const Cards: Story = {
	render({ size }) {
		return <CardsIcon className={`min-h-${size}`} />;
	},
};

export const MajorArcana: Story = {
	render({ size }) {
		return <MajorArcanaIcon className={`h-${size}`} />;
	},
};

export const Cups: Story = {
	render({ size }) {
		return <CupsIcon className={`h-${size}`} />;
	},
};

export const Pentacles: Story = {
	render({ size }) {
		return <PentaclesIcon className={`h-${size}`} />;
	},
};

export const Swords: Story = {
	render({ size }) {
		return <SwordsIcon className={`h-${size}`} />;
	},
};

export const Wands: Story = {
	render({ size }) {
		return <WandsIcon className={`h-${size}`} />;
	},
};
