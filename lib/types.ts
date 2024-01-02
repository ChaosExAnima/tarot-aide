export type Nullable<T> = T | null;

export interface Media {
	id: string;
	url: string;
	mimeType: string;
}

export interface Photo extends Media {
	width: number;
	height: number;
}

export interface Audio extends Media {
	duration: number;
}
