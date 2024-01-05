import { SerializedDates } from './types';

export function serializeDates<Obj extends object>(
	obj: Obj,
): SerializedDates<Obj> {
	const objCopy = structuredClone(obj);
	for (const key in objCopy) {
		const value = obj[key];
		if (value instanceof Date) {
			objCopy[key] = value.getTime() as Obj[typeof key];
		} else if (value instanceof Object) {
			objCopy[key] = serializeDates(value) as Obj[typeof key];
		}
	}
	return obj as SerializedDates<Obj>;
}
