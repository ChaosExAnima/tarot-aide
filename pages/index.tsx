import { Divider } from '@nextui-org/react';

import ButtonLink from 'components/button-link';
import NewSpreadButton from 'components/buttons/new-spread';
import SuitIcon from 'components/icons/suit';
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
			<NewSpreadButton className="grow text-lg" />
		</Page>
	);
}
