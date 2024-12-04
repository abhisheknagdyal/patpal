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

export const getMyBreedingMatches = createAsyncThunk<
	Response[],
	void,
	{ rejectValue: { error: string } }
>('social/get-breeding-matches-thunk', async (_, { rejectWithValue }) => {
	try {
		return await GET(`social/matches-breeding`);
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to fetch orders';
		return rejectWithValue({ error: errorMessage });
	}
});

const FetchMyBreedingMatchesReducer = createSlice({
	name: 'social/get-breeding-matches',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMyBreedingMatches.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getMyBreedingMatches.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.matches = action.payload;
			})
			.addCase(getMyBreedingMatches.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.matches = [];
			});
	},
});

export default FetchMyBreedingMatchesReducer.reducer;
