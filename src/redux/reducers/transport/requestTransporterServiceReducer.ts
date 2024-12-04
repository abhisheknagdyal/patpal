import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POST } from '@/utils/api';
import { BookTransportSchema } from '@/utils/types.ts';
import { z } from 'zod';
import { toast } from 'sonner';

const initialState = {
	error: '',
	loading: false,
	success: false,
};

export const requestTransporterService = createAsyncThunk<
	any,
	{
		body: z.infer<typeof BookTransportSchema>;
		id: string;
	},
	{ rejectValue: { error: string } }
>('transporters/request', async ({ body, id }, { rejectWithValue }) => {
	try {
		const response = await POST(`transport/book/${id}`, {
			body: body,
		});
		toast.success('Transport service booked successfully!', {
			description: 'Your pet’s Transportation appointment is Booked.',
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

const RequestTransporterServiceReducer = createSlice({
	name: 'transporter/board-transporters',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(requestTransporterService.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(requestTransporterService.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.success = true;
			})
			.addCase(requestTransporterService.rejected, (state, action) => {
				state.loading = false;
				state.success = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default RequestTransporterServiceReducer.reducer;
