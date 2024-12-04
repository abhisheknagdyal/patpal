import { createSession } from '@/utils/auth/session';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { POST } from '@/utils/api';
import { NavigateFunction } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { SubscriptionLevel, User } from '@/utils/types.ts';
import { getHomeRoute } from '@/utils/auth/workflow.ts';
import { redirectKey } from '@/utils/constants.ts';

type State = {
	error: string;
	loading: boolean;
	isAuthenticated: boolean;
	user: User;
};

const initialState: State = {
	error: '',
	isAuthenticated: false,
	loading: false,
	user: {
		id: '',
		email: '',
		isAdmin: false,
		isPersonnelBoarder: false,
		isPersonnelGroomer: false,
		subscription_model: 'basic' as SubscriptionLevel,
		isActive: false,
		username: '',
		isPersonnelTransporter: false,
	},
};

type Response = {
	token: string;
	accessType: string;
	user: User;
};

export type Credentials = {
	email: string;
	password: string;
};

const getRedirectLocation = (user: User) => {
	if (!user.isActive && !user.isAdmin) return ROUTES.ONBOARDING;
	const fullRoute = localStorage.getItem(redirectKey);
	const pathname = fullRoute?.split('?')[0];
	localStorage.removeItem(redirectKey);
	return fullRoute && ![ROUTES.AUTH].includes(pathname as string)
		? fullRoute
		: getHomeRoute(user);
};

export const login = createAsyncThunk<
	Response,
	{ credentials: Credentials; navigate: NavigateFunction },
	{ rejectValue: { error: string } }
>('auth/login', async ({ credentials, navigate }, { rejectWithValue }) => {
	try {
		const response = await POST('auth/login', {
			body: {
				email: credentials.email,
				password: window.btoa(credentials.password),
			},
		});
		const { token, accessType, user } = response;
		createSession({
			token,
			accessType,
			user,
		});
		navigate(getRedirectLocation(user), {
			replace: true,
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to log in. Please try again.';
		return rejectWithValue({ error: errorMessage });
	}
});

const LoginReducer = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = initialState.user;
		},
		validate: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		configUpdate: (state, action) => {
			state.user = {
				...state.user,
				subscription_model: action.payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.isAuthenticated = true;
				state.user = action.payload.user;
			})
			.addCase(
				login.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.isAuthenticated = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default LoginReducer.reducer;
export const { logout, validate, configUpdate } = LoginReducer.actions;
