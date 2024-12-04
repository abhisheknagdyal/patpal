import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POST } from '@/utils/api.ts';
import { toast } from 'sonner';

type PaymentState = {
	error: string;
	loading: boolean;
};

const initialState: PaymentState = {
	error: '',
	loading: false,
};

export const createOrder = createAsyncThunk<
	any,
	{ path: string },
	{ rejectValue: { error: string } }
>('payments/create-order', async ({ path }, { rejectWithValue }) => {
	try {
		const response = await POST('payments/orders', {
			body: { path },
		});
		const { url } = response;
		window.location.replace(url);
		return response;
	} catch (error: any) {
		const errorMessage =
			error.message || 'Failed to create order. Please try again.';
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

const CreateOrderReducer = createSlice({
	name: 'payments/create-order',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(createOrder.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default CreateOrderReducer.reducer;
