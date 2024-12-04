import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { Transporter } from '@/utils/types.ts';

type State = {
	error: string;
	loading: boolean;
	transporters: {
		count: number;
		results: Transporter[];
	};
};

const initialState: State = {
	error: '',
	loading: false,
	transporters: {
		count: 0,
		results: [],
	},
};

export const getTransporters = createAsyncThunk<
	{ count: number; results: Transporter[] },
	{ skip: number },
	{ rejectValue: { error: string } }
>(
	'transport/fetch-transporters-thunk',
	async ({ skip }, { rejectWithValue }) => {
		try {
			return await GET('transport', {
				query: `skip=${skip}`,
			});
		} catch (error: any) {
			const errorMessage = error?.message || 'Failed to fetch transporters';
			return rejectWithValue({ error: errorMessage });
		}
	}
);

const FetchTransportersReducer = createSlice({
	name: 'transport/fetch-transporters',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTransporters.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getTransporters.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.transporters = action.payload;
			})
			.addCase(getTransporters.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.transporters = {
					count: 0,
					results: [],
				};
			});
	},
});

export default FetchTransportersReducer.reducer;
