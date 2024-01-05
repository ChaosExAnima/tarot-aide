export type Nullable<T> = T | null;

export type SerializedDates<Obj extends object> = {
	[Key in keyof Obj]: Obj[Key] extends Date
		? number
		: Obj[Key] extends object
			? SerializedDates<Obj[Key]>
			: Obj[Key];
};
