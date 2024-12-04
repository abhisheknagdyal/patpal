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

export const requestGroomerService = createAsyncThunk<
	any,
	{
		body: z.infer<typeof BookServiceSchema>;
		id: string;
	},
	{ rejectValue: { error: string } }
>('groomers/request', async ({ body, id }, { rejectWithValue }) => {
	try {
		const updatedTo = new Date(body.timeSlot.from);
		updatedTo.setHours(body.timeSlot.to.getHours());
		updatedTo.setMinutes(body.timeSlot.to.getMinutes());
		updatedTo.setSeconds(body.timeSlot.to.getSeconds());
		const timeValue = [
			convertToEpoch(body.timeSlot.from),
			convertToEpoch(updatedTo),
		];
		const response = await POST(`groomer/book/${id}`, {
			body: {
				...body,
				timeSlot: timeValue,
			},
		});
		toast.success('Grooming service booked successfully!', {
			description: 'Your pet’s grooming appointment is Booked.',
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

const RequestGroomerServiceReducer = createSlice({
	name: 'groomer/board-groomers',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(requestGroomerService.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(requestGroomerService.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.success = true;
			})
			.addCase(requestGroomerService.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default RequestGroomerServiceReducer.reducer;
