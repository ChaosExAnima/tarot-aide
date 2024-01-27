import {
	faCancel,
	faChevronLeft,
	faChevronRight,
	faSave,
	faTrash,
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
import { ApiError } from 'lib/api';
import {
	mutateCreateCardReference,
	mutateDeleteCardReference,
	mutateUpdateCardReference,
} from 'lib/cards/api';
import { AllCards, MajorSuit } from 'lib/cards/constants';
import { cardReference } from 'lib/cards/db';
import {
	cardUrl,
	displayCardFullName,
	displayCardShortName,
	displaySuitName,
	getCardFromName,
	isMinorTarotCard,
} from 'lib/cards/utils';
import { userFromServerContext } from 'lib/users';

import type { CardPageContext, CardPageProps } from '../index';
import type { CardReference, GenericOrTarotCard } from 'lib/cards/types';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export interface CardReferencePageProps extends Omit<CardPageProps, 'card'> {
	card: GenericOrTarotCard;
	reference?: CardReference;
	defaultSource?: string;
}

export default function EditCardReference({
	card,
	reversed,
	reference,
	defaultSource = '',
}: CardReferencePageProps) {
	const name = displayCardFullName(card);
	const suit = isMinorTarotCard(card) ? card.suit : MajorSuit;

	// Card lookups
	const cardIndex = AllCards.findIndex((c) => c === card.name);
	const prevCard = cardIndex > 0 ? AllCards[cardIndex - 1] : null;
	const nextCard =
		cardIndex < AllCards.length - 1 ? AllCards[cardIndex + 1] : null;

	// State management
	const [source, setSouce] = useState(reference?.source ?? defaultSource);
	const [keywords, setKeywords] = useState<string[]>(
		reference?.keywords ?? [],
	);
	const [text, setText] = useState(reference?.text ?? '');

	const router = useRouter();
	const {
		isPending: isUpdatePending,
		isSuccess: isUpdateSuccess,
		mutate: updateReference,
	} = useMutation({
		mutationFn: (_dest: string) => {
			const body = {
				card: card.name,
				text,
				source,
				reversed,
				keywords,
			};
			if (reference) {
				return mutateUpdateCardReference(body, reference.id);
			}
			return mutateCreateCardReference(body);
		},
		onSuccess(_, dest) {
			router.push(dest);
		},
	});
	const {
		isPending: isDeletePending,
		isSuccess: isDeleteSuccess,
		mutate: deleteReference,
	} = useMutation({
		mutationFn: () => {
			if (!reference) {
				throw new Error('No reference to delete');
			}
			return mutateDeleteCardReference(reference.id);
		},
		onSuccess() {
			router.push(cardUrl(card.name, reversed));
		},
		onError(err) {
			if (err instanceof ApiError) {
			}
		},
	});
	const isPending =
		isDeletePending ||
		isUpdatePending ||
		isDeleteSuccess ||
		isUpdateSuccess;
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
			{isPending && (
				<CircularProgress className="mx-auto" label="Loading…" />
			)}
			<div className="grid grid-cols-3 gap-4" role="group">
				<CardNavButton
					card={prevCard}
					reversed={reversed}
					isDisabled={disabled}
					onPress={() =>
						updateReference(cardUrl(prevCard!, reversed, true))
					}
				/>
				<CollapsibleButton
					onPress={() =>
						updateReference(cardUrl(card.name, reversed))
					}
					color="success"
					isDisabled={disabled}
					startContent={<FontAwesomeIcon icon={faSave} />}
				>
					Save
				</CollapsibleButton>
				<CardNavButton
					card={nextCard}
					reversed={reversed}
					next
					isDisabled={disabled}
					onPress={() =>
						updateReference(cardUrl(nextCard!, reversed, true))
					}
				/>
				<CardPicker
					onPick={({ name }) =>
						updateReference(cardUrl(name, reversed, true))
					}
					startContent={<CardsIcon />}
					color="success"
					isDisabled={disabled}
					className="px-0 sm:px-unit-4 min-w-0"
				>
					<span className="hidden sm:block">Jump to card</span>
				</CardPicker>
				<CollapsibleButton
					color="primary"
					startContent={<FontAwesomeIcon icon={faCancel} />}
					onPress={() => router.push(cardUrl(card.name, reversed))}
				>
					Cancel
				</CollapsibleButton>
				{reference && (
					<CollapsibleButton
						color="danger"
						startContent={<FontAwesomeIcon icon={faTrash} />}
						onPress={() => deleteReference()}
					>
						Delete
					</CollapsibleButton>
				)}
			</div>
		</Page>
	);
}

interface CardNavButtonProps {
	card: string | null;
	reversed: boolean;
	next?: boolean;
}

function CollapsibleButton({ children, className, ...props }: ButtonProps) {
	return (
		<Button
			{...props}
			className={`px-0 sm:px-unit-4 min-w-0 ${className ?? ''}`}
		>
			{children && <span className="hidden sm:block">{children}</span>}
		</Button>
	);
}

function CardNavButton({
	card,
	next = false,
	...props
}: CardNavButtonProps & ButtonProps) {
	if (!card) {
		return (
			<CollapsibleButton
				startContent={!next && <FontAwesomeIcon icon={faChevronLeft} />}
				endContent={next && <FontAwesomeIcon icon={faChevronRight} />}
				{...props}
				isDisabled
			>
				{next ? 'Last card' : 'First card'}
			</CollapsibleButton>
		);
	}
	return (
		<CollapsibleButton
			startContent={!next && <FontAwesomeIcon icon={faChevronLeft} />}
			endContent={next && <FontAwesomeIcon icon={faChevronRight} />}
			color="success"
			{...props}
		>
			{displayCardShortName({ name: card })}
		</CollapsibleButton>
	);
}

export async function getServerSideProps(
	context: GetServerSidePropsContext<CardPageContext>,
): Promise<GetServerSidePropsResult<CardReferencePageProps>> {
	const cardName = context.params?.card?.replaceAll('-', ' ') ?? '';
	const card = getCardFromName(cardName);
	if (!card) {
		return {
			notFound: true,
		};
	}

	let defaultSource = undefined;
	if (context.resolvedUrl.includes('?')) {
		const query = new URLSearchParams(context.resolvedUrl.split('?')[1]);
		const fromId = Number.parseInt(query.get('from') ?? '');
		const user = await userFromServerContext(context);
		if (fromId > 0) {
			const fromReference = await cardReference(fromId, user.id);
			defaultSource = fromReference.source;
		}
	}

	return {
		props: {
			card,
			reversed: context.resolvedUrl.includes('/reversed'),
			defaultSource,
		},
	};
}
