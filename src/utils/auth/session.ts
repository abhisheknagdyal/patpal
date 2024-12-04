import { accessTokenKey, authSessionKey } from '../constants';
import { User } from '@/utils/types.ts';

export type Token = {
	token: string;
	accessType: string;
	user: User;
};

export const createSession = (token: Token) => {
	localStorage.setItem(authSessionKey, JSON.stringify(token));
};

export const getSession = () => {
	let credentials;
	try {
		credentials = JSON.parse(localStorage.getItem(authSessionKey)!);
		if (!Object.keys(credentials).includes(accessTokenKey)) {
			credentials = null;
		}
	} catch {
		credentials = null;
	}
	return credentials;
};

export const updateSession = (key: string, model: string) => {
	const validSession = JSON.parse(localStorage.getItem(authSessionKey)!);
	const newSession = {
		...validSession,
		[accessTokenKey]: key,
		user: {
			...validSession.user,
			subscription_model: model,
		},
	};
	localStorage.setItem(authSessionKey, JSON.stringify(newSession));
};

export const updateUserDetails = (newUser: any, newUrl: string) => {
	const validSession = JSON.parse(localStorage.getItem(authSessionKey)!);
	const newSession = {
		...validSession,
		user: {
			...validSession.user,
			details: {
				...validSession.user.details,
				...newUser,
				...(newUrl ? { photo_url: newUrl } : {}),
			},
		},
	};
	localStorage.setItem(authSessionKey, JSON.stringify(newSession));
};

export const destroySession = () => {
	localStorage.removeItem(authSessionKey);
};
