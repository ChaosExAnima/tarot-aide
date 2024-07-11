import { Button, Input, Textarea } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import ButtonLink from 'components/button-link';
import Page from 'components/page';
import { mutateUpdateDeck } from 'lib/spreads/api';
import { deckById } from 'lib/spreads/db';
import { Deck } from 'lib/spreads/types';
import { ErrorMap, errorToErrorMap } from 'lib/types';
import { userFromServerContext } from 'lib/users';

interface PageDeckEdit {
	deck: Deck;
}

export default function PageDeckNew({ deck }: PageDeckEdit) {
	const [name, setName] = useState(deck.name);
	const [notes, setNotes] = useState(deck.notes ?? '');
	const [errMesssages, setErrMessages] = useState<ErrorMap<Deck>>({});
	const router = useRouter();
	const { mutate } = useMutation({
		mutationFn: () => mutateUpdateDeck(deck.id, name, notes),
		onSuccess(res) {
			router.push(`/decks/${res.id}`);
		},
		onError(err) {
			setErrMessages(errorToErrorMap(err));
		},
	});
	return (
		<Page
			title="New Deck"
			breadcrumbs={[
				{ label: 'Decks', href: '/decks' },
				{ label: name, href: `/decks/${deck.id}` },
				{ label: 'Edit', href: '/decks/${deck.id}/edit' },
			]}
		>
			<h1 className="text-xl">Editing {deck.name}</h1>
			<Input
				label="Deck name"
				value={name}
				onValueChange={setName}
				name="name"
				isInvalid={!!errMesssages.name}
				errorMessage={errMesssages.name?.join(',')}
			/>
			<Textarea
				label="Notes"
				value={notes}
				onValueChange={setNotes}
				isInvalid={!!errMesssages.notes}
				errorMessage={errMesssages.notes?.join(',')}
			/>
			<ButtonLink color="danger" href={`/decks/${deck.id}`}>
				Cancel
			</ButtonLink>
			<Button
				color="success"
				onClick={() => mutate()}
				className="text-lg font-bold text-white"
			>
				Save
			</Button>
		</Page>
	);
}

export async function getServerSideProps(
	context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<PageDeckEdit>> {
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
		},
	};
}
