import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import ButtonLink from 'components/button-link';
import { CollapsibleButton } from 'components/buttons/collapsible';
import ConfirmationModal from 'components/confirmation-modal';
import Page from 'components/page';
import { mutateDeleteDeck } from 'lib/spreads/api';
import { deckById, spreadsByDeck } from 'lib/spreads/db';
import { displaySpreadName } from 'lib/spreads/utils';
import { displayRelativeDate } from 'lib/text';
import { userFromServerContext } from 'lib/users';

import type { Deck, ExistingSpread } from 'lib/spreads/types';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

interface DeckPageProps {
	deck: Deck;
	spreads: ExistingSpread[];
}

export default function DeckPage({ deck, spreads }: DeckPageProps) {
	const router = useRouter();
	const deleteDeck = useMutation({
		mutationFn: () => mutateDeleteDeck(deck.id),
		onSuccess() {
			router.push('/decks');
		},
	});
	return (
		<Page
			title="Deck"
			breadcrumbs={[
				{ label: 'Decks', href: '/decks' },
				{ label: deck.name, href: `/decks/${deck.id}` },
			]}
		>
			<header className="flex flex-nowrap gap-4 items-center mb-4">
				<h1 className="text-6xl font-bold grow">{deck.name}</h1>
				<ButtonGroup>
					<CollapsibleButton
						as={Link}
						href={`/decks/${deck.id}/edit`}
						color="primary"
						startContent={<FontAwesomeIcon icon={faEdit} />}
					>
						Edit
					</CollapsibleButton>
					<ConfirmationModal
						onConfirm={deleteDeck.mutate}
						header="Delete this deck?"
						body="This is permanent!"
						startContent={<FontAwesomeIcon icon={faTrash} />}
						className="px-0 sm:px-unit-4 min-w-unit-10"
					>
						<span className="hidden sm:block">Delete</span>
					</ConfirmationModal>
				</ButtonGroup>
			</header>
			{deck.notes && <p>{deck.notes}</p>}
			{spreads.length > 0 && (
				<>
					<p className="text-lg">Spreads that use this deck:</p>
					{spreads.map((spread) => (
						<ButtonLink
							href={`/spreads/${spread.id}`}
							key={spread.id}
							color="secondary"
							className="text-slate-900"
						>
							{displaySpreadName(spread)}
							<span className="opacity-60 font-normal">
								{displayRelativeDate(spread.date)}
							</span>
						</ButtonLink>
					))}
				</>
			)}
			{spreads.length === 0 && (
				<p className="text-lg">No spreads use this deck yet</p>
			)}
		</Page>
	);
}

export async function getServerSideProps(
	context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<DeckPageProps>> {
	const id = String(context.params?.id);
	if (!id) {
		return { notFound: true };
	}
	const user = await userFromServerContext(context);
	if (!user) {
		return {
			notFound: true,
		};
	}
	const deck = await deckById(id, user.id);
	if (!deck) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			deck,
			spreads: await spreadsByDeck(deck.id, user.id),
		},
	};
}
