import { Card, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/router';

import Page from 'components/page';
import { AllSuitesWithMajor } from 'lib/cards/constants';
import { displayCase } from 'lib/text';

export default function Home() {
	const router = useRouter();
	return (
		<Page>
			<section className="container grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
				{AllSuitesWithMajor.map((suite) => (
					<Card
						key={suite}
						className="grow"
						isPressable
						shadow="sm"
						onPress={() => router.push(`/suites/${suite}`)}
					>
						<CardBody>
							<h2>{displayCase(suite)}</h2>
						</CardBody>
					</Card>
				))}
			</section>
		</Page>
	);
}
