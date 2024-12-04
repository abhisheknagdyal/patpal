import { logout, validate } from '@/redux/reducers/auth/loginReducer';
import { destroySession, getSession } from './session';

import { accessTokenKey, tokenType, requestMethod } from '../constants';
import { User } from '@/utils/types.ts';
import { ROUTES } from '@/constants/routes.ts';

export const workflowStarted = (dispatch: any) => {
	dispatch(logout());
	destroySession();
};

export const validateSession = async (dispatch: any) => {
	const session = await getSession();
	if (!session) {
		await dispatch(logout());
	} else {
		await dispatch(validate(session.user));
	}
};

export const getAuthToken = () => {
	let token;
	try {
		const credentials = getSession();
		if (credentials?.accessType === tokenType) {
			token = `${requestMethod} ${credentials?.[accessTokenKey]}`;
		}
	} catch {
		token = '';
	}
	return token;
};

export const getHomeRoute = (user: User) => {
	if (user.isAdmin) return ROUTES.ADMIN;
	if (user.isPersonnelBoarder) return ROUTES.PERSONNEL_BOARDER;
	if (user.isPersonnelGroomer) return ROUTES.PERSONNEL_GROOMER;
	if (user.isPersonnelTransporter) return ROUTES.PERSONNEL_TRANSPORTER;
	return ROUTES.HOME;
};
