import { z } from 'zod';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POST } from '@/utils/api.ts';

import { UserBoardSchema } from '@/utils/types.ts';
import { toast } from 'sonner';
import { updateUserDetails } from '@/utils/auth/session.ts';
import { omit } from '@/utils/lodash.ts';

type State = {
	error: string;
	loading: boolean;
};

const initialState: State = {
	error: '',
	loading: false,
};

type UpdateUserPayload = z.infer<typeof UserBoardSchema>;

export const updateUser = createAsyncThunk<
	{ message: string; new_url: string },
	UpdateUserPayload,
	{ rejectValue: { error: string } }
>('auth/update-user-thunk', async (data, { rejectWithValue }) => {
	try {
		const response = await POST(`auth/update`, {
			body: {
				...data,
				photo_url: data.photo_url?.[0]?.data,
			},
		});
		updateUserDetails(omit(data, ['photo_url']), response.new_url);
		window.location.reload();
		toast.success('User updated', {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to update user. Please try again.';
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

const UpdateUserReducer = createSlice({
	name: 'auth/update-user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(updateUser.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(
				updateUser.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default UpdateUserReducer.reducer;
