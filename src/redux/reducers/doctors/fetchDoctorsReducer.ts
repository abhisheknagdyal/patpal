import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { DoctorData } from '@/utils/types.ts';

type State = {
	error: string;
	loading: boolean;
	doctors: {
		count: number;
		results: DoctorData[];
	};
};

const initialState: State = {
	error: '',
	loading: false,
	doctors: {
		count: 0,
		results: [],
	},
};

export const getDoctors = createAsyncThunk<
	{ count: number; results: DoctorData[] },
	{ skip: number },
	{ rejectValue: { error: string } }
>('doctors/fetch-doctors-thunk', async ({ skip }, { rejectWithValue }) => {
	try {
		return await GET('telemedicine/doctors', {
			query: `skip=${skip}`,
		});
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to fetch boarders';
		return rejectWithValue({ error: errorMessage });
	}
});

const FetchDoctorsReducer = createSlice({
	name: 'doctors/fetch-doctors-thunk',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getDoctors.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getDoctors.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.doctors = action.payload;
			})
			.addCase(getDoctors.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.doctors = {
					count: 0,
					results: [],
				};
			});
	},
});

export default FetchDoctorsReducer.reducer;
