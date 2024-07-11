import { useState } from 'react';

import { ApiError } from 'lib/api';

import type { AnyObject } from 'lib/types';
import type { ZodIssue } from 'zod';

type ErrorMap<Fields extends AnyObject> = {
	[k in keyof Fields]?: string[];
};

type ErrorMapSet<Fields extends AnyObject> = (map: ErrorMap<Fields>) => void;

export default function useFieldErrors<Fields extends AnyObject>() {
	const [errorMap, setErrorMap] = useState<ErrorMap<Fields>>({});

	return {
		errors: errorMap,
		clearErrors: () => setErrorMap({}),
		handleError(err: unknown) {
			errorToMap(err, setErrorMap);
		},
		addError(key: keyof Fields, value: string) {
			setErrorMap((map) => ({
				...map,
				[key]: (map[key] ?? []).concat([value]),
			}));
		},
		hasError(key: keyof Fields) {
			return errorMap[key] && errorMap[key].length > 0;
		},
		showError(key: keyof Fields) {
			return errorMap[key] ? errorMap[key].join(',') : null;
		},
		fieldError(key: keyof Fields, withChange = true) {
			return {
				isInvalid: errorMap[key] && errorMap[key].length > 0,
				errorMessage: errorMap[key] ? errorMap[key].join(',') : null,
				...(withChange && {
					onChange: () => setErrorMap({ ...errorMap, [key]: [] }),
				}),
			};
		},
	};
}

function errorToMap<Fields extends AnyObject>(
	error: unknown,
	set: ErrorMapSet<Fields>,
) {
	if (error instanceof ApiError && Array.isArray(error.response?.details)) {
		const issues: ZodIssue[] = error.response.details;
		const newErrors: ErrorMap<Fields> = {};
		for (const issue of issues) {
			for (const path of issue.path) {
				(newErrors[path as keyof Fields] ??= []).push(issue.message);
			}
		}
		set(newErrors);
	}
}
