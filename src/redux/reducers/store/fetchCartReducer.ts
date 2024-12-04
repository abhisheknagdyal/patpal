import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { Product } from '@/utils/types.ts';

type State = {
	error: string;
	loading: boolean;
	cart: {
		items: {
			product: Product & {
				sizesAvailable?: string[];
				colorsAvailable?: string[];
			};
			quantity: number;
			color: string;
			size: string;
		}[];
	};
};

const initialState: State = {
	error: '',
	loading: false,
	cart: {
		items: [],
	},
};

export const getCart = createAsyncThunk<
	any,
	void,
	{ rejectValue: { error: string } }
>('cart/fetch-cart-thunk', async (_, { rejectWithValue }) => {
	try {
		return await GET(`shop/cart`);
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to get Cart';
		return rejectWithValue({ error: errorMessage });
	}
});

const FetchCartReducer = createSlice({
	name: 'cart/fetch-cart',
	initialState,
	reducers: {
		addItemQuantity: (state, action) => {
			const item = state.cart.items.find(
				(item) => item.product._id === action.payload
			);
			if (item) {
				item.quantity += 1;
			}
		},
		removeItemQuantity: (state, action) => {
			const item = state.cart.items.find(
				(item) => item.product._id === action.payload
			);
			if (item) {
				item.quantity -= 1;
			}
		},
		deleteItem: (state, action) => {
			state.cart.items = state.cart.items.filter(
				(item) => item.product._id !== action.payload
			);
		},
		changeItemColor: (state, action) => {
			const item = state.cart.items.find(
				(item) => item.product._id === action.payload.id
			);
			if (item) {
				item.color = action.payload.color;
			}
		},
		changeItemSize: (state, action) => {
			const item = state.cart.items.find(
				(item) => item.product._id === action.payload.id
			);
			if (item) {
				item.size = action.payload.size;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCart.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getCart.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.cart = action.payload;
			})
			.addCase(getCart.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default FetchCartReducer.reducer;
export const {
	deleteItem,
	addItemQuantity,
	removeItemQuantity,
	changeItemColor,
	changeItemSize,
} = FetchCartReducer.actions;
