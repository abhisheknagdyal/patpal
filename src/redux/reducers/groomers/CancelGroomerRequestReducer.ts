import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PUT } from '@/utils/api';
import { toast } from 'sonner';

const initialState = {
	error: '',
	loading: false,
};

export const cancelGroomerRequest = createAsyncThunk<
	any,
	string,
	{ rejectValue: { error: string } }
>('groomer/cancel-request-thunk', async (id, { rejectWithValue }) => {
	try {
		const response = await PUT(`groomer/cancel/${id}`);
		toast.success('Appointment Canceled', {
			description:
				'Your pet’s grooming appointment has been successfully canceled.',
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to cancel your appointments';
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

const CancelGroomerRequestReducer = createSlice({
	name: 'groomer/cancel-request-thunk',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(cancelGroomerRequest.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(cancelGroomerRequest.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(cancelGroomerRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default CancelGroomerRequestReducer.reducer;
