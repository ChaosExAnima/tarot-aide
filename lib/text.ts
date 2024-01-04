export function displayCase(input: string): string {
	return input.replace(/(\w)(\w*)/g, (_, firstChar: string, rest: string) => {
		if (rest.length < 2) {
			return firstChar + rest;
		}
		return firstChar.toUpperCase() + rest;
	});
}
