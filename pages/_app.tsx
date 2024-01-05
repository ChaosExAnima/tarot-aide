import { config } from '@fortawesome/fontawesome-svg-core';
import { NextUIProvider } from '@nextui-org/react';
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import { useRouter } from 'next/router';

import type { AppProps } from 'next/app';

config.autoAddCss = false;

import 'styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

export const queryClient = new QueryClient();

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
			<QueryClientProvider client={queryClient}>
				<HydrationBoundary state={pageProps.dehydratedState}>
					<Component {...pageProps} />
				</HydrationBoundary>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</NextUIProvider>
	);
}
