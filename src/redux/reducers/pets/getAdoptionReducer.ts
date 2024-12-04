import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GET } from '@/utils/api.ts';

import { toast } from 'sonner';
import { Pet } from '@/utils/types.ts';

type GetPetState = {
	error: string;
	loading: boolean;
	pet: Pet & { _id?: string };
};

const initialState: GetPetState = {
	error: '',
	loading: false,
	pet: {
		name: '',
		breed: '',
		location: '',
		_id: '',
		species: '',
		good_with_children: false,
		good_with_pets: false,
		spayed_neutered: false,
		vaccinated: false,
		weight: 0,
		age: 0,
		description: '',
		medical_conditions: '',
		last_checkup_date: undefined,
		special_needs: '',
		gender: 'male',
		color: '',
		activity_level: 'high',
		size: 'small',
	},
};

export const getAdoptablePetById = createAsyncThunk<
	Pet,
	string,
	{ rejectValue: { error: string } }
>('adoption/get', async (id, { rejectWithValue }) => {
	try {
		return await GET(`pets/adoption/${id}`);
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to fetch adoptable pet. Please try again.';
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

const GetAdoptablePetByIdReducer = createSlice({
	name: 'adoption/get',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAdoptablePetById.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getAdoptablePetById.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.pet = action.payload;
			})
			.addCase(
				getAdoptablePetById.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default GetAdoptablePetByIdReducer.reducer;
