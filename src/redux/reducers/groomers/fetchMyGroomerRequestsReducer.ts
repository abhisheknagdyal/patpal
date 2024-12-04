import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';

const initialState = {
	error: '',
	loading: false,
	requests: {
		count: 0,
		results: [],
	},
};

export const getMyGroomingRequests = createAsyncThunk<
	any,
	{ skip: number },
	{ rejectValue: { error: string } }
>('groomers/fetch-my-requests-thunk', async ({ skip }, { rejectWithValue }) => {
	try {
		return await GET('groomer/my-requests', {
			query: `skip=${skip}`,
		});
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to fetch your appointments';
		return rejectWithValue({ error: errorMessage });
	}
});

const FetchMyGroomerRequestsReducer = createSlice({
	name: 'groomers/fetch-my-requests-thunk',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMyGroomingRequests.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getMyGroomingRequests.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.requests = action.payload;
			})
			.addCase(getMyGroomingRequests.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.requests = {
					count: 0,
					results: [],
				};
			});
	},
});

export default FetchMyGroomerRequestsReducer.reducer;
