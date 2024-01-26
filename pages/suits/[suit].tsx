import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import ButtonLink from 'components/button-link';
import Page from 'components/page';
import { AllSuitsWithMajor, SuitWithMajor } from 'lib/cards/constants';
import {
	displayCardFullName,
	displaySuitName,
	getCardsFromSuit,
	isSuitWithMajor,
} from 'lib/cards/utils';
import { displayCase } from 'lib/text';

type SuitPageContext = {
	suit: string;
};

interface SuitPageProps {
	suit: SuitWithMajor;
}

export default function SuitPage({ suit }: SuitPageProps) {
	const cards = getCardsFromSuit(suit);
	return (
		<Page
			title={displayCase(suit)}
			breadcrumbs={[
				{ label: displaySuitName(suit), href: `/suits/${suit}` },
			]}
		>
			<section className="flex-grow grid grid-cols-2 gap-4">
				{cards.map((card) => (
					<ButtonLink
						href={`/cards/${card.name.replaceAll(' ', '-')}`}
						className="grow"
						key={card.name}
					>
						{displayCardFullName(card)}
					</ButtonLink>
				))}
			</section>
		</Page>
	);
}

export async function getStaticProps(
	context: GetStaticPropsContext<SuitPageContext>,
): Promise<GetStaticPropsResult<SuitPageProps>> {
	const { suit } = context.params ?? {};
	if (!suit || !isSuitWithMajor(suit)) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			suit,
		},
	};
}

export async function getStaticPaths(): Promise<
	GetStaticPathsResult<SuitPageContext>
> {
	return {
		paths: AllSuitsWithMajor.map((suit) => ({
			params: { suit },
		})),
		fallback: false,
	};
}
