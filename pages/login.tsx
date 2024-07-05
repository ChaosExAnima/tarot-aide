import { Button } from '@nextui-org/react';
import React from 'react';

import Page from 'components/page';

export default function LoginPage() {
	return (
		<Page title="Log In">
			<p>Log in with:</p>
			<Button
				as="a"
				href="/api/auth/google"
				color="primary"
				className="font-bold text-lg text-center min-h-10"
			>
				Google
			</Button>
		</Page>
	);
}
