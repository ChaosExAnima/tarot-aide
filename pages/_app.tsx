import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/router';

import type { AppProps } from 'next/app';

import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (
		<NextUIProvider navigate={router.push}>
			<Component {...pageProps} />
		</NextUIProvider>
	);
}
