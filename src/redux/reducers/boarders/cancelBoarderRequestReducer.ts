import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PUT } from '@/utils/api';
import { toast } from 'sonner';

const initialState = {
	error: '',
	loading: false,
};

export const cancelBoarderRequest = createAsyncThunk<
	any,
	string,
	{ rejectValue: { error: string } }
>('boarder/cancel-request-thunk', async (id, { rejectWithValue }) => {
	try {
		const response = await PUT(`boarding/v1/cancel/${id}`);
		toast.success('Appointment Canceled', {
			description:
				'Your pet’s boarding appointment has been successfully canceled.',
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

const CancelBoarderRequestReducer = createSlice({
	name: 'boarder/cancel-request-thunk',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(cancelBoarderRequest.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(cancelBoarderRequest.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(cancelBoarderRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default CancelBoarderRequestReducer.reducer;
