import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import OracleCard from 'components/cards';
import ConfirmationModal from 'components/confirmation-modal';
import DatePicker from 'components/date-picker';
import EditableHeader from 'components/editable-header';
import Page from 'components/page';
import Photo from 'components/photo';
import { mutateDeleteSpread, mutateUpdateSpread } from 'lib/spreads/api';
import { getSpreadById } from 'lib/spreads/db';
import { displayRelativeDate } from 'lib/text';
import { getCurrentUserId } from 'lib/users';

import type { ExistingSpread } from 'lib/spreads/types';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import type { SpreadUpdateRequestBody } from 'pages/api/spread/[id]';

interface SpreadPageProps {
	spread: ExistingSpread;
}

export default function SpreadPage({ spread }: SpreadPageProps) {
	const router = useRouter();
	const updateSpread = useMutation({
		mutationFn: (body: SpreadUpdateRequestBody) =>
			mutateUpdateSpread(spread.id, body),
	});
	const deleteSpread = useMutation({
		mutationFn: () => mutateDeleteSpread(spread.id),
		onSuccess: () => router.push('/spreads'),
	});
	return (
		<Page>
			<header className="flex flex-nowrap gap-4 items-center">
				<EditableHeader
					initial={
						spread.name ??
						`Spread ${displayRelativeDate(spread.date)}`
					}
					onSave={(title) => updateSpread.mutate({ name: title })}
					classNames={{
						header: 'font-bold text-2xl',
						inputWrapper: 'grow h-10',
					}}
				>
					<ButtonGroup>
						<DatePicker onPick={console.log} value={spread.date} />
						<ConfirmationModal
							isIconOnly
							onConfirm={deleteSpread.mutate}
							header="Delete this spread?"
							body="This is permanent!"
						>
							<FontAwesomeIcon icon={faTrash} />
						</ConfirmationModal>
					</ButtonGroup>
				</EditableHeader>
			</header>
			<Photo photo={spread.photo} />
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
	const currentUserId = getCurrentUserId();
	const id = Number(context.params?.id);
	if (!id || isNaN(id)) {
		return { notFound: true };
	}
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
