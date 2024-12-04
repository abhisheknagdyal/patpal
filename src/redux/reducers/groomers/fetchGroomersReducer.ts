import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { Personnel } from '@/utils/types.ts';

type State = {
	error: string;
	loading: boolean;
	groomers: {
		count: number;
		results: Personnel[];
	};
};

const initialState: State = {
	error: '',
	loading: false,
	groomers: {
		count: 0,
		results: [],
	},
};

export const getGroomers = createAsyncThunk<
	{ count: number; results: Personnel[] },
	{ skip: number },
	{ rejectValue: { error: string } }
>('groomers/fetch-groomers-thunk', async ({ skip }, { rejectWithValue }) => {
	try {
		return await GET('groomer', {
			query: `skip=${skip}`,
		});
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to fetch groomers';
		return rejectWithValue({ error: errorMessage });
	}
});

const FetchGroomersReducer = createSlice({
	name: 'groomer/fetch-groomers',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getGroomers.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getGroomers.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.groomers = action.payload;
			})
			.addCase(getGroomers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.groomers = {
					count: 0,
					results: [],
				};
			});
	},
});

export default FetchGroomersReducer.reducer;
