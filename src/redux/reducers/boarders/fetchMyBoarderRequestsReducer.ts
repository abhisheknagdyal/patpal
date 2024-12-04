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

export const getMyBoardingRequests = createAsyncThunk<
	any,
	{ skip: number },
	{ rejectValue: { error: string } }
>('boarders/fetch-my-requests-thunk', async ({ skip }, { rejectWithValue }) => {
	try {
		return await GET('boarding/v1/my-requests', {
			query: `skip=${skip}`,
		});
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to fetch your appointments';
		return rejectWithValue({ error: errorMessage });
	}
});

const FetchMyBoarderRequestsReducer = createSlice({
	name: 'boarders/fetch-my-requests-thunk',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMyBoardingRequests.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getMyBoardingRequests.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.requests = action.payload;
			})
			.addCase(getMyBoardingRequests.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.requests = {
					count: 0,
					results: [],
				};
			});
	},
});

export default FetchMyBoarderRequestsReducer.reducer;
