import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DELETE } from '@/utils/api.ts';

import { toast } from 'sonner';

type CreatePetState = {
	error: string;
	loading: boolean;
	idInState: string;
};

const initialState: CreatePetState = {
	error: '',
	loading: false,
	idInState: '',
};

export const deleteAdoption = createAsyncThunk<
	any,
	string,
	{ rejectValue: { error: string } }
>('adoption/delete-thunk', async (id, { rejectWithValue }) => {
	try {
		const response = await DELETE(`pets/adoption/delete/${id}`);
		toast.success('Adoption deleted', {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to delete adoption. Please try again.';
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

const EditAdoptionPetReducer = createSlice({
	name: 'adoption/delete',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(deleteAdoption.pending, (state, action) => {
				state.loading = true;
				state.error = '';
				state.idInState = action.meta.arg;
			})
			.addCase(deleteAdoption.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.idInState = '';
			})
			.addCase(
				deleteAdoption.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.idInState = '';
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default EditAdoptionPetReducer.reducer;
