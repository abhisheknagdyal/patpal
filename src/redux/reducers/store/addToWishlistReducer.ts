import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { POST } from '@/utils/api';
import { toast } from 'sonner';

type State = {
	error: string;
	loading: boolean;
	idInState: string;
};

const initialState: State = {
	error: '',
	loading: false,
	idInState: '',
};

const message = {
	add: (name: string) => `${name} added to wishlist!`,
	remove: (name: string) => `${name} removed from wishlist!`,
};

export const addToWishlist = createAsyncThunk<
	any,
	{ body: { productId: string }; name: string; action: 'add' | 'remove' },
	{ rejectValue: { error: string } }
>('wishlist-thunk', async ({ body, name, action }, { rejectWithValue }) => {
	try {
		const response = await POST(`shop/wishlist`, { body });
		toast.success(message[action](name), {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || `Failed to ${action} ${name} from wishlist.`;
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

const AddToWishlistReducer = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addToWishlist.pending, (state, action) => {
				state.loading = true;
				state.error = '';
				state.idInState = action.meta.arg.body.productId;
			})
			.addCase(addToWishlist.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.idInState = '';
			})
			.addCase(addToWishlist.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default AddToWishlistReducer.reducer;
