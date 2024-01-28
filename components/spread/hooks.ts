import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ZodIssue } from 'zod';

import { ApiError } from 'lib/api';
import { mutateUpdateSpread } from 'lib/spreads/api';

import type { ExistingSpread } from 'lib/spreads/types';
import type { SpreadUpdateRequest } from 'pages/api/spread/[id]';

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
	const { isPending, isSuccess, mutate } = useMutation({
		mutationFn() {
			if (!spread.name) {
				setErrors({ name: ['Please provide a name for your spread.'] });
				throw new Error();
			}
			const updatedSpread: SpreadUpdateRequest = {
				name: spread.name,
				date: spread.date,
				notes: spread.notes,
				positions: spread.positions.map((pos) => ({
					id: pos.id,
					name: pos.name ?? '',
					card: pos.card?.name,
					reversed: pos.reversed,
					notes: pos.notes,
				})),
			};
			return mutateUpdateSpread(initial.id, updatedSpread);
		},
		async onSuccess() {
			router.push(`/spreads/${spread.id}`);
		},
		onError(error) {
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
		disable: isPending || isSuccess,
		save: () => mutate(),
	};
}
