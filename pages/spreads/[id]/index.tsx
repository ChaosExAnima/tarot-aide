import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, Button } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';

import OracleCard from 'components/cards';
import ConfirmationModal from 'components/confirmation-modal';
import Page from 'components/page';
import Photo from 'components/photo';
import { mutateDeleteSpread } from 'lib/spreads/api';
import { getSpreadById } from 'lib/spreads/db';
import { displaySpreadName } from 'lib/spreads/utils';
import { getCurrentUserId } from 'lib/users';

import type { ExistingSpread } from 'lib/spreads/types';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export interface SpreadPageProps {
	spread: ExistingSpread;
}

export default function SpreadPage({ spread }: SpreadPageProps) {
	const router = useRouter();
	const deleteSpread = useMutation({
		mutationFn: () => mutateDeleteSpread(spread.id),
		onSuccess: () => router.push('/spreads'),
	});
	return (
		<Page>
			<header className="flex flex-col">
				<div className="flex flex-nowrap gap-4 items-center mb-4">
					<h1 className="grow font-bold text-2xl">
						{displaySpreadName(spread)}
					</h1>
					<ButtonGroup isDisabled={deleteSpread.isPending}>
						<Button
							as={Link}
							href={`/spreads/${spread.id}/edit`}
							color="primary"
							isIconOnly
						>
							<FontAwesomeIcon icon={faEdit} />
						</Button>
						<ConfirmationModal
							isIconOnly
							onConfirm={deleteSpread.mutate}
							header="Delete this spread?"
							body="This is permanent!"
						>
							<FontAwesomeIcon icon={faTrash} />
						</ConfirmationModal>
					</ButtonGroup>
				</div>
				{spread.notes
					?.split('\n')
					.filter(Boolean)
					.map((line) => (
						<p key={line} className="text-content4 text-sm">
							{line.trim()}
						</p>
					))}
			</header>
			{spread.photo && <Photo photo={spread.photo} />}
			{spread.positions.map((spread) => (
				<OracleCard key={spread.id} spread={spread} />
			))}
		</Page>
	);
}

type SpreadPageContext = {
	id: string;
};

export async function getServerSideProps(
	context: GetServerSidePropsContext<SpreadPageContext>,
): Promise<GetServerSidePropsResult<SpreadPageProps>> {
	const id = Number(context.params?.id);
	if (!id || isNaN(id)) {
		return { notFound: true };
	}
	const currentUserId = getCurrentUserId();
	const spread = await getSpreadById(id, currentUserId);
	if (!spread) {
		return { notFound: true };
	}
	return {
		props: {
			spread,
		},
	};
}
