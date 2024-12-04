import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POST } from '@/utils/api.ts';
import { toast } from 'sonner';

type State = {
	error: string;
	loading: boolean;
	data: {
		score: number;
		summary: string;
	};
};

const initialState: State = {
	error: '',
	loading: false,
	data: {
		score: 0,
		summary: '',
	},
};

export const getMatchScore = createAsyncThunk<
	any,
	{
		myPet: string;
		potentialPet: string;
	},
	{ rejectValue: { error: string } }
>('breeding/match', async (petIds, { rejectWithValue }) => {
	try {
		return await POST('ethical-matcher/get-match/', {
			body: petIds,
		});
	} catch (error: any) {
		const errorMessage =
			error?.message ||
			'Failed to get breeding compatibility score. Please try again.';
		toast.error('Unexpected error occurred', {
			description: errorMessage,
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return rejectWithValue({ error: errorMessage });
	}
});

const GetMatchScoreReducer = createSlice({
	name: 'breeding/natch',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMatchScore.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getMatchScore.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.data = action.payload;
			})
			.addCase(
				getMatchScore.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.data = {
						score: 0,
						summary: '',
					};
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default GetMatchScoreReducer.reducer;
