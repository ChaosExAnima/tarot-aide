import Page from 'components/page';
import { AllCards } from 'lib/cards/constants';
import { GenericCard } from 'lib/cards/types';
import { displayCardFullName, getCardFromName, isCard } from 'lib/cards/utils';

import type {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

type CardPageContext = {
	card: string;
};

interface CardPageProps {
	card: GenericCard;
}

export default function CardPage({ card }: CardPageProps) {
	const name = displayCardFullName(card);
	return (
		<Page title={name}>
			<h1 className="text-6xl font-bold text-center mb-4">{name}</h1>
			<p>Description goes here. Lorem ipsum and that jazz.</p>
		</Page>
	);
}

export async function getStaticProps(
	context: GetStaticPropsContext<CardPageContext>,
): Promise<GetStaticPropsResult<CardPageProps>> {
	const { card: cardName } = context.params ?? {};
	const card = cardName?.replaceAll('-', ' ');
	if (!card || !isCard(card)) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			card: getCardFromName(card),
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
