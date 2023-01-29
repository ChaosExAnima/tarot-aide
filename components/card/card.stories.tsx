import Card, { CardProps } from './index';

import type { Meta } from '@storybook/react';

export default {
	title: 'Card',
	component: Card,
	argTypes: {
		card: {},
	},
} satisfies Meta<typeof Card>;

export function Primary(args: CardProps) {
	return <Card {...args} />;
}
