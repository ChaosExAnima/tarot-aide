import { Card, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/router';

import Page from 'components/page';
import { AllSuitsWithMajor } from 'lib/cards/constants';
import { displayCase } from 'lib/text';

export default function Home() {
	const router = useRouter();
	return (
		<Page>
			<section className="container grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
				{AllSuitsWithMajor.map((suit) => (
					<Card
						key={suit}
						className="grow"
						isPressable
						shadow="sm"
						onPress={() => router.push(`/suits/${suit}`)}
					>
						<CardBody>
							<h2>{displayCase(suit)}</h2>
						</CardBody>
					</Card>
				))}
			</section>
		</Page>
	);
}
