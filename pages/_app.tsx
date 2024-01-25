import { config } from '@fortawesome/fontawesome-svg-core';
import { NextUIProvider } from '@nextui-org/react';
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ErrorBoundary from 'components/error';

import type { AppProps } from 'next/app';

config.autoAddCss = false;

import 'styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (
		<ErrorBoundary>
			<NextUIProvider navigate={router.push}>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
					/>
					<link rel="icon" href="/favicon.ico" sizes="48x48" />
					<link
						rel="icon"
						type="image/svg+xml"
						href="/favicon.svg"
						sizes="any"
					/>
					<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
					<link rel="manifest" href="/site.webmanifest" />
				</Head>
				<QueryClientProvider client={queryClient}>
					<HydrationBoundary state={pageProps.dehydratedState}>
						<AnimatePresence mode="wait" initial={false}>
							<Component {...pageProps} />
						</AnimatePresence>
					</HydrationBoundary>
					<ReactQueryDevtools />
				</QueryClientProvider>
			</NextUIProvider>
		</ErrorBoundary>
	);
}
