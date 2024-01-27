import {
	faChevronLeft,
	faChevronRight,
	faSave,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	ButtonProps,
	CircularProgress,
	Input,
	Link,
	Textarea,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import CardPicker from 'components/card-picker';
import CardsIcon from 'components/icons/cards';
import Page from 'components/page';
import TagPicker from 'components/tag-picker';
import { mutateCreateCardReference } from 'lib/cards/api';
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
	const name = displayCardFullName(card);
	const suit = isMinorTarotCard(card) ? card.suit : MajorSuit;

	// Card lookups
	const cardIndex = AllCards.findIndex((c) => c === card.name);
	const prevCard = cardIndex > 0 ? AllCards[cardIndex - 1] : null;
	const nextCard =
		cardIndex < AllCards.length - 1 ? AllCards[cardIndex + 1] : null;

	// State management
	const router = useRouter();
	const [source, setSouce] = useState('');
	const [keywords, setKeywords] = useState<string[]>([]);
	const [text, setText] = useState('');

	const { isPending, mutate } = useMutation({
		mutationFn: (_dest: string) =>
			mutateCreateCardReference(card.name, {
				text,
				source,
				reversed,
				keywords,
			}),
		onSuccess(_, dest) {
			router.push(dest);
		},
	});
	const disabled = !text || isPending;

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
			<Input
				label="Source"
				placeholder="Book or url"
				value={source}
				onValueChange={setSouce}
			/>
			<TagPicker
				tags={keywords}
				onChange={setKeywords}
				label="Keywords"
			/>
			<Textarea
				label="Text"
				isRequired
				value={text}
				onValueChange={setText}
			/>
			{!isPending && (
				<p className="text-center text-sm text-default-300">
					Save and:
				</p>
			)}
			{isPending && <CircularProgress className="mx-auto" />}
			<div className="flex gap-4 justify-center" role="group">
				<CardNavButton
					card={prevCard}
					reversed={reversed}
					isDisabled={disabled}
					onPress={() => mutate(cardUrl(prevCard!, reversed, true))}
				/>
				<CardPicker
					onPick={({ name }) => mutate(cardUrl(name, reversed, true))}
					startContent={<CardsIcon />}
					color="success"
					isDisabled={disabled}
				>
					<span className="hidden sm:block">Jump to card</span>
				</CardPicker>
				<Button
					onPress={() => mutate(cardUrl(card.name, reversed))}
					color="success"
					isDisabled={disabled}
					startContent={<FontAwesomeIcon icon={faSave} />}
				>
					<span className="hidden sm:block">Back to card</span>
				</Button>
				<CardNavButton
					card={nextCard}
					reversed={reversed}
					next
					isDisabled={disabled}
					onPress={() => mutate(cardUrl(nextCard!, reversed, true))}
				/>
			</div>
		</Page>
	);
}

interface CardNavButtonProps {
	card: string | null;
	reversed: boolean;
	next?: boolean;
}

function CardNavButton({
	card,
	next = false,
	...props
}: CardNavButtonProps & ButtonProps) {
	if (!card) {
		return (
			<Button
				startContent={!next && <FontAwesomeIcon icon={faChevronLeft} />}
				endContent={next && <FontAwesomeIcon icon={faChevronRight} />}
				{...props}
				isDisabled
			>
				{next ? 'Last card' : 'First card'}
			</Button>
		);
	}
	return (
		<Button
			startContent={!next && <FontAwesomeIcon icon={faChevronLeft} />}
			endContent={next && <FontAwesomeIcon icon={faChevronRight} />}
			color="success"
			{...props}
		>
			{displayCardShortName({ name: card })}
		</Button>
	);
}

export { getServerSideProps } from './index';
