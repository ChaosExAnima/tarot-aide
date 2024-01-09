import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { createContext, useContext, useState } from 'react';
import { ZodIssue } from 'zod';

import { ApiError } from 'lib/api';
import { mutateUpdateSpread } from 'lib/spreads/api';
import { ExistingSpread } from 'lib/spreads/types';

export interface SpreadContextType {
	spread: ExistingSpread;
	editing: boolean;
	toggleEditing: () => void;
	dirty: boolean;
	set: SpreadSetter;
	issues: (key: keyof ExistingSpread) => string | null;
	disable: boolean;
	save: () => void;
}

export const SpreadContext = createContext<SpreadContextType | null>(null);

type ErrorMap = Partial<Record<keyof ExistingSpread, string[]>>;
type SpreadSetter = <Key extends keyof ExistingSpread>(
	key: Key,
) => (value: ExistingSpread[Key]) => void;

export function useEditSpreadContext(
	initial: ExistingSpread,
): SpreadContextType {
	const [spread, setSpread] = useState(initial);
	const [editing, setEditing] = useState(false);
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
					notes: pos.notes ?? null,
				})),
			}),
		onSuccess: ({ spread }) => {
			router.replace(router.asPath);
			setSpread(spread);
			setDirty(false);
			setEditing(false);
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
		editing,
		toggleEditing: () => {
			setSpread(initial);
			setDirty(false);
			return setEditing((editing) => !editing);
		},
		dirty,
		set: changeFactory,
		issues: errorFactory,
		disable: updateSpread.isPending,
		save: updateSpread.mutate,
	};
}

export function useEditSpread() {
	return useContext(SpreadContext)!;
}
