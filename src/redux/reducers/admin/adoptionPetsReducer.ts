import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';

const initialState = {
	error: '',
	loading: false,
	adoptions: {
		count: 0,
		results: [],
	},
};

export const getAdoptionPets = createAsyncThunk<any, { skip: number }>(
	'admin/adoption-pets-thunk',
	async ({ skip }) => {
		try {
			return await GET('pets/adoption', {
				query: `skip=${skip}`,
			});
		} catch {
			return;
		}
	}
);

const AdoptionPetsReducer = createSlice({
	name: 'admin/adoption-pets',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAdoptionPets.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getAdoptionPets.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.adoptions = action.payload;
			})
			.addCase(getAdoptionPets.rejected, (state) => {
				state.loading = false;
				state.error = 'Unable to fetch Users';
				state.adoptions = {
					count: 0,
					results: [],
				};
			});
	},
});

export default AdoptionPetsReducer.reducer;
