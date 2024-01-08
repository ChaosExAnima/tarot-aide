import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import OracleCard from 'components/cards';
import ConfirmationModal from 'components/confirmation-modal';
import DatePicker from 'components/date-picker';
import CardsIcon from 'components/icons/cards';
import Page from 'components/page';
import Photo from 'components/photo';
import { mutateDeleteSpread } from 'lib/spreads/api';
import { getSpreadById } from 'lib/spreads/db';
import { displayRelativeDate } from 'lib/text';
import { getCurrentUserId } from 'lib/users';

import type { ExistingSpread } from 'lib/spreads/types';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

interface SpreadPageProps {
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
			<header className="flex flex-nowrap">
				<h1 className="font-bold text-2xl grow">
					{spread.name ??
						`Spread ${displayRelativeDate(spread.date)}`}
				</h1>
				<ButtonGroup>
					<DatePicker onPick={console.log} value={spread.date} />
					<Button isIconOnly>
						<CardsIcon />
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
