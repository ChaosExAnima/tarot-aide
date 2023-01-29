export function displayCase(input: string): string {
	return input.replace(
		/(\w)(\w*)/g,
		(_, firstChar: string, rest: string) =>
			firstChar.toUpperCase() + rest.toLowerCase()
	);
}
