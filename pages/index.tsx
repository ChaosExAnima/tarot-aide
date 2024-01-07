import { Divider } from '@nextui-org/react';

import ButtonLink from 'components/button-link';
import { SuitIcon } from 'components/cards/display';
import Page from 'components/page';
import { AllSuitsWithMajor } from 'lib/cards/constants';
import { displaySuitName } from 'lib/cards/utils';

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
					{displaySuitName(suit)}
					<SuitIcon suit={suit} className="h-4" />
				</ButtonLink>
			))}
			<Divider />
			<ButtonLink href="/spreads/new" className="grow">
				New Spread
			</ButtonLink>
		</Page>
	);
}
