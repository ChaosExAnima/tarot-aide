import { Divider } from '@nextui-org/react';

import ButtonLink from 'components/button-link';
import Page from 'components/page';
import { AllSuitsWithMajor } from 'lib/cards/constants';
import { displayCase } from 'lib/text';

export default function Home() {
	return (
		<Page>
			{AllSuitsWithMajor.map((suit) => (
				<ButtonLink
					href={`/suits/${suit}`}
					key={suit}
					className="grow text-slate-900"
					color="secondary"
				>
					{displayCase(suit)}
				</ButtonLink>
			))}
			<Divider />
			<ButtonLink href="/spreads/new" className="grow">
				New Spread
			</ButtonLink>
		</Page>
	);
}
