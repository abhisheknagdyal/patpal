import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { Product } from '@/utils/types.ts';
import querystring from 'query-string';

type State = {
	error: string;
	loading: boolean;
	products: {
		count: number;
		results: Product[];
	};
};

const initialState: State = {
	error: '',
	loading: false,
	products: {
		count: 0,
		results: [],
	},
};

export const getProducts = createAsyncThunk<
	{ count: number; results: Product[] },
	{ skip: number; sort: string; petType: string; category: string },
	{ rejectValue: { error: string } }
>(
	'products/fetch-products-thunk',
	async ({ skip, sort, petType, category }, { rejectWithValue }) => {
		try {
			const query = querystring.stringify({
				skip,
				sort,
				petType,
				category,
			});
			return await GET('shop/products', {
				query,
			});
		} catch (error: any) {
			const errorMessage = error?.message || 'Failed to fetch boarders';
			return rejectWithValue({ error: errorMessage });
		}
	}
);

const FetchProductsReducer = createSlice({
	name: 'products/fetch-products-thunk',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.products = action.payload;
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.products = {
					count: 0,
					results: [],
				};
			});
	},
});

export default FetchProductsReducer.reducer;
