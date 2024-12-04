import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GET } from '@/utils/api.ts';

import { toast } from 'sonner';
import { Pet } from '@/utils/types.ts';

type ExtendedPet = Pet & { _id: string; owner_id: string };

type GetMyPetState = {
	error: string;
	loading: boolean;
	pet: ExtendedPet;
};

const initialState: GetMyPetState = {
	error: '',
	loading: false,
	pet: {
		name: '',
		breed: '',
		location: '',
		_id: '',
		owner_id: '',
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

export const getMyPetById = createAsyncThunk<
	ExtendedPet,
	string,
	{ rejectValue: { error: string } }
>('my-get-single/get-thunk', async (id, { rejectWithValue }) => {
	try {
		return await GET(`pets/my-pets/${id}`);
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to fetch your pet. Please try again.';
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

const FetchMySinglePetReducer = createSlice({
	name: 'my-pet-single/get',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMyPetById.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getMyPetById.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.pet = action.payload;
			})
			.addCase(
				getMyPetById.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default FetchMySinglePetReducer.reducer;
