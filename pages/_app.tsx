import { Merienda, Playfair_Display } from '@next/font/google';

import type { AppProps } from 'next/app';

import 'styles/globals.css';

const merienda = Merienda({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'] });

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
