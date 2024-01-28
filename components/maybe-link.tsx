import { Link, LinkProps } from '@nextui-org/react';

import { isUrl } from 'lib/text';

import type { ReactNode } from 'react';

export default function MaybeLink({
	children,
	...props
}: { children: ReactNode } & LinkProps) {
	const href = props.href ?? children;
	if (!href || typeof href !== 'string' || !isUrl(href)) {
		return children;
	}
	return (
		<Link href={href} isExternal={!href.startsWith('/')} {...props}>
			{children}
		</Link>
	);
}
