import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POST } from '@/utils/api';
import {toast} from "sonner";

type State = {
	error: string;
	loading: boolean;
};

const initialState: State = {
	error: '',
	loading: false,
};

export const updateCart = createAsyncThunk<
	any,
	{
		body: {
			productId: string;
			quantity: number;
			color?: string;
			size?: string;
		};
	},
	{ rejectValue: { error: string } }
>('cart/update-cart-thunk', async ({ body }, { rejectWithValue }) => {
	try {
		return await POST(`shop/cart`, { body });
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to update cart item';
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

const updateCartReducer = createSlice({
	name: 'cart/update-cart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateCart.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(updateCart.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(updateCart.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default updateCartReducer.reducer;
