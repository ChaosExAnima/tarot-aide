import { Divider, Link } from '@nextui-org/react';

import Page from 'components/page';
import { AllSuitsWithMajor } from 'lib/cards/constants';
import { displayCase } from 'lib/text';

export default function Home() {
	return (
		<Page>
			{AllSuitsWithMajor.map((suit) => (
				<Link
					href={`/suits/${suit}`}
					key={suit}
					className="font-bold text-lg text-slate-900 bg-secondary rounded-lg px-4 grow"
					isBlock
				>
					{displayCase(suit)}
				</Link>
			))}
			<Divider />
			<Link
				href="/spreads/new"
				className="font-bold text-lg text-slate-900 bg-primary rounded-lg px-4 grow"
				isBlock
			>
				New Spread
			</Link>
		</Page>
	);
}
