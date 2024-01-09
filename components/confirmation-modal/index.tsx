import {
	Button,
	ButtonProps,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react';
import { ReactNode } from 'react';

interface ConfirmationModalProps {
	header?: ReactNode;
	body?: ReactNode;
	onConfirm: () => void;
	confirmLabel?: ReactNode;
	onCancel?: () => void;
	cancelLabel?: ReactNode;
}

export default function ConfirmationModal({
	header = 'Are you sure?',
	body = 'This action cannot be undone.',
	onConfirm,
	confirmLabel = 'Confirm',
	onCancel,
	cancelLabel = 'Cancel',
	...props
}: ConfirmationModalProps & ButtonProps) {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
	if (!isOpen) {
		return <Button color="danger" {...props} onPress={onOpen} />;
	}

	const handleClose = () => {
		if (onCancel) {
			onCancel();
		}
		onClose();
	};

	return (
		<>
			<Button color="danger" {...props} onPress={onOpen} />
			<Modal
				isOpen
				onOpenChange={onOpenChange}
				placement="top-center"
				backdrop="blur"
				classNames={{
					wrapper: 'top-10',
				}}
				hideCloseButton
			>
				<ModalContent>
					<ModalHeader>{header}</ModalHeader>
					<ModalBody className="pb-6">
						{typeof body === 'string' ? <p>{body}</p> : body}
						<div className="flex gap-4">
							<Button
								onClick={handleClose}
								className="rounded-xl"
								isDisabled={props.isDisabled}
							>
								{cancelLabel}
							</Button>
							<Button
								color="danger"
								onClick={onConfirm}
								className="rounded-xl"
								isDisabled={props.isDisabled}
								isLoading={props.isLoading}
							>
								{confirmLabel}
							</Button>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
