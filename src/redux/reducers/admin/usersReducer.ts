import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';

const initialState = {
	error: '',
	loading: false,
	users: {
		count: 0,
		results: [],
	},
};

export const getAdminUsers = createAsyncThunk<any, { skip: number }>(
	'admin/monitored-users-thunk',
	async ({ skip }) => {
		try {
			return await GET('users', {
				query: `skip=${skip}`,
			});
		} catch {
			return;
		}
	}
);

const UsersReducer = createSlice({
	name: 'admin/monitored-users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAdminUsers.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getAdminUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.users = action.payload;
			})
			.addCase(getAdminUsers.rejected, (state) => {
				state.loading = false;
				state.error = 'Unable to fetch Users';
				state.users = {
					count: 0,
					results: [],
				};
			});
	},
});

export default UsersReducer.reducer;
