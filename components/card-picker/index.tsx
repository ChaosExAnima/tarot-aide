import {
	Button,
	ButtonProps,
	Modal,
	ModalBody,
	ModalContent,
	useDisclosure,
} from '@nextui-org/react';
import { clsx } from 'clsx';
import { ReactNode, useState } from 'react';

import { AllSuitsWithMajor, AnyCard, SuitWithMajor } from 'lib/cards/constants';
import { TarotCard } from 'lib/cards/types';
import { getCardsFromSuit } from 'lib/cards/utils';
import { displayCase } from 'lib/text';

interface CardPickerProps extends ButtonProps {
	children: ReactNode;
	onPick: (_: TarotCard) => void;
	disabledCards?: AnyCard[];
}

export default function CardPicker({
	children,
	onPick,
	disabledCards,
	...props
}: CardPickerProps) {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
	const [suit, setSuit] = useState<null | SuitWithMajor>(null);
	const toggleShowing = () => {
		onOpen();
		setSuit(null);
	};
	const select = (card: TarotCard) => {
		onPick(card);
		onClose();
		setSuit(null);
	};
	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
				backdrop="blur"
				classNames={{
					wrapper: 'top-10',
				}}
				hideCloseButton
			>
				<ModalContent>
					<ModalBody
						className={clsx(
							'grid',
							!suit ? 'grid-cols-1' : 'grid-cols-3',
							'gap-4 p-4',
						)}
					>
						{!suit &&
							AllSuitsWithMajor.map((suitName) => (
								<Button
									key={suitName}
									onClick={() => setSuit(suitName)}
								>
									{displayCase(suitName)}
								</Button>
							))}
						{suit &&
							getCardsFromSuit(suit).map((card) => {
								const disabled = disabledCards?.includes(
									card.name,
								);
								return (
									<Button
										fullWidth
										key={card.name}
										onClick={() => select(card)}
										isDisabled={disabled}
									>
										{displayCase(card.name)}
									</Button>
								);
							})}
					</ModalBody>
				</ModalContent>
			</Modal>
			<Button {...props} onPress={toggleShowing}>
				{children}
			</Button>
		</>
	);
}
