import Card, { CardProps } from './index';

import type { ComponentMeta } from '@storybook/react';

export default {
	title: 'Card',
	component: Card,
	argTypes: {
		color: {
			options: ['red', 'blue'],
			control: { type: 'radio' },
			defaultValue: 'red',
		},
	},
} satisfies ComponentMeta<typeof Card>;

export function Primary(args: CardProps) {
	return <Card {...args} />;
}
