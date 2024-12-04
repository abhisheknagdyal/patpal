import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POST } from '@/utils/api.ts';

import { DoctorSchema } from '@/utils/types.ts';
import { toast } from 'sonner';
import { z } from 'zod';
import { extractTimeFromDateString } from '@/utils/time.ts';

type CreateDoctorState = {
	error: string;
	loading: boolean;
};

const initialState: CreateDoctorState = {
	error: '',
	loading: false,
};

type CreateDoctorPayload = z.infer<typeof DoctorSchema>;

export const createDoctor = createAsyncThunk<
	any,
	CreateDoctorPayload,
	{ rejectValue: { error: string } }
>(
	'telemedicine/create-doctor-thunk',
	async (doctorData, { rejectWithValue }) => {
		try {
			const from = extractTimeFromDateString(
				doctorData.availability.timeSlots.from
			);
			const to = extractTimeFromDateString(
				doctorData.availability.timeSlots.to
			);
			const timeValue = [
				Number(from.replace(':', '')),
				Number(to.replace(':', '')),
			];
			const newBody = {
				...doctorData,
				profilePicture: doctorData.profilePicture?.[0]?.data,
				availability: {
					...doctorData.availability,
					timeSlots: timeValue,
				},
			};
			const response = await POST('telemedicine/doctors/create', {
				body: newBody,
			});
			toast.success('Doctor successfully added.', {
				action: {
					label: 'Ok',
					onClick: () => null,
				},
			});
			return response;
		} catch (error: any) {
			const errorMessage =
				error?.message || 'Failed to add Doctor. Please try again.';
			toast.error('Unexpected error occurred', {
				description: errorMessage,
				action: {
					label: 'Ok',
					onClick: () => null,
				},
			});
			return rejectWithValue({ error: errorMessage });
		}
	}
);

const CreateDoctorReducer = createSlice({
	name: 'telemedicine/create-doctor',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createDoctor.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(createDoctor.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(
				createDoctor.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default CreateDoctorReducer.reducer;
