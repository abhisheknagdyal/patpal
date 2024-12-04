import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { POST } from '@/utils/api';

const initialState = {
	error: '',
	loading: false,
	isValid: false,
};

type Response = {
	message: string;
};

type Credentials = {
	id: string;
	key: string;
};

export const checkCredentials = createAsyncThunk<
	Response,
	{ credentials: Credentials },
	{ rejectValue: { error: string } }
>(
	'auth/check-credentials-thunk',
	async ({ credentials }, { rejectWithValue }) => {
		try {
			return await POST('auth/check', {
				body: {
					id: credentials.id,
					key: window.btoa(credentials.key),
				},
			});
		} catch (error: any) {
			const errorMessage =
				error?.message || 'Failed to check credentials. Please try again.';
			return rejectWithValue({ error: errorMessage });
		}
	}
);

const CheckCredentialsReducer = createSlice({
	name: 'auth/check-credentials',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(checkCredentials.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(checkCredentials.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.isValid = true;
			})
			.addCase(
				checkCredentials.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.isValid = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default CheckCredentialsReducer.reducer;
