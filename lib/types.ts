export type Nullable<T> = T | null;

export function includes<T>(array: readonly T[], item: unknown): item is T {
	return array.includes(item as T);
}

export interface ClassNameProps {
	className?: string;
}
