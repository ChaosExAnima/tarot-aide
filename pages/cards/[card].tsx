import Page from 'components/page';
import { AllCards, CardName } from 'lib/constants';
import { displayCase } from 'lib/text';

import type {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

type CardPageContext = {
	card: CardName;
};

interface CardPageProps {
	card: {
		name: string;
		suit?: 'swords' | 'pentacles' | 'cups' | 'wands';
	};
}

export default function CardPage({ card }: CardPageProps) {
	return (
		<Page title={displayCase(card?.name)}>
			{displayCase(card?.name) ?? 'Loading...'}
		</Page>
	);
}

export async function getStaticProps(
	context: GetStaticPropsContext<CardPageContext>
): Promise<GetStaticPropsResult<CardPageProps>> {
	const { card } = context.params ?? {};
	if (!card) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			card: {
				name: card,
			},
		},
	};
}

export async function getStaticPaths(): Promise<
	GetStaticPathsResult<CardPageContext>
> {
	return {
		paths: AllCards.map((card) => ({ params: { card } })),
		fallback: true,
	};
}
