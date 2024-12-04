import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { SocialUser } from '@/utils/types.ts';

type State = {
	error: string;
	loading: boolean;
	loaded: boolean;
	users: {
		count: number;
		results: SocialUser[];
	};
};

const initialState: State = {
	error: '',
	loading: false,
	loaded: false,
	users: {
		count: 0,
		results: [],
	},
};

export const getUsers = createAsyncThunk<
	{ count: number; results: SocialUser[] },
	{ skip: number },
	{ rejectValue: { error: string } }
>('social/fetch-users-data-thunk', async ({ skip }, { rejectWithValue }) => {
	try {
		return await GET('social/', {
			query: `skip=${skip}`,
		});
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to fetch boarders';
		return rejectWithValue({ error: errorMessage });
	}
});

const FetchAllUsersReducer = createSlice({
	name: 'social/fetch-users-data',
	initialState,
	reducers: {
		likeUnlikeUserLocal: (state, action) => {
			state.users.results = state.users.results.filter(
				(item) => item._id !== action.payload
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.users = {
					count: action.payload.count,
					results: [...state.users.results, ...action.payload.results],
				};
				state.loaded = true;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.loaded = true;
				state.users = {
					count: 0,
					results: [],
				};
			});
	},
});

export default FetchAllUsersReducer.reducer;
export const { likeUnlikeUserLocal } = FetchAllUsersReducer.actions;
