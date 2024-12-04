import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PUT } from '@/utils/api';
import { toast } from 'sonner';

type State = {
	error: string;
	loading: boolean;
};

const initialState: State = {
	error: '',
	loading: false,
};

export const cancelSubscription = createAsyncThunk<
	any,
	void,
	{ rejectValue: { error: string } }
>('subscription/cancel-subscription-thunk', async (_, { rejectWithValue }) => {
	try {
		const response = await PUT('payments/subscriptions/cancel');
		window.location.reload();
		toast.success('Your subscription has been successfully cancelled..', {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message ||
			'We encountered an issue while trying to cancel your subscription. Please try again later.';
		toast.error(errorMessage, {
			action: {
				label: 'Retry',
				onClick: () => null,
			},
		});
		return rejectWithValue({ error: errorMessage });
	}
});

const CancelSubscriptionReducer = createSlice({
	name: 'subscription/cancel-subscription-thunk',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(cancelSubscription.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(cancelSubscription.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(cancelSubscription.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default CancelSubscriptionReducer.reducer;
