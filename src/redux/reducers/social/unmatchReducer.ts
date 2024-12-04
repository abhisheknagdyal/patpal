import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POST } from '@/utils/api';

type State = {
	error: string;
	loading: boolean;
};

const initialState: State = {
	error: '',
	loading: false,
};

export const unMatch = createAsyncThunk<
	any,
	string,
	{ rejectValue: { error: string } }
>('unMatch-user-thunk', async (id, { rejectWithValue }) => {
	try {
		return await POST(`social/un-match`, { body: { userId: id } });
	} catch (error: any) {
		const errorMessage = error?.message || `Failed to unlike user.`;
		return rejectWithValue({ error: errorMessage });
	}
});

const UnMatchReducer = createSlice({
	name: 'unMatch-user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(unMatch.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(unMatch.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(unMatch.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default UnMatchReducer.reducer;
