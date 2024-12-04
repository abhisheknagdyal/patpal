import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POST } from '@/utils/api';
import { toast } from 'sonner';
import { NavigateFunction } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.ts';

const initialState = {
	error: '',
	loading: false,
};

type Response = {
	message: string;
};

type Credentials = {
	id: string;
	key: string;
	password: string;
};

export const activateUser = createAsyncThunk<
	Response,
	{ credentials: Credentials; navigate: NavigateFunction },
	{ rejectValue: { error: string } }
>(
	'auth/activate-user-thunk',
	async ({ credentials, navigate }, { rejectWithValue }) => {
		try {
			const response = await POST('auth/activation', {
				body: {
					id: credentials.id,
					key: credentials.key,
					password: window.btoa(credentials.password),
				},
			});
			toast.success('User activated successfully.', {
				action: {
					label: 'Ok',
					onClick: () => null,
				},
			});
			navigate(ROUTES.AUTH, { replace: true });
			return response;
		} catch (error: any) {
			const errorMessage =
				error?.message || 'Failed to log in. Please try again.';
			toast.error('Unexpected error occurred', {
				description: errorMessage,
				action: {
					label: 'Ok',
					onClick: () => null,
				},
			});
			return rejectWithValue({ error: errorMessage });
		}
	}
);

const ActivateUserReducer = createSlice({
	name: 'auth/activate-user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(activateUser.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(activateUser.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(
				activateUser.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default ActivateUserReducer.reducer;
