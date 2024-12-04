import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {DELETE} from '@/utils/api';
import {toast} from "sonner";

type State = {
  error: string;
  loading: boolean;

};

const initialState: State = {
  error: '',
  loading: false,

};

export const deleteFromCart = createAsyncThunk<
	any,
	{ body: { productId: string } ,name:string},
	{ rejectValue: { error: string } }
>('cart/delete-cart-thunk', async ({ body,name }, { rejectWithValue }) => {
	try {
		const response= await DELETE(`shop/cart/delete`, { body });
    toast.success(`${name} removed from Cart.`, {
      action: {
        label: 'Ok',
        onClick: () => null,
      },
    });
    return response
	} catch (error: any) {
		const errorMessage = error?.message || `Failed remove ${name} from Cart.`;
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

const DeleteFromCartReducer = createSlice({
  name: 'cart/delete-cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteFromCart.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(deleteFromCart.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : 'Unknown error';
      });
  },
});

export default DeleteFromCartReducer.reducer;
