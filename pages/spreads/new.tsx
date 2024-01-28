import { faCalendar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import DatePicker from 'components/date-picker';
import Page from 'components/page';
import EditSpreadList from 'components/spread/edit-list';
import UploadControls from 'components/upload';
import { mutateCreateSpread } from 'lib/spreads/api';

import type { FilledSpreadPosition } from 'lib/spreads/types';

export default function NewSpreadPage() {
	const [name, setName] = useState('');
	const [positions, setPositions] = useState<FilledSpreadPosition[]>([]);
	const [photo, setPhoto] = useState<Blob | null>(null);
	const [date, setDate] = useState<Date>(new Date());
	const router = useRouter();
	const saveSpread = useMutation({
		mutationFn: () =>
			mutateCreateSpread(
				{
					name,
					positions: positions.map(({ card, ...rest }) => ({
						...rest,
						card: card?.name,
					})),
					date,
				},
				photo,
			),
		onSuccess: ({ spreadId }) => {
			router.push(`/spreads/${spreadId}`);
		},
	});
	const disable = saveSpread.isPending || saveSpread.isSuccess;

	return (
		<Page>
			{saveSpread.isError && (
				<p className="text-red-500">
					Error: {saveSpread.error.message}
				</p>
			)}
			<section className="flex gap-4 items-center">
				<Input
					placeholder="Spread Name"
					disabled={disable}
					value={name}
					onValueChange={setName}
					classNames={{
						inputWrapper: 'h-8',
					}}
				/>

				<DatePicker onPick={setDate} isIconOnly>
					<FontAwesomeIcon icon={faCalendar} />
				</DatePicker>
				<Button
					isIconOnly
					color="danger"
					aria-label="Cancel new spread"
				>
					<FontAwesomeIcon icon={faXmark} />
				</Button>
			</section>
			<UploadControls onSelect={setPhoto} isDisabled={disable} />

			<section className="flex flex-col gap-4">
				<EditSpreadList
					positions={positions}
					onUpdate={(spread) => setPositions(spread)}
				/>
			</section>

			{positions.length > 0 && (
				<Button
					color="success"
					onPress={() => saveSpread.mutate()}
					isDisabled={disable}
				>
					Save and Continue
				</Button>
			)}
		</Page>
	);
}
