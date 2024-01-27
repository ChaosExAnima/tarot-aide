import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Input, Link, Textarea } from '@nextui-org/react';
import { useRouter } from 'next/router';

import CardPicker from 'components/card-picker';
import Page from 'components/page';
import { AllCards, MajorSuit } from 'lib/cards/constants';
import {
	cardUrl,
	displayCardFullName,
	displayCardShortName,
	displaySuitName,
	isMinorTarotCard,
} from 'lib/cards/utils';

import { CardPageProps } from './index';

export default function NewCardReference({ card, reversed }: CardPageProps) {
	const cardIndex = AllCards.findIndex((c) => c === card.name);
	const prevCard = cardIndex > 0 ? AllCards[cardIndex - 1] : null;
	const nextCard =
		cardIndex < AllCards.length - 1 ? AllCards[cardIndex + 1] : null;
	const name = displayCardFullName(card);
	const suit = isMinorTarotCard(card) ? card.suit : MajorSuit;
	const router = useRouter();
	return (
		<Page
			title={`New Reference - ${name}`}
			breadcrumbs={[
				{ label: displaySuitName(suit), href: `/suits/${suit}` },
				{ label: name, href: cardUrl(card.name) },
				reversed && {
					label: 'Reversed',
					href: cardUrl(card.name, true),
				},
				{
					label: 'Add reference',
					href: cardUrl(card.name, reversed, true),
				},
			]}
		>
			<h1 className="text-4xl font-bold text-center mb-2">
				New reference for {name}
			</h1>
			<h2 className="text-center mb-2">
				<Link
					href={cardUrl(card.name, !reversed, true)}
					className="text-2xl text-content4 hover:text-primary-500"
				>
					{reversed ? 'Reversed' : 'Upright'}
				</Link>
			</h2>
			<Input label="Source" placeholder="Book or url" />
			<Textarea label="Text" isRequired />
			<ButtonGroup>
				<CardNavButton card={prevCard} reversed={reversed} />
				<CardPicker
					onPick={({ name }) => {
						router.push(cardUrl(name, reversed, true));
					}}
				>
					Pick a card
				</CardPicker>
				<CardNavButton card={nextCard} reversed={reversed} next />
			</ButtonGroup>
		</Page>
	);
}

interface CardNavButtonProps {
	card: string | null;
	reversed: boolean;
	next?: boolean;
}

function CardNavButton({ card, reversed, next = false }: CardNavButtonProps) {
	if (!card) {
		return (
			<Button
				isDisabled
				startContent={!next && <FontAwesomeIcon icon={faChevronLeft} />}
				endContent={next && <FontAwesomeIcon icon={faChevronRight} />}
			>
				{next ? 'Last card' : 'First card'}
			</Button>
		);
	}
	return (
		<Button
			as={Link}
			href={cardUrl(card, reversed, true)}
			startContent={!next && <FontAwesomeIcon icon={faChevronLeft} />}
			endContent={next && <FontAwesomeIcon icon={faChevronRight} />}
		>
			{displayCardShortName({ name: card })}
		</Button>
	);
}

export { getServerSideProps } from './index';
