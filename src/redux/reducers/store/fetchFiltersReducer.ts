import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';

type Filters = {
	categories: string[];
	petType: string[];
};
type State = {
	error: string;
	loading: boolean;
	filters: Filters;
};

const initialState: State = {
	error: '',
	loading: false,
	filters: {
		categories: [],
		petType: [],
	},
};

export const getFilters = createAsyncThunk<
	Filters,
	void,
	{ rejectValue: { error: string } }
>('store/fetch-filters-thunk', async (_, { rejectWithValue }) => {
	try {
		return await GET('shop/products/filters');
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to fetch boarders';
		return rejectWithValue({ error: errorMessage });
	}
});

const FetchFiltersReducer = createSlice({
	name: 'store/fetch-filters',
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
				state.filters = {
					categories: [],
					petType: [],
				};
			});
	},
});

export default FetchFiltersReducer.reducer;
