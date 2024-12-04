import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { User } from '@/utils/types.ts';

export type Response = User & {
	_id: string;
	latestMessage: string;
	latestMessageSenderId: string;
	messageDate: Date;
};

type State = {
	error: string;
	loading: boolean;
	matches: Response[];
};

const initialState: State = {
	error: '',
	loading: false,
	matches: [],
};

export const getMyMatches = createAsyncThunk<
	Response[],
	void,
	{ rejectValue: { error: string } }
>('social/get-matches-thunk', async (_, { rejectWithValue }) => {
	try {
		return await GET(`social/matches`);
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to fetch orders';
		return rejectWithValue({ error: errorMessage });
	}
});

const FetchMyMatchesReducer = createSlice({
	name: 'social/get-matches',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMyMatches.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getMyMatches.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.matches = action.payload;
			})
			.addCase(getMyMatches.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.matches = [];
			});
	},
});

export default FetchMyMatchesReducer.reducer;
