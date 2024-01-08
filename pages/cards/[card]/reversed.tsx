import { GetStaticPropsContext, GetStaticPropsResult } from 'next';

import { getCardReferences } from 'lib/cards/db';
import { getCardFromName } from 'lib/cards/utils';

import CardPage, { CardPageContext, CardPageProps } from './index';

export default CardPage;

export { getStaticPaths } from './index';

export async function getStaticProps(
	context: GetStaticPropsContext<CardPageContext>,
): Promise<GetStaticPropsResult<CardPageProps>> {
	const cardName = context.params?.card?.replaceAll('-', ' ') ?? '';
	const card = getCardFromName(cardName);
	if (!card) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			card: {
				...card,
				references: await getCardReferences(card, true),
			},
			reversed: true,
		},
	};
}
