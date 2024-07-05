import { Divider } from '@nextui-org/react';

import ButtonLink from 'components/button-link';
import NewSpreadButton from 'components/buttons/new-spread';
import SuitIcon from 'components/icons/suit';
import Page from 'components/page';
import { AllSuitsWithMajor } from 'lib/cards/constants';
import { displaySuitName } from 'lib/cards/utils';
import { userFromServerContext } from 'lib/users';

import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

interface HomeProps {
	loggedIn: boolean;
}

export default function Home({ loggedIn }: HomeProps) {
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
			{loggedIn && <NewSpreadButton className="grow text-lg" />}
			{!loggedIn && (
				<ButtonLink className="grow text-lg" href="/login">
					Log in to save spreads
				</ButtonLink>
			)}
		</Page>
	);
}

export async function getServerSideProps(
	context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<HomeProps>> {
	const user = await userFromServerContext(context);
	return {
		props: {
			loggedIn: !!user,
		},
	};
}
