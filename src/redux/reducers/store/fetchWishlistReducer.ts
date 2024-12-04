import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { Product } from '@/utils/types.ts';

type State = {
	error: string;
	loading: boolean;
	wishlist: {
		items: {
			product: Product;
		}[];
	};
};

const initialState: State = {
	error: '',
	loading: false,
	wishlist: {
		items: [],
	},
};

export const getMyWishlist = createAsyncThunk<
	{ items: { product: Product }[] },
	void,
	{ rejectValue: { error: string } }
>('wishlist/fetch-wishlist-thunk', async (_, { rejectWithValue }) => {
	try {
		return await GET(`shop/wishlist`);
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to get Wishlist';
		return rejectWithValue({ error: errorMessage });
	}
});

const FetchWishlistReducer = createSlice({
	name: 'wishlist/fetch-wishlist',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMyWishlist.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getMyWishlist.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.wishlist = action.payload;
			})
			.addCase(getMyWishlist.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default FetchWishlistReducer.reducer;
