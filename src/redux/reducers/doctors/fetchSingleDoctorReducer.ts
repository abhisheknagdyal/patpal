import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GET } from '@/utils/api.ts';

import { toast } from 'sonner';
import { DoctorData } from '@/utils/types.ts';

type State = {
	error: string;
	loading: boolean;
	doctor: DoctorData;
};

const initialState: State = {
	error: '',
	loading: false,
	doctor: {
		_id: '',
		name: '',
		specialization: '',
		licenseNumber: '',
		contact: {
			phone: '',
			email: '',
		},
		clinicAddress: {
			street: '',
			city: '',
			state: '',
			postalCode: '',
			country: '',
		},
		experienceYears: 0,
		availability: {
			days: [],
			timeSlots: [],
		},
	},
};

export const getDoctorById = createAsyncThunk<
	DoctorData,
	string,
	{ rejectValue: { error: string } }
>('get-single-doctor/get-thunk', async (id, { rejectWithValue }) => {
	try {
		return await GET(`telemedicine/doctors/${id}`);
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to fetch Doctor details. Please try again.';
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

const FetchSingleDoctorReducer = createSlice({
	name: 'doctor-single/get',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getDoctorById.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getDoctorById.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.doctor = action.payload;
			})
			.addCase(
				getDoctorById.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default FetchSingleDoctorReducer.reducer;
