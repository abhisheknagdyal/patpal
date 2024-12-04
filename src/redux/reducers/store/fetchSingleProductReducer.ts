import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { Product } from '@/utils/types.ts';

type ExtendedProduct = Product & {
	sizesAvailable?: string[];
	colorsAvailable?: string[];
};

type State = {
	error: string;
	loading: boolean;
	product: ExtendedProduct;
};

const initialState: State = {
	error: '',
	loading: false,
	product: {
		_id: '',
		name: '',
		description: '',
		category: '',
		price: 0,
		stock: 0,
		petType: '',
		images: [],
	},
};

export const getProductById = createAsyncThunk<
	ExtendedProduct,
	string,
	{ rejectValue: { error: string } }
>('products/fetch-products-thunk', async (id, { rejectWithValue }) => {
	try {
		return await GET(`shop/products/${id}`);
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to fetch product';
		return rejectWithValue({ error: errorMessage });
	}
});

const FetchProductsReducer = createSlice({
	name: 'products/fetch-products-thunk',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProductById.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getProductById.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.product = action.payload;
			})
			.addCase(getProductById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default FetchProductsReducer.reducer;
