import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { PersonnelRequest } from '@/utils/types.ts';

type Response = {
	count: number;
	results: PersonnelRequest[];
};

type State = {
	error: string;
	loading: boolean;
	requests: Response;
};

const initialState: State = {
	error: '',
	loading: false,
	requests: {
		count: 0,
		results: [],
	},
};

export const getBoarderRequests = createAsyncThunk<
	Response,
	{ skip: number; status?: string[] },
	{ rejectValue: { error: string } }
>(
	'boarders/fetch-boarder-requests-thunk',
	async ({ skip, status }, { rejectWithValue }) => {
		try {
			return await GET('boarding/v1/requests', {
				query: `skip=${skip}${status ? `&status=${status}` : ''}`,
			});
		} catch (error: any) {
			const errorMessage = error?.message || 'Failed to fetch boarders';
			return rejectWithValue({ error: errorMessage });
		}
	}
);

const BoarderRequestsReducer = createSlice({
	name: 'boarders/fetch-groomer-requests',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getBoarderRequests.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getBoarderRequests.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.requests = action.payload;
			})
			.addCase(getBoarderRequests.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.requests = {
					count: 0,
					results: [],
				};
			});
	},
});

export default BoarderRequestsReducer.reducer;
