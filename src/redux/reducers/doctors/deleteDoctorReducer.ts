import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DELETE } from '@/utils/api.ts';

import { toast } from 'sonner';

type deleteDoctorState = {
	error: string;
	loading: boolean;
	idInState: string;
};

const initialState: deleteDoctorState = {
	error: '',
	loading: false,
	idInState: '',
};

export const deleteDoctor = createAsyncThunk<
	{ message: string },
	string,
	{ rejectValue: { error: string } }
>('doctors/delete-doctors-thunk', async (id, { rejectWithValue }) => {
	try {
		const response = await DELETE(`telemedicine/doctors/delete/${id}`);
		toast.success('Doctor successfully deleted.', {
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		});
		return response;
	} catch (error: any) {
		const errorMessage =
			error?.message || 'Failed to delete doctor. Please try again.';
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

const DeleteDoctorReducer = createSlice({
	name: 'doctors/delete-doctors-thunk',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(deleteDoctor.pending, (state, action) => {
				state.loading = true;
				state.error = '';
				state.idInState = action.meta.arg;
			})
			.addCase(deleteDoctor.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.idInState = '';
			})
			.addCase(
				deleteDoctor.rejected,
				(state, action: PayloadAction<{ error: string } | undefined>) => {
					state.loading = false;
					state.idInState = '';
					state.error = action.payload ? action.payload.error : 'Unknown error';
				}
			);
	},
});

export default DeleteDoctorReducer.reducer;
