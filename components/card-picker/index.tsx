import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	ButtonProps,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react';
import { clsx } from 'clsx';
import { ReactNode, useState } from 'react';

import { SuitIcon } from 'components/cards/display';
import { AllSuitsWithMajor, SuitWithMajor } from 'lib/cards/constants';
import { GenericCard } from 'lib/cards/types';
import {
	displayCardShortName,
	displaySuitName,
	getCardsFromSuit,
} from 'lib/cards/utils';
import { displayCase } from 'lib/text';

interface CardPickerProps extends ButtonProps {
	children: ReactNode;
	onPick: (card: GenericCard) => void;
	disabledSuits?: SuitWithMajor[];
	disabledCards?: string[];
}

export default function CardPicker({
	children,
	onPick,
	disabledSuits = [],
	disabledCards = [],
	...props
}: CardPickerProps) {
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
	const [suit, setSuit] = useState<null | SuitWithMajor>(null);
	const toggleShowing = () => {
		onOpen();
		setSuit(null);
	};
	const select = (card: GenericCard) => {
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
					<ModalHeader className="p-4">
						{!suit && 'Pick your suit'}
						{suit && (
							<>
								<span className="grow">
									Select your card in {displayCase(suit)}
								</span>
								<Button
									isIconOnly
									onClick={() => setSuit(null)}
								>
									<FontAwesomeIcon icon={faArrowLeft} />
								</Button>
							</>
						)}
					</ModalHeader>
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
									isDisabled={disabledSuits.includes(
										suitName,
									)}
								>
									{displaySuitName(suitName)}
									<SuitIcon suit={suitName} className="h-4" />
								</Button>
							))}
						{suit &&
							getCardsFromSuit(suit).map((card) => (
								<Button
									fullWidth
									key={card.name}
									onClick={() => select(card)}
									isDisabled={disabledCards.includes(
										card.name,
									)}
								>
									{displayCardShortName(card)}
								</Button>
							))}
					</ModalBody>
				</ModalContent>
			</Modal>
			<Button {...props} onPress={toggleShowing}>
				{children}
			</Button>
		</>
	);
}
