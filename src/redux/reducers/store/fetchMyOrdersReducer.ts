import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { MyOrder } from '@/utils/types.ts';

type State = {
	error: string;
	loading: boolean;
	orders: {
		count: number;
		results: MyOrder[];
	};
};

const initialState: State = {
	error: '',
	loading: false,
	orders: {
		count: 0,
		results: [],
	},
};

export const getMyOrders = createAsyncThunk<
	{ count: number; results: MyOrder[] },
	{ skip: number },
	{ rejectValue: { error: string } }
>('orders/fetch-orders-thunk', async ({ skip }, { rejectWithValue }) => {
	try {
		return await GET('payments/orders', {
			query: `skip=${skip}`,
		});
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to fetch orders';
		return rejectWithValue({ error: errorMessage });
	}
});

const FetchMyOrdersReducer = createSlice({
	name: 'orders/fetch-orders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMyOrders.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getMyOrders.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.orders = action.payload;
			})
			.addCase(getMyOrders.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.orders = {
					count: 0,
					results: [],
				};
			});
	},
});

export default FetchMyOrdersReducer.reducer;
