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

export const unlikeUser = createAsyncThunk<
	any,
	string,
	{ rejectValue: { error: string } }
>('unlike-user-thunk', async (id, { rejectWithValue }) => {
	try {
		return await POST(`social/unlike`, { body: { userId: id } });
	} catch (error: any) {
		const errorMessage = error?.message || `Failed to unlike user.`;
		return rejectWithValue({ error: errorMessage });
	}
});

const UnlikeUserReducer = createSlice({
	name: 'unlike-user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(unlikeUser.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(unlikeUser.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(unlikeUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default UnlikeUserReducer.reducer;
