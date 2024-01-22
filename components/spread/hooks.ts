import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ZodIssue } from 'zod';

import { ApiError } from 'lib/api';
import { mutateUpdateSpread } from 'lib/spreads/api';
import { ExistingSpread } from 'lib/spreads/types';

type ErrorMap = Partial<Record<keyof ExistingSpread, string[]>>;
type SpreadSetter = <Key extends keyof ExistingSpread>(
	key: Key,
) => (value: ExistingSpread[Key]) => void;

export function useEditSpread(initial: ExistingSpread) {
	const [spread, setSpread] = useState(initial);
	const [dirty, setDirty] = useState(false);
	const [errors, setErrors] = useState<ErrorMap>({});
	const changeFactory: SpreadSetter = (key) => (value) =>
		setSpread((spread) => {
			setDirty(true);
			setErrors((errors) => ({ ...errors, [key]: [] }));
			return { ...spread, [key]: value };
		});
	const errorFactory = (key: keyof ExistingSpread) =>
		errors[key]?.join(', ') ?? null;

	const router = useRouter();
	const updateSpread = useMutation({
		mutationFn: () =>
			mutateUpdateSpread(initial.id, {
				...spread,
				positions: spread.positions.map((pos) => ({
					...pos,
					card: pos.card?.name,
					reversed: pos.reversed ?? false,
					notes: pos.notes ?? null,
				})),
			}),
		onSuccess: async () => {
			await router.push(`/spreads/${spread.id}`);
			setDirty(false);
		},
		onError: (error) => {
			if (
				error instanceof ApiError &&
				Array.isArray(error.response?.details)
			) {
				const issues: ZodIssue[] = error.response.details;
				const newErrors: ErrorMap = {};
				for (const issue of issues) {
					for (const path of issue.path) {
						(newErrors[path as keyof ExistingSpread] ??= []).push(
							issue.message,
						);
					}
				}
				setErrors(newErrors);
			}
		},
	});

	return {
		spread,
		dirty,
		set: changeFactory,
		issues: errorFactory,
		disable: updateSpread.isPending,
		save: () => updateSpread.mutate(),
	};
}
