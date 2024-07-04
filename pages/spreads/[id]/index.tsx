import { faEdit, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { CollapsibleButton } from 'components/buttons/collapsible';
import OracleCardStatic from 'components/cards/static';
import ConfirmationModal from 'components/confirmation-modal';
import Page from 'components/page';
import Photo from 'components/photo';
import { mutateDeleteSpread } from 'lib/spreads/api';
import { getSpreadById } from 'lib/spreads/db';
import { displaySpreadName } from 'lib/spreads/utils';
import { userFromServerContext } from 'lib/users';

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
		<Page
			breadcrumbs={[
				{ label: 'Spreads', href: '/spreads' },
				{
					label: displaySpreadName(spread),
					href: `/spreads/${spread.id}`,
				},
			]}
		>
			<header className="flex flex-col">
				<div className="flex flex-nowrap gap-4 items-center mb-4">
					<h1 className="grow font-bold text-2xl">
						{displaySpreadName(spread)}
					</h1>
					<ButtonGroup isDisabled={deleteSpread.isPending}>
						<CollapsibleButton
							as={Link}
							href={`/spreads/${spread.id}/edit`}
							color="primary"
							startContent={<FontAwesomeIcon icon={faEdit} />}
						>
							Edit
						</CollapsibleButton>
						<CollapsibleButton
							as={Link}
							href={`/spreads/${spread.id}/sort`}
							color="primary"
							startContent={<FontAwesomeIcon icon={faSort} />}
						>
							Sort
						</CollapsibleButton>
						<ConfirmationModal
							onConfirm={deleteSpread.mutate}
							header="Delete this spread?"
							body="This is permanent!"
							startContent={<FontAwesomeIcon icon={faTrash} />}
							className="px-0 sm:px-unit-4 min-w-unit-10"
						>
							<span className="hidden sm:block">Delete</span>
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
				<OracleCardStatic key={spread.id} position={spread} />
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
	const user = await userFromServerContext(context);
	const spread = await getSpreadById(id, user.id);
	if (!spread) {
		return { notFound: true };
	}

	return {
		props: {
			spread,
		},
	};
}
