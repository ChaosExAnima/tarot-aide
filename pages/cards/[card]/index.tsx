import { Link } from '@nextui-org/react';

import CardReferenceDisplay from 'components/cards/reference';
import Page from 'components/page';
import { AllCards } from 'lib/cards/constants';
import { getCardReferences } from 'lib/cards/db';
import { CardWithRefs } from 'lib/cards/types';
import { displayCardFullName, getCardFromName } from 'lib/cards/utils';
import { slugify } from 'lib/text';

import type {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

export type CardPageContext = {
	card: string;
};

export interface CardPageProps {
	card: CardWithRefs;
	reversed: boolean;
}

export default function CardPage({ card, reversed }: CardPageProps) {
	const name = displayCardFullName(card);
	const refs = card.references;
	return (
		<Page title={name}>
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
			<section className="flex flex-col gap-4">
				{refs.map((cardRef) => (
					<CardReferenceDisplay
						key={cardRef.text}
						cardRef={cardRef}
					/>
				))}
			</section>
		</Page>
	);
}

export async function getStaticProps(
	context: GetStaticPropsContext<CardPageContext>,
): Promise<GetStaticPropsResult<CardPageProps>> {
	const cardName = context.params?.card?.replaceAll('-', ' ') ?? '';
	const card = getCardFromName(cardName);
	if (!card) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			card: {
				...card,
				references: await getCardReferences(card),
			},
			reversed: false,
		},
	};
}

export async function getStaticPaths(): Promise<
	GetStaticPathsResult<CardPageContext>
> {
	return {
		paths: AllCards.map((card) => ({
			params: { card: card.replaceAll(' ', '-') },
		})),
		fallback: true,
	};
}
