import querystring from 'query-string';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GET } from '@/utils/api.ts';

import { toast } from 'sonner';
import { Pet } from '@/utils/types.ts';

type ExtendedPet = Pet & { _id: string; adoption_status?: 'available' };

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

export const getAllPets = createAsyncThunk<
	{ count: number; results: ExtendedPet[] },
	{ skip: number; filters: any[] },
	{ rejectValue: { error: string } }
>('all-pets/get-thunk', async ({ skip, filters }, { rejectWithValue }) => {
	try {
		const query = querystring.stringify({
			skip,
			filters,
		});
		return await GET('pets/', { query });
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to fetch pets. Please try again.';
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

const FetchAllPetsReducer = createSlice({
	name: 'all-pets/get',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPets.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getAllPets.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.pets = action.payload;
			})
			.addCase(
				getAllPets.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default FetchAllPetsReducer.reducer;
