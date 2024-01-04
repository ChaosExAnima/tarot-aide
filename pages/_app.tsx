import { config } from '@fortawesome/fontawesome-svg-core';
import { NextUIProvider } from '@nextui-org/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import type { AppProps } from 'next/app';

config.autoAddCss = false;

import 'styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (
		<NextUIProvider navigate={router.push}>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
				/>
			</Head>
			<Component {...pageProps} />
		</NextUIProvider>
	);
}
