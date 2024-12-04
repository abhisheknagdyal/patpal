import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';

const initialState = {
	error: '',
	loading: false,
	products: {
		count: 0,
		results: [],
	},
};

export const getAdminProducts = createAsyncThunk<any, { skip: number }>(
	'admin/products-thunk',
	async ({ skip }) => {
		try {
			return await GET('shop/products', {
				query: `skip=${skip}`,
			});
		} catch {
			return;
		}
	}
);

const ProductsReducer = createSlice({
	name: 'admin/products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAdminProducts.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getAdminProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.products = action.payload;
			})
			.addCase(getAdminProducts.rejected, (state) => {
				state.loading = false;
				state.error = 'Unable to fetch Users';
				state.products = {
					count: 0,
					results: [],
				};
			});
	},
});

export default ProductsReducer.reducer;
