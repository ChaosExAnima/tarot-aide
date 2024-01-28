import { Button, Link } from '@nextui-org/react';

import { CardReferences } from 'components/cards/references';
import Page from 'components/page';
import { MajorSuit } from 'lib/cards/constants';
import {
	cardUrl,
	displayCardFullName,
	displaySuitName,
	getCardFromName,
	isMinorTarotCard,
} from 'lib/cards/utils';

import type { GenericCard } from 'lib/cards/types';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export type CardPageContext = {
	card: string;
};

export interface CardPageProps {
	card: GenericCard;
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
			<CardReferences card={card} reversed={reversed} />
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
	return {
		props: {
			card,
			reversed: context.resolvedUrl.includes('/reversed'),
		},
	};
}
