import { handlerWithError } from 'lib/api';
import { lucia } from 'lib/auth';

const handler = handlerWithError(['GET'], async (req, res) => {
	const sessionId = req.cookies[lucia.sessionCookieName];
	if (sessionId) {
		const { user } = await lucia.validateSession(sessionId);
		if (user) {
			await lucia.invalidateUserSessions(user.id);
		}
	}
	res.redirect('/');
});

export default handler;
