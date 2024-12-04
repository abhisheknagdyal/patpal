import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POST } from '@/utils/api';
import { BookServiceSchema } from '@/utils/types.ts';
import { z } from 'zod';
import { toast } from 'sonner';
import { convertToEpoch } from '@/utils/time.ts';

const initialState = {
	error: '',
	loading: false,
	success: false,
};

export const requestBoarderService = createAsyncThunk<
	any,
	{
		body: z.infer<typeof BookServiceSchema>;
		id: string;
	},
	{ rejectValue: { error: string } }
>('boarding/v1/requests', async ({ body, id }, { rejectWithValue }) => {
	try {
		const updatedTo = new Date(body.timeSlot.from);
		updatedTo.setHours(body.timeSlot.to.getHours());
		updatedTo.setMinutes(body.timeSlot.to.getMinutes());
		updatedTo.setSeconds(body.timeSlot.to.getSeconds());
		const timeValue = [
			convertToEpoch(body.timeSlot.from),
			convertToEpoch(updatedTo),
		];
		const response = await POST(`boarding/v1/book/${id}`, {
			body: {
				...body,
				timeSlot: timeValue,
			},
		});
		toast.success('Boarding service booked successfully!', {
			description: 'Your pet’s boarding appointment is booked.',
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Booking failed. Please try again later.';
		toast.error('Booking Failed', {
			description: errorMessage,
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return rejectWithValue({ error: errorMessage });
	}
});

const RequestBoarderServiceReducer = createSlice({
	name: 'boarders/request',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(requestBoarderService.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(requestBoarderService.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.success = true;
			})
			.addCase(requestBoarderService.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default RequestBoarderServiceReducer.reducer;
