import { createHash } from 'crypto';

import { ResponseBody, handlerWithError } from 'lib/api';
import { userFromApiRequest } from 'lib/users';

export interface AvatarResponse extends ResponseBody {
	url: string;
}

const handler = handlerWithError<AvatarResponse>(['GET'], async (req) => {
	const user = await userFromApiRequest(req);
	const hash = createHash('sha256')
		.update(user.email.trim().toLowerCase())
		.digest('hex');

	return {
		success: true,
		url: `https://www.gravatar.com/avatar/${hash}?s=256&d=retro`,
	};
});
export default handler;
