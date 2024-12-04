import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PUT } from '@/utils/api.ts';

import { PetSchema } from '@/utils/types.ts';
import { toast } from 'sonner';
import { z } from 'zod';

type CreatePetState = {
	error: string;
	loading: boolean;
};

const initialState: CreatePetState = {
	error: '',
	loading: false,
};

type CreatePetPayload = z.infer<typeof PetSchema>;

export const updateAdoption = createAsyncThunk<
	any,
	{
		petData: CreatePetPayload;
		id: string;
	},
	{ rejectValue: { error: string } }
>('adoption/update-thunk', async ({ petData, id }, { rejectWithValue }) => {
	try {
		const response = await PUT(`pets/adoption/update/${id}`, {
			body: {
				...petData,
				photo_url: petData.photo_url[0]?.data,
			},
		});
		toast.success('Adoption updated', {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to update adoption. Please try again.';
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
	name: 'adoption/update',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateAdoption.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(updateAdoption.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(
				updateAdoption.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default EditAdoptionPetReducer.reducer;
