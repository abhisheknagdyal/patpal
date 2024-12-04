import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { Personnel } from '@/utils/types.ts';

type State = {
	error: string;
	loading: boolean;
	boarders: {
		count: number;
		results: Personnel[];
	};
};

const initialState: State = {
	error: '',
	loading: false,
	boarders: {
		count: 0,
		results: [],
	},
};

export const getBoarders = createAsyncThunk<
	{ count: number; results: Personnel[] },
	{ skip: number },
	{ rejectValue: { error: string } }
>('boarders/fetch-boarders-thunk', async ({ skip }, { rejectWithValue }) => {
	try {
		return await GET('boarding/v1', {
			query: `skip=${skip}`,
		});
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to fetch boarders';
		return rejectWithValue({ error: errorMessage });
	}
});

const FetchBoardersReducer = createSlice({
	name: 'boarders/fetch-boarders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getBoarders.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getBoarders.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.boarders = action.payload;
			})
			.addCase(getBoarders.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.boarders = {
					count: 0,
					results: [],
				};
			});
	},
});

export default FetchBoardersReducer.reducer;
