import { useRouter } from 'next/router';
import { DependencyList, useEffect, useState } from 'react';

export default function useRefresh(deps: DependencyList) {
	const router = useRouter();
	const [isRefreshing, setIsRefreshing] = useState(false);

	const refresh = () => {
		router.replace(router.asPath);
		setIsRefreshing(true);
	};

	useEffect(() => {
		setIsRefreshing(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	return { isRefreshing, refresh };
}
