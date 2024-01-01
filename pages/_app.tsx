import useMousePosition from 'components/hooks/use-mouse';
import { merienda, playfair } from 'lib/fonts';

import type { AppProps } from 'next/app';

import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	const mouse = useMousePosition();
	return (
		<>
			<style jsx global>{`
				:root {
					--font-header: ${merienda.style.fontFamily};
					--font-body: ${playfair.style.fontFamily};
					--mouse-x: ${mouse.x ?? 0};
					--mouse-y: ${mouse.y ?? 0};
				}
			`}</style>
			<Component {...pageProps} />
		</>
	);
}
