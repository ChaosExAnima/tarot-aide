import {
	Avatar,
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { fetchFromApi } from 'lib/api';

import type { AvatarResponse } from 'pages/api/avatar';

export default function PageAvatar() {
	const router = useRouter();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { data: avatar } = useQuery({
		queryKey: ['avatar'],
		queryFn: () => fetchFromApi<AvatarResponse>('/avatar'),
		staleTime: Infinity,
	});
	const handler = () => {
		if (avatar) {
			onOpen();
		} else {
			router.push('/login');
		}
	};

	return (
		<>
			<Avatar
				size="sm"
				className="cursor-pointer"
				src={avatar?.url}
				onClick={handler}
			/>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
				backdrop="blur"
				classNames={{
					wrapper: 'top-10',
				}}
			>
				<ModalContent>
					<ModalHeader className="p-4">Log out</ModalHeader>
					<ModalBody className="p-4 pt-0">
						<p>Are you sure you want to log out?</p>
						<Button as="a" href="/api/auth/logout" color="danger">
							Log out
						</Button>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
