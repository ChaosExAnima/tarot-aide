import {
	faCalendar,
	faSave,
	faCancel,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Textarea, ButtonGroup, Button } from '@nextui-org/react';
import Link from 'next/link';

import OracleCard from 'components/cards';
import ConfirmationModal from 'components/confirmation-modal';
import DatePicker from 'components/date-picker';
import Page from 'components/page';
import Photo from 'components/photo';
import { useEditSpread } from 'components/spread/hooks';
import UploadControls from 'components/upload';
import { displayDate } from 'lib/text';

import type { SpreadPageProps } from './index';

export default function SpreadEditPage({ spread: initial }: SpreadPageProps) {
	const { spread, set, issues, dirty, disable, save } =
		useEditSpread(initial);
	return (
		<Page
			breadcrumbs={[
				{ label: 'Spreads', href: '/spreads' },
				{ label: initial.name, href: `/spreads/${initial.id}` },
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
						<Button
							onPress={save}
							isLoading={disable}
							color="success"
							isDisabled={!dirty}
							isIconOnly
						>
							<FontAwesomeIcon icon={faSave} />
						</Button>
						<Button
							as={Link}
							href={`/spreads/${spread.id}`}
							color="danger"
							isIconOnly
						>
							<FontAwesomeIcon icon={faCancel} />
						</Button>
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
						onConfirm={console.log}
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
			{!spread.photo && <UploadControls onSelect={console.log} />}
			{spread.positions.map((spread) => (
				<OracleCard key={spread.id} spread={spread} />
			))}
		</Page>
	);
}

export { getServerSideProps } from './index';
