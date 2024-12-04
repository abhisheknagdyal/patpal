import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api.ts';

import { toast } from 'sonner';

type GetPetState = {
	error: string;
	loading: boolean;
	filters: {
		filters: string[];
	};
};

const initialState: GetPetState = {
	error: '',
	loading: false,
	filters: {
		filters: [],
	},
};

export const getFilters = createAsyncThunk<
	{ filters: string[] },
	void,
	{ rejectValue: { error: string } }
>('filters/get-thunk', async (_, { rejectWithValue }) => {
	try {
		return await GET(`pets/filters`);
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to fetch filters. Please try again.';
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

const GetFiltersReducer = createSlice({
	name: 'filters/get',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getFilters.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getFilters.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.filters = action.payload;
			})
			.addCase(getFilters.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default GetFiltersReducer.reducer;
