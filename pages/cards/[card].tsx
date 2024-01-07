import CardReferenceDisplay from 'components/cards/reference';
import Page from 'components/page';
import { AllCards } from 'lib/cards/constants';
import { getCardReferences } from 'lib/cards/db';
import { CardWithRefs } from 'lib/cards/types';
import { displayCardFullName, getCardFromName } from 'lib/cards/utils';

import type {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

type CardPageContext = {
	card: string;
};

interface CardPageProps {
	card: CardWithRefs;
}

export default function CardPage({ card }: CardPageProps) {
	const name = displayCardFullName(card);
	const refs = card.references;
	return (
		<Page title={name}>
			<h1 className="text-6xl font-bold text-center mb-2">{name}</h1>
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
