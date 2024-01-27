import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import Link from 'next/link';

import MaybeLink from 'components/maybe-link';
import { cardUrl } from 'lib/cards/utils';
import { displayDomain } from 'lib/text';

import type { GenericCard } from 'lib/cards/types';
import type { LoadedRecursively } from 'lib/types';

interface CardReferenceProps {
	card: LoadedRecursively<GenericCard>;
}

export function CardReferences({
	card: { name, references },
}: CardReferenceProps) {
	if (!references || !references.length) {
		return null;
	}
	return (
		<Accordion
			as="section"
			defaultExpandedKeys={['0']}
			variant="splitted"
			itemClasses={{
				content: 'flex flex-col gap-2 pb-4',
			}}
		>
			{references.map((ref) => {
				const title = ref.keywords.join(', ');
				const lines = ref.text.trim().split('\n').filter(Boolean);
				return (
					<AccordionItem
						title={title}
						subtitle={
							<MaybeLink href={ref.source}>
								{displayDomain(ref.source ?? '')}
							</MaybeLink>
						}
						aria-label={title}
						key={ref.id}
					>
						<blockquote>
							{lines.map((line) => (
								<p key={line}>{line}</p>
							))}
						</blockquote>
						{ref.id > 0 && (
							<Button
								as={Link}
								href={`${cardUrl(name, false, true)}/${ref.id}`}
								startContent={<FontAwesomeIcon icon={faEdit} />}
								className="ml-auto bg-primary-500"
							>
								Edit
							</Button>
						)}
					</AccordionItem>
				);
			})}
		</Accordion>
	);
}
