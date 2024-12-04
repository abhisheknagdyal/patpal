import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POST } from '@/utils/api.ts';

import { ProductSchema } from '@/utils/types.ts';
import { toast } from 'sonner';
import { z } from 'zod';

type CreateProductState = {
	error: string;
	loading: boolean;
};

const initialState: CreateProductState = {
	error: '',
	loading: false,
};

type CreateProductPayload = z.infer<typeof ProductSchema>;

export const createProduct = createAsyncThunk<
	any,
	CreateProductPayload,
	{ rejectValue: { error: string } }
>('store/create-product-thunk', async (productData, { rejectWithValue }) => {
	try {
		const newBody = {
			...productData,
			images: productData.images?.map((image: { data: string }) => image.data),
		};
		const response = await POST('shop/products', {
			body: newBody,
		});
		toast.success('Product successfully added.', {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to add Product. Please try again.';
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

const CreateMyProductReducer = createSlice({
	name: 'store/create-product',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createProduct.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(createProduct.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(
				createProduct.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default CreateMyProductReducer.reducer;
