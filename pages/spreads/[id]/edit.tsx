import {
	faCalendar,
	faSave,
	faCancel,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Textarea, ButtonGroup } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';

import { CollapsibleButton } from 'components/buttons/collapsible';
import ConfirmationModal from 'components/confirmation-modal';
import DatePicker from 'components/date-picker';
import Page from 'components/page';
import Photo from 'components/photo';
import EditSpreadList from 'components/spread/edit-list';
import { useEditSpread } from 'components/spread/hooks';
import UploadControls from 'components/upload';
import {
	mutateDeleteSpreadMedia,
	mutateUploadSpreadMedia,
} from 'lib/spreads/api';
import { displaySpreadName } from 'lib/spreads/utils';
import { displayDate } from 'lib/text';

import type { SpreadPageProps } from './index';
import type { MediaType } from 'lib/media';

export default function SpreadEditPage({ spread: initial }: SpreadPageProps) {
	const { spread, set, issues, newIssue, dirty, disable, save } =
		useEditSpread(initial);
	const deleteMedia = useMutation({
		mutationFn: (type: MediaType) =>
			mutateDeleteSpreadMedia(spread.id, type),
		onSuccess: () => set('photo')(null),
	});
	const uploadMedia = useMutation({
		mutationFn: ({ type, media }: { type: MediaType; media: Blob }) =>
			mutateUploadSpreadMedia(spread.id, type, media),
		onSuccess: ({ media }) => set(media.type)(media),
		onError: (_error, { type }) =>
			newIssue(type, 'There was an error uploading your photo.', true),
	});
	return (
		<Page
			breadcrumbs={[
				{ label: 'Spreads', href: '/spreads' },
				{
					label: displaySpreadName(spread),
					href: `/spreads/${initial.id}`,
					disabled: !spread.name,
				},
				{ label: 'Edit', href: `/spreads/${initial.id}/edit` },
			]}
		>
			<header>
				<Input
					value={spread.name}
					onValueChange={set('name')}
					placeholder="Spread name"
					isRequired
					classNames={{
						inputWrapper: 'h-8',
					}}
					isInvalid={!!issues('name')}
					errorMessage={issues('name')}
				/>
				<Textarea
					value={spread.notes ?? ''}
					onValueChange={set('notes')}
					placeholder="Notes"
					fullWidth
					className="my-4"
					isInvalid={!!issues('notes')}
					errorMessage={issues('notes')}
				/>
				<div className="flex flex-nowrap gap-4 items-center">
					<DatePicker
						onPick={set('date')}
						isIconOnly={false}
						isDisabled={disable}
						color={!!issues('date') ? 'danger' : 'default'}
					>
						<FontAwesomeIcon icon={faCalendar} />
						{displayDate(spread.date)}
					</DatePicker>
					<ButtonGroup
						isDisabled={disable}
						className="grow justify-end"
					>
						<CollapsibleButton
							onPress={save}
							color="success"
							isDisabled={!dirty || disable}
							startContent={<FontAwesomeIcon icon={faSave} />}
						>
							Save
						</CollapsibleButton>
						<CollapsibleButton
							as={Link}
							href={`/spreads/${spread.id}`}
							color="danger"
							startContent={<FontAwesomeIcon icon={faCancel} />}
						>
							Cancel
						</CollapsibleButton>
					</ButtonGroup>
				</div>
				{issues('date') && (
					<p className="text-red-500">{issues('date')}</p>
				)}
			</header>
			{spread.photo && (
				<figure className="relative">
					<Photo photo={spread.photo} />
					<ConfirmationModal
						onConfirm={() => deleteMedia.mutate('photo')}
						isLoading={deleteMedia.isPending}
						isDisabled={deleteMedia.isPending}
						className="absolute top-2 right-2 z-20 rounded-full"
						isIconOnly
						color="danger"
						aria-label="Delete this image"
						header="Delete this image?"
					>
						<FontAwesomeIcon icon={faXmark} />
					</ConfirmationModal>
				</figure>
			)}
			{!spread.photo && (
				<UploadControls
					onSelect={(media) =>
						media && uploadMedia.mutate({ media, type: 'photo' })
					}
					isDisabled={uploadMedia.isPending}
					errorMessage={issues('photo')}
				/>
			)}

			<EditSpreadList spread={spread} onUpdate={set('positions')} />
		</Page>
	);
}

export { getServerSideProps } from './index';
