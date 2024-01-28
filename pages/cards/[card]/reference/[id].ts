import { cardReference } from 'lib/cards/db';
import { getCardFromName } from 'lib/cards/utils';
import { userFromServerContext } from 'lib/users';

import { CardReferencePageProps, default as EditCardReference } from './index';

import type { CardPageContext } from '../index';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export default EditCardReference;

type CardReferencePageContext = CardPageContext & { id: string };

export async function getServerSideProps(
	context: GetServerSidePropsContext<CardReferencePageContext>,
): Promise<GetServerSidePropsResult<CardReferencePageProps>> {
	const cardName = context.params?.card?.replaceAll('-', ' ') ?? '';
	const card = getCardFromName(cardName);
	const refId = Number.parseInt(context.params?.id ?? '');
	const user = await userFromServerContext(context);
	const reference = await cardReference(refId, user.id);
	if (!card || !reference) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			card,
			reference,
			reversed: reference.reversed,
		},
	};
}
