import { Button, Link } from '@nextui-org/react';

import { CardReferences } from 'components/cards/references';
import Page from 'components/page';
import { MajorSuit } from 'lib/cards/constants';
import { getCardReferences } from 'lib/cards/db';
import { CardWithRefs } from 'lib/cards/types';
import {
	displayCardFullName,
	displaySuitName,
	getCardFromName,
	isMinorTarotCard,
} from 'lib/cards/utils';
import { slugify } from 'lib/text';
import { LoadedRecursively } from 'lib/types';
import { userFromServerContext } from 'lib/users';

import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export type CardPageContext = {
	card: string;
};

export interface CardPageProps {
	card: LoadedRecursively<CardWithRefs>;
	reversed: boolean;
}

export default function CardPage({ card, reversed }: CardPageProps) {
	const name = displayCardFullName(card);
	const suit = isMinorTarotCard(card) ? card.suit : MajorSuit;
	return (
		<Page
			title={name}
			breadcrumbs={[
				{ label: displaySuitName(suit), href: `/suits/${suit}` },
				{ label: name, href: `/cards/${slugify(card.name)}` },
				reversed && {
					label: 'Reversed',
					href: `/cards/${slugify(card.name)}/reversed`,
				},
			]}
		>
			<h1 className="text-6xl font-bold text-center mb-2">{name}</h1>
			<p className="text-2xl text-center">
				<Link
					href={`/cards/${slugify(card.name)}${
						!reversed ? '/reversed' : ''
					}`}
				>
					{reversed ? 'Reversed' : 'Upright'}
				</Link>
			</p>
			<CardReferences card={card} />
			<Button
				as={Link}
				href={`/cards/${slugify(card.name)}${
					reversed ? '/reversed' : ''
				}/reference`}
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
			reversed,
		},
	};
}
