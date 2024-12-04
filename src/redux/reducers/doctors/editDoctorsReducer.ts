import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PUT } from '@/utils/api.ts';

import { DoctorSchema } from '@/utils/types.ts';
import { toast } from 'sonner';
import { z } from 'zod';
import { extractTimeFromDateString } from '@/utils/time.ts';

type updateDoctorState = {
	error: string;
	loading: boolean;
};

const initialState: updateDoctorState = {
	error: '',
	loading: false,
};

type updateDoctorPayload = z.infer<typeof DoctorSchema>;

export const updateDoctor = createAsyncThunk<
	{ message: string },
	{ body: updateDoctorPayload; id: string },
	{ rejectValue: { error: string } }
>('doctors/edit-doctors-thunk', async ({ body, id }, { rejectWithValue }) => {
	const from = extractTimeFromDateString(body.availability.timeSlots.from);
	const to = extractTimeFromDateString(body.availability.timeSlots.to);
	const timeValue = [
		Number(from.replace(':', '')),
		Number(to.replace(':', '')),
	];
	try {
		const newBody = {
			...body,
			availability: {
				...body.availability,
				timeSlots: timeValue,
			},
			profilePicture: body.profilePicture?.[0]?.data,
		};
		const response = await PUT(`telemedicine/doctors/update/${id}`, {
			body: newBody,
		});
		toast.success('Doctor successfully updated.', {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to update doctor. Please try again.';
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

const EditDoctorsReducer = createSlice({
	name: 'doctors/edit-doctors',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateDoctor.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(updateDoctor.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(
				updateDoctor.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default EditDoctorsReducer.reducer;
