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

export const getGroomerRequests = createAsyncThunk<
	Response,
	{ skip: number; status?: string[] },
	{ rejectValue: { error: string } }
>(
	'groomers/fetch-groomer-requests-thunk',
	async ({ skip, status }, { rejectWithValue }) => {
		try {
			return await GET('groomer/requests', {
				query: `skip=${skip}${status ? `&status=${status}` : ''}`,
			});
		} catch (error: any) {
			const errorMessage = error?.message || 'Failed to fetch groomers';
			return rejectWithValue({ error: errorMessage });
		}
	}
);

const GroomerRequestsReducer = createSlice({
	name: 'groomer/fetch-groomer-requests',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getGroomerRequests.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getGroomerRequests.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.requests = action.payload;
			})
			.addCase(getGroomerRequests.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.requests = {
					count: 0,
					results: [],
				};
			});
	},
});

export default GroomerRequestsReducer.reducer;
