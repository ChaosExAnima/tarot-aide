import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './nav.module.css';

interface NavItem {
	label: string;
	path: string;
	exact?: boolean;
}

export const NavList: NavItem[] = [
	{ label: 'Home', path: '/', exact: true },
	{ label: 'Tasks', path: '/tasks' },
	{ label: 'Spreads', path: '/spreads' },
	{ label: 'Cards', path: '/cards' },
	{ label: 'Decks', path: '/decks' },
];

export default function Nav() {
	const router = useRouter();
	return (
		<nav className={classes.nav}>
			<ul>
				{NavList.map((item) => (
					<NavItem
						{...item}
						key={item.path}
						curPath={router.pathname}
					/>
				))}
			</ul>
		</nav>
	);
}

type NavItemProps = NavItem & { curPath: string };
function NavItem({ label, path, exact, curPath }: NavItemProps) {
	if ((exact && curPath === path) || (!exact && curPath.startsWith(path))) {
		return <li aria-current>{label}</li>;
	}
	return (
		<li>
			<Link href={path}>{label}</Link>
		</li>
	);
}
