export type Nullable<T> = T | null;

export function includes<T>(array: readonly T[], item: unknown): item is T {
	return array.includes(item as T);
}

export function single<T>(input: T | T[]): T {
	if (Array.isArray(input)) {
		if (input.length > 1) {
			throw new Error('Expected only one item');
		}
		return input[0];
	}
	return input;
}

export interface ClassNameProps {
	className?: string;
}

export interface Entity {
	id?: number;
}

export type LoadedEntity<T> = T & { id: number };

export type LoadedRecursively<T> = T extends Entity
	? LoadedEntity<T>
	: T extends Entity
		? { [K in keyof T]: LoadedRecursively<T[K]> }
		: T;
