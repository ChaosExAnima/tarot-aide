import { Button, Input } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ZodIssue } from 'zod';

import ButtonLink from 'components/button-link';
import Page from 'components/page';
import { ApiError } from 'lib/api';
import { mutateCreateDeck } from 'lib/spreads/api';

export default function PageDeckNew() {
	const [name, setName] = useState('');
	const [errMesssages, setErrMessages] = useState<string[]>([]);
	const router = useRouter();
	const { mutate } = useMutation({
		mutationFn: () => mutateCreateDeck(name),
		onSuccess(res) {
			router.push(`/decks/${res.id}`);
		},
		onError(err) {
			if (
				err instanceof ApiError &&
				Array.isArray(err.response?.details)
			) {
				const issues: ZodIssue[] = err.response.details;
				setErrMessages(issues.map(({ message }) => message));
			}
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
				isInvalid={errMesssages.length > 0}
				errorMessage={errMesssages.join(',')}
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
