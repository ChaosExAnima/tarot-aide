import { createHash } from 'crypto';

import { ErrorResponseBody, ResponseBody, handlerWithError } from 'lib/api';
import { userFromApiRequest } from 'lib/users';

export interface AvatarResponse extends ResponseBody {
	url: string;
}

const handler = handlerWithError<AvatarResponse>(['GET'], async (req, res) => {
	const user = await userFromApiRequest(req, res, false);
	if (!user) {
		return {
			success: false,
			message: 'Not logged in',
		} satisfies ErrorResponseBody;
	}
	const hash = createHash('sha256')
		.update(user.email.trim().toLowerCase())
		.digest('hex');

	return {
		success: true,
		url: `https://www.gravatar.com/avatar/${hash}?s=256&d=retro`,
	};
});
export default handler;
