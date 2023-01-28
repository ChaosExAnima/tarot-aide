import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './nav.module.css';

interface NavItem {
	label: string;
	path: string;
}

export const NavList: NavItem[] = [
	{ label: 'Home', path: '/' },
	{ label: 'Tasks', path: '/tasks' },
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
function NavItem({ label, path, curPath }: NavItemProps) {
	if (curPath === path) {
		return <li aria-current>{label}</li>;
	}
	return (
		<li>
			<Link href={path}>{label}</Link>
		</li>
	);
}
