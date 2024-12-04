import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POST } from '@/utils/api';

type State = {
	error: string;
	loading: boolean;
	response: { message: string };
};

const initialState: State = {
	error: '',
	loading: false,
	response: { message: '' },
};

export const createBreedingMatch = createAsyncThunk<
	{ message: string },
	{ id: string },
	{ rejectValue: { error: string } }
>('like-user-thunk', async ({ id }, { rejectWithValue }) => {
	try {
		return await POST(`social/create-breed`, { body: { userId: id } });
	} catch (error: any) {
		const errorMessage = error?.message || `Failed to like user.`;
		return rejectWithValue({ error: errorMessage });
	}
});

const CreateMatchReducer = createSlice({
	name: 'social/create-breed',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createBreedingMatch.pending, (state) => {
				state.loading = true;
				state.error = '';
				state.response = { message: '' };
			})
			.addCase(createBreedingMatch.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.response = action.payload;
			})
			.addCase(createBreedingMatch.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.response = { message: '' };
			});
	},
});

export default CreateMatchReducer.reducer;
