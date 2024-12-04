import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POST } from '@/utils/api';
import { GroomerBoarderSchema } from '@/utils/types.ts';
import { z } from 'zod';
import { toast } from 'sonner';
import { extractTimeFromDateString } from '@/utils/time.ts';
import { updateUserDetails } from '@/utils/auth/session.ts';
import { omit } from '@/utils/lodash.ts';

const initialState = {
	error: '',
	loading: false,
	success: false,
};

export const boardBoarder = createAsyncThunk<
	{ message: string; new_url: string },
	{ body: z.infer<typeof GroomerBoarderSchema> },
	{ rejectValue: { error: string } }
>('groomers/board-boarder-thunk', async ({ body }, { rejectWithValue }) => {
	try {
		const from = extractTimeFromDateString(body.timeAvailable.from);
		const to = extractTimeFromDateString(body.timeAvailable.to);
		const timeValue = [
			Number(from.replace(':', '')),
			Number(to.replace(':', '')),
		];
		const response = await POST('auth/board-boarder', {
			body: {
				...body,
				photo_url: body.photo_url?.[0]?.data,
				timeAvailable: timeValue,
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

const onBoardBoarderReducer = createSlice({
	name: 'groomer/board-boarders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(boardBoarder.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(boardBoarder.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.success = true;
			})
			.addCase(boardBoarder.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default onBoardBoarderReducer.reducer;
