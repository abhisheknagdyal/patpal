import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DELETE } from '@/utils/api.ts';

import { toast } from 'sonner';

type deleteProductState = {
	error: string;
	loading: boolean;
	idInState: string;
};

const initialState: deleteProductState = {
	error: '',
	loading: false,
	idInState: '',
};

export const deleteProduct = createAsyncThunk<
	{ message: string },
	string,
	{ rejectValue: { error: string } }
>('store/delete-product-thunk', async (id, { rejectWithValue }) => {
	try {
		const response = await DELETE(`shop/products/${id}`);
		toast.success('Product successfully deleted.', {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to delete Product. Please try again.';
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

const DeleteProductReducer = createSlice({
	name: 'store/update-product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(deleteProduct.pending, (state, action) => {
				state.loading = true;
				state.error = '';
				state.idInState = action.meta.arg;
			})
			.addCase(deleteProduct.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.idInState = '';
			})
			.addCase(
				deleteProduct.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.idInState = '';
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default DeleteProductReducer.reducer;
