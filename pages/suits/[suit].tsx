import { Card, CardBody, Divider } from '@nextui-org/react';
import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';
import { useRouter } from 'next/router';

import Page from 'components/page';
import {
	AllMajorArcana,
	AllNameCards,
	AllNumberCards,
	AllSuitsWithMajor,
	AnyCardWithoutSuit,
	MajorSuit,
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
	const cardMap = (card: AnyCardWithoutSuit) => (
		<SuitCard key={card} card={card} suit={suit} />
	);
	return (
		<Page title={displayCase(suit)}>
			<section className="flex-grow grid grid-cols-2 gap-4">
				{isMajor && AllMajorArcana.map(cardMap)}
				{!isMajor && AllNumberCards.map(cardMap)}
			</section>
			{!isMajor && <Divider />}
			{!isMajor && (
				<section className="flex-grow grid grid-cols-2 gap-4">
					{AllNameCards.map(cardMap)}
				</section>
			)}
		</Page>
	);
}

function SuitCard({
	card,
	suit,
}: {
	card: AnyCardWithoutSuit;
	suit: SuitWithMajor;
}) {
	const router = useRouter();
	const isMajor = suit === MajorSuit;
	return (
		<Card
			className="grow"
			isPressable
			shadow="sm"
			onPress={() =>
				router.push(`/cards/${isMajor ? card : `${card}-of-${suit}`}`)
			}
		>
			<CardBody>
				<h2 className="text-lg text-center font-semibold">
					{displayCase(card)}
				</h2>
			</CardBody>
		</Card>
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
