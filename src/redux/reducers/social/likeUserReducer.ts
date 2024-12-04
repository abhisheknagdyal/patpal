import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POST } from '@/utils/api';
import { toast } from 'sonner';
import { NavigateFunction } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.ts';

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

export const likeUser = createAsyncThunk<
	{ message: string },
	{ id: string; name: string; navigate: NavigateFunction },
	{ rejectValue: { error: string } }
>('like-user-thunk', async ({ id, name, navigate }, { rejectWithValue }) => {
	try {
		const response = await POST(`social/like`, { body: { userId: id } });
		if (response.message === 'Match found') {
			toast.success(`Yay you matched with ${name}!`, {
				duration: 7000,
				action: {
					label: 'Ok',
					onClick: () => navigate(ROUTES.SOCIAL_NETWORK.getSingleChat(id)),
				},
			});
		}
		return response;
	} catch (error: any) {
		const errorMessage = error?.message || `Failed to like user.`;
		return rejectWithValue({ error: errorMessage });
	}
});

const LikeUserReducer = createSlice({
	name: 'like-user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(likeUser.pending, (state) => {
				state.loading = true;
				state.error = '';
				state.response = { message: '' };
			})
			.addCase(likeUser.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.response = action.payload;
			})
			.addCase(likeUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.response = { message: '' };
			});
	},
});

export default LikeUserReducer.reducer;
