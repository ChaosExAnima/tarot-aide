import { merienda, playfair } from 'lib/fonts';

import type { AppProps } from 'next/app';

import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style jsx global>{`
				:root {
					--font-header: ${merienda.style.fontFamily};
					--font-body: ${playfair.style.fontFamily};
				}
			`}</style>
			<Component {...pageProps} />
		</>
	);
}
