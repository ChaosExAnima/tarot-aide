import { Accordion, AccordionItem } from '@nextui-org/react';

import MaybeLink from 'components/maybe-link';
import { displayDomain } from 'lib/text';

import type { GenericCard } from 'lib/cards/types';
import type { LoadedRecursively } from 'lib/types';

interface CardReferenceProps {
	card: LoadedRecursively<GenericCard>;
}

export function CardReferences({ card: { references } }: CardReferenceProps) {
	if (!references || !references.length) {
		return null;
	}
	return (
		<Accordion as="section" defaultExpandedKeys={['0']} variant="splitted">
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
					</AccordionItem>
				);
			})}
		</Accordion>
	);
}
