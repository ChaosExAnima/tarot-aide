import { Button, Link } from '@nextui-org/react';

import { CardReferences } from 'components/cards/references';
import Page from 'components/page';
import { MajorSuit } from 'lib/cards/constants';
import { getCardReferences } from 'lib/cards/db';
import { CardWithRefs } from 'lib/cards/types';
import {
	cardUrl,
	displayCardFullName,
	displaySuitName,
	getCardFromName,
	isMinorTarotCard,
} from 'lib/cards/utils';
import { LoadedRecursively } from 'lib/types';
import { userFromServerContext } from 'lib/users';

import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export type CardPageContext = {
	card: string;
};

export interface CardPageProps {
	card: LoadedRecursively<CardWithRefs>;
	reversed: boolean;
	defaultReference: number;
}

export default function CardPage({
	card,
	reversed,
	defaultReference,
}: CardPageProps) {
	const name = displayCardFullName(card);
	const suit = isMinorTarotCard(card) ? card.suit : MajorSuit;
	return (
		<Page
			title={name}
			breadcrumbs={[
				{ label: displaySuitName(suit), href: `/suits/${suit}` },
				{ label: name, href: cardUrl(card.name) },
				reversed && {
					label: 'Reversed',
					href: cardUrl(card.name, true),
				},
			]}
		>
			<h1 className="text-6xl font-bold text-center mb-2">{name}</h1>
			<p className="text-2xl text-center">
				<Link href={cardUrl(card.name, !reversed)}>
					{reversed ? 'Reversed' : 'Upright'}
				</Link>
			</p>
			<CardReferences card={card} defaultId={defaultReference} />
			<Button
				as={Link}
				href={cardUrl(card.name, reversed, true)}
				className="mx-2"
			>
				Add a reference
			</Button>
		</Page>
	);
}

export async function getServerSideProps(
	context: GetServerSidePropsContext<CardPageContext>,
): Promise<GetServerSidePropsResult<CardPageProps>> {
	const cardName = context.params?.card?.replaceAll('-', ' ') ?? '';
	const card = getCardFromName(cardName);
	if (!card) {
		return {
			notFound: true,
		};
	}

	const user = await userFromServerContext(context);
	const reversed = context.resolvedUrl.includes('/reversed');
	const references = await getCardReferences(card.name, reversed, user.id);
	const firstStarred = references.find((ref) => ref.starred);
	return {
		props: {
			card: {
				...card,
				references: await getCardReferences(
					card.name,
					reversed,
					user.id,
				),
			},
			defaultReference: firstStarred?.id ?? 0,
			reversed,
		},
	};
}
