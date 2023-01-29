import Page from 'components/page';

import type {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

type DeckPageContext = {
	deck: string;
};

interface DeckPageProps {
	deck: string;
}

export default function DeckDetailPage({ deck }: DeckPageProps) {
	return <Page title={`Deck ${deck}`}>Here are the {deck} details:</Page>;
}

export async function getStaticProps(
	context: GetStaticPropsContext<DeckPageContext>
): Promise<GetStaticPropsResult<DeckPageProps>> {
	const { deck } = context.params ?? {};
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

export async function getStaticPaths(): Promise<
	GetStaticPathsResult<DeckPageContext>
> {
	return {
		paths: ['1', '2', '3'].map((deck) => ({ params: { deck } })),
		fallback: true,
	};
}
