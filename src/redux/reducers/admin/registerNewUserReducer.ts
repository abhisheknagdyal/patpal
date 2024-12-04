import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POST } from '@/utils/api';

type Body = {
	username: string;
	email: string;
	isAdmin: boolean;
	isPersonnelBoarder: boolean;
	isPersonnelGroomer: boolean;
};

const initialState = {
	error: '',
	loading: false,
};

export const registerUser = createAsyncThunk<any, Body>(
	'admin/monitored-users-register-thunk',
	async (body) => {
		try {
			return await POST('auth/register-user', {
				body,
			});
		} catch {
			return;
		}
	}
);

const RegisterUserReducer = createSlice({
	name: 'admin/monitored-users-register',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(registerUser.rejected, (state) => {
				state.loading = false;
				state.error = 'Unable to fetch Users';
			});
	},
});

export default RegisterUserReducer.reducer;
