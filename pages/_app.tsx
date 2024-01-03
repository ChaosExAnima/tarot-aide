import { NextUIProvider } from '@nextui-org/react';

import type { AppProps } from 'next/app';

import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NextUIProvider>
			<main className="dark text-foreground bg-background">
				<Component {...pageProps} />
			</main>
		</NextUIProvider>
	);
}
