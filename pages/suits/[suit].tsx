import { Card, CardBody } from '@nextui-org/react';
import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';

import Page from 'components/page';
import {
	AllInSuit,
	AllMajorArcana,
	AllSuitsWithMajor,
	SuitWithMajor,
} from 'lib/cards/constants';
import { isSuit } from 'lib/cards/utils';
import { displayCase } from 'lib/text';

type SuitPageContext = {
	suit: string;
};

interface SuitPageProps {
	suit: SuitWithMajor;
}

export default function SuitPage({ suit }: SuitPageProps) {
	const isMajor = suit === 'major';
	const cards = isMajor ? AllMajorArcana : AllInSuit;
	const router = useRouter();
	return (
		<Page title={displayCase(suit)}>
			<section className="container grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
				{cards.map((card) => (
					<Card
						key={card}
						className="grow"
						isPressable
						shadow="sm"
						onPress={() =>
							router.push(
								`/cards/${
									isMajor ? card : `${card}-of-${suit}`
								}`,
							)
						}
					>
						<CardBody>
							<h2>{displayCase(card)}</h2>
						</CardBody>
					</Card>
				))}
			</section>
		</Page>
	);
}

export async function getStaticProps(
	context: GetStaticPropsContext<SuitPageContext>,
): Promise<GetStaticPropsResult<SuitPageProps>> {
	const { suit } = context.params ?? {};
	if (!suit || !isSuit(suit)) {
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
			params: { suit: suit.replaceAll(' ', '-') },
		})),
		fallback: true,
	};
}
