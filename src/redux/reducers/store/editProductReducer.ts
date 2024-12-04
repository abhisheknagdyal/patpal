import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PUT } from '@/utils/api.ts';

import { ProductSchema } from '@/utils/types.ts';
import { toast } from 'sonner';
import { z } from 'zod';
import { omit } from '@/utils/lodash.ts';

type updateProductState = {
	error: string;
	loading: boolean;
};

const initialState: updateProductState = {
	error: '',
	loading: false,
};

type updateProductPayload = z.infer<typeof ProductSchema>;

export const updateProduct = createAsyncThunk<
	{ message: string },
	{ body: updateProductPayload; id: string },
	{ rejectValue: { error: string } }
>('store/update-product-thunk', async ({ body, id }, { rejectWithValue }) => {
	try {
		const newBody = {
			...omit<object>(body, ['images']),
			...(body.images?.length
				? { images: body.images?.map((image: { data: string }) => image.data) }
				: {}),
		};
		const response = await PUT(`shop/products/${id}`, {
			body: newBody,
		});
		toast.success('Product successfully updated.', {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to update Product. Please try again.';
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

const UpdateProductReducer = createSlice({
	name: 'store/update-product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateProduct.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(updateProduct.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(
				updateProduct.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default UpdateProductReducer.reducer;
