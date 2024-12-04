import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { TransporterRequest } from '@/utils/types.ts';

type Response = {
	count: number;
	results: TransporterRequest[];
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

export const getTransporterRequests = createAsyncThunk<
	Response,
	{ skip: number; status?: string[] },
	{ rejectValue: { error: string } }
>(
	'transport/fetch-transporter-requests-thunk',
	async ({ skip, status }, { rejectWithValue }) => {
		try {
			return await GET('transport/requests', {
				query: `skip=${skip}${status ? `&status=${status}` : ''}`,
			});
		} catch (error: any) {
			const errorMessage = error?.message || 'Failed to fetch requests';
			return rejectWithValue({ error: errorMessage });
		}
	}
);

const TransporterRequestsReducer = createSlice({
	name: 'transport/fetch-transporter-requests',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTransporterRequests.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getTransporterRequests.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.requests = action.payload;
			})
			.addCase(getTransporterRequests.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.requests = {
					count: 0,
					results: [],
				};
			});
	},
});

export default TransporterRequestsReducer.reducer;
