import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PUT } from '@/utils/api';
import { toast } from 'sonner';

const initialState = {
	error: '',
	loading: false,
};

export const cancelTransporterRequest = createAsyncThunk<
	any,
	string,
	{ rejectValue: { error: string } }
>('transporter/cancel-request-thunk', async (id, { rejectWithValue }) => {
	try {
		const response = await PUT(`transporter/cancel/${id}`);
		toast.success('Appointment Canceled', {
			description:
				'Your pet’s transportation request has been successfully canceled.',
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to cancel your request';
		toast.error('Cancellation Failed', {
			description: errorMessage,
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return rejectWithValue({ error: errorMessage });
	}
});

const CancelTransporterRequestReducer = createSlice({
	name: 'transporter/cancel-request-thunk',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(cancelTransporterRequest.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(cancelTransporterRequest.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(cancelTransporterRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default CancelTransporterRequestReducer.reducer;
