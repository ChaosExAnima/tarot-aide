import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Avatar,
	Input,
	Link,
	Navbar,
	NavbarContent,
	NavbarItem,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { fetchFromApi } from 'lib/api';

import type { AvatarResponse } from 'pages/api/avatar';

interface NavItem {
	label: string;
	path: string;
	otherPaths?: (string | { path: string; exact: boolean })[];
	exact?: boolean;
}

export const NavList: NavItem[] = [
	{
		label: 'Cards',
		path: '/',
		otherPaths: [
			{ path: '/suits', exact: false },
			{ path: '/cards', exact: false },
		],
		exact: true,
	},
	{ label: 'Spreads', path: '/spreads' },
];

export default function Nav() {
	const router = useRouter();
	const { data: avatar } = useQuery({
		queryKey: ['avatar'],
		queryFn: () => fetchFromApi<AvatarResponse>('/avatar'),
		staleTime: Infinity,
	});
	return (
		<Navbar isBordered classNames={{ wrapper: 'px-4' }}>
			<NavbarContent>
				{NavList.map((item) => (
					<NavbarItem
						key={item.path}
						isActive={matchNavItem(router.pathname, item)}
					>
						<Link href={item.path} color="primary">
							{item.label}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			<NavbarContent as="div" justify="end" className="grow">
				<Input
					classNames={{
						base: 'max-w-full sm:max-w-[10rem] h-10',
						mainWrapper: 'h-full',
						input: 'text-small',
						inputWrapper:
							'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
					}}
					placeholder="Search"
					size="sm"
					type="search"
					endContent={<FontAwesomeIcon icon={faSearch} />}
				/>
				<Avatar size="sm" src={avatar?.url} />
			</NavbarContent>
		</Navbar>
	);
}

function matchNavItem(path: string, item: NavItem): boolean {
	const pathsToCheck = [item.path, ...(item.otherPaths ?? [])];
	return pathsToCheck.some((itemPath) => {
		if (typeof itemPath === 'string') {
			return item.exact ? path === itemPath : path.startsWith(itemPath);
		}
		const exact = itemPath.exact ?? item.exact ?? false;
		return exact ? path === itemPath.path : path.startsWith(itemPath.path);
	});
}
