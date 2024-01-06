import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ConfirmationModal from '.';

import type { Meta, StoryObj } from '@storybook/react';

export default {
	component: ConfirmationModal,
	args: {
		color: 'danger',
	},
	argTypes: {
		color: {
			options: ['primary', 'secondary', 'success', 'warning', 'danger'],
			control: { type: 'select' },
		},
		onCancel: { action: 'canceled' },
		onConfirm: { action: 'confirmed' },
	},
} satisfies Meta<typeof ConfirmationModal>;
type Story = StoryObj<typeof ConfirmationModal>;

export const Primary: Story = {
	render: (props) => (
		<ConfirmationModal
			{...props}
			startContent={<FontAwesomeIcon icon={faTrash} />}
		>
			Delete
		</ConfirmationModal>
	),
};
