import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POST } from '@/utils/api';
import { TransporterSchema } from '@/utils/types.ts';
import { z } from 'zod';
import { toast } from 'sonner';
import { updateUserDetails } from '@/utils/auth/session.ts';
import { omit } from '@/utils/lodash.ts';

const initialState = {
	error: '',
	loading: false,
	success: false,
};

export const boardTransporter = createAsyncThunk<
	{ message: string; new_url: string },
	{ body: z.infer<typeof TransporterSchema> },
	{ rejectValue: { error: string } }
>(
	'transporters/board-transporters-thunk',
	async ({ body }, { rejectWithValue }) => {
		try {
			const response = await POST('auth/board-transporter', {
				body: {
					...body,
					photo_url: body.photo_url?.[0].data,
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
	}
);

const onBoardTransportersReducer = createSlice({
	name: 'transporter/board-transporters',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(boardTransporter.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(boardTransporter.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.success = true;
			})
			.addCase(boardTransporter.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default onBoardTransportersReducer.reducer;
