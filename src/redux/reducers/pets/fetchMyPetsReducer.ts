import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GET } from '@/utils/api.ts';

import { toast } from 'sonner';
import { Pet } from '@/utils/types.ts';

type ExtendedPet = Pet & { _id: string; adoption_status: 'available' };

type GetMyPetState = {
	error: string;
	loading: boolean;
	pets: {
		count: number;
		results: ExtendedPet[];
	};
};

const initialState: GetMyPetState = {
	error: '',
	loading: false,
	pets: {
		count: 0,
		results: [],
	},
};

export const getMyPets = createAsyncThunk<
	{ count: number; results: ExtendedPet[] },
	void,
	{ rejectValue: { error: string } }
>('my-pets/get-thunk', async (_, { rejectWithValue }) => {
	try {
		return await GET('pets/my-pets');
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to fetch your pets. Please try again.';
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

const FetchMyPetsReducer = createSlice({
	name: 'my-pets/get',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMyPets.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getMyPets.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.pets = action.payload;
			})
			.addCase(
				getMyPets.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default FetchMyPetsReducer.reducer;
