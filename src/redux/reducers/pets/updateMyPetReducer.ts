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

export const updateMyPet = createAsyncThunk<
	any,
	{ petData: CreatePetPayload; id: string },
	{ rejectValue: { error: string } }
>('myPets/update', async ({ petData, id }, { rejectWithValue }) => {
	try {
		const response = await PUT(`pets/my-pets/${id}`, {
			body: petData,
		});
		toast.success('Pet details updated', {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to update your pet. Please try again.';
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

const UpdateMyPetReducer = createSlice({
	name: 'myPets/update',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateMyPet.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(updateMyPet.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(
				updateMyPet.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default UpdateMyPetReducer.reducer;
