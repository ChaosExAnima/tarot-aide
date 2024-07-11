import { Button, Input, Textarea } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import ButtonLink from 'components/button-link';
import Page from 'components/page';
import { mutateUpdateDeck } from 'lib/spreads/api';
import { Deck } from 'lib/spreads/types';
import { ErrorMap, errorToErrorMap } from 'lib/types';

export default function PageDeckNew() {
	const [name, setName] = useState('');
	const [notes, setNotes] = useState('');
	const [errMesssages, setErrMessages] = useState<ErrorMap<Deck>>({});
	const router = useRouter();
	const { mutate } = useMutation({
		mutationFn: () => mutateUpdateDeck(null, name, notes),
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
				{ label: 'New Deck', href: '/decks/new' },
			]}
		>
			<h1 className="text-xl">New Deck</h1>
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
			<ButtonLink color="danger" href="/decks">
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
