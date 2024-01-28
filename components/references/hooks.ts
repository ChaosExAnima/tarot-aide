import { useQuery } from '@tanstack/react-query';

import { queryCardReferences } from 'lib/cards/api';

export function useCardReferences(name: string, reversed = false) {
	const key = ['card', name, reversed, 'references'];
	const query = useQuery({
		queryKey: key,
		queryFn: () => queryCardReferences(name, reversed),
		enabled: !!name,
	});
	return { ...query, key };
}
