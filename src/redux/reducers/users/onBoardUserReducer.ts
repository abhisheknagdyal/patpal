import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POST } from '@/utils/api';
import { UserBoardSchema } from '@/utils/types.ts';
import { z } from 'zod';
import { toast } from 'sonner';
import { updateUserDetails } from '@/utils/auth/session.ts';
import { omit } from '@/utils/lodash.ts';

const initialState = {
	error: '',
	loading: false,
	success: false,
};

export const boardUser = createAsyncThunk<
	{ message: string; new_url: string },
	{ body: z.infer<typeof UserBoardSchema> },
	{ rejectValue: { error: string } }
>('groomers/board-user-thunk', async ({ body }, { rejectWithValue }) => {
	try {
		const response = await POST('auth/update', {
			body: {
				...body,
				photo_url: body.photo_url?.[0]?.data,
			},
		});
		updateUserDetails(omit(body, ['photo_url']), response.new_url);
		toast.success('Successfully on board.', {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to on board. Please try again.';
		return rejectWithValue({ error: errorMessage });
	}
});

const onBoardUsersReducer = createSlice({
	name: 'groomer/board-user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(boardUser.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(boardUser.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.success = true;
			})
			.addCase(boardUser.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default onBoardUsersReducer.reducer;
