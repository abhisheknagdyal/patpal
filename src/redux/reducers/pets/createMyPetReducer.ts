import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POST } from '@/utils/api.ts';

import { PetSchema } from '@/utils/types.ts';
import { toast } from 'sonner';
import { z } from 'zod';

type CreatePetState = {
	error: string;
	loading: boolean;
	isAdded: boolean;
};

const initialState: CreatePetState = {
	error: '',
	loading: false,
	isAdded: false,
};

type CreatePetPayload = z.infer<typeof PetSchema>;

export const createMyPet = createAsyncThunk<
	any,
	CreatePetPayload,
	{ rejectValue: { error: string } }
>('myPets/create', async (petData, { rejectWithValue }) => {
	try {
		const response = await POST('pets/my-pets/', {
			body: petData,
		});
		toast.success('pet added', {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to add your pet. Please try again.';
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

const CreateMyPetReducer = createSlice({
	name: 'myPets/create',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createMyPet.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(createMyPet.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.isAdded = true;
			})
			.addCase(
				createMyPet.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
					state.isAdded = false;
				}
			);
	},
});

export default CreateMyPetReducer.reducer;
