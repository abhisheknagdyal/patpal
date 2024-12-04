import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POST } from '@/utils/api.ts';

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

export const createAdoption = createAsyncThunk<
	any,
	CreatePetPayload,
	{ rejectValue: { error: string } }
>('adoption/create', async (petData, { rejectWithValue }) => {
	try {
		const response = await POST('pets/adoption/create', {
			body: {
				...petData,
				photo_url: petData.photo_url[0]?.data,
			},
		});
		toast.success('Pet added for Adoption', {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to add pet for adoption. Please try again.';
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

const CreateAdoptionReducer = createSlice({
	name: 'adoption/create',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createAdoption.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(createAdoption.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(
				createAdoption.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default CreateAdoptionReducer.reducer;
