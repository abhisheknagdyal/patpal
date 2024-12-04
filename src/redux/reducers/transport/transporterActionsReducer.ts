import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PUT } from '@/utils/api';
import { Action } from '@/components/personnelRequestCard/requestCard.tsx';

type State = {
	error: string;
	loading: boolean;
	id: string;
	action: Action | '';
};

const initialState: State = {
	error: '',
	loading: false,
	id: '',
	action: '',
};

export const transporterAction = createAsyncThunk<
	any,
	{ action: Action; id: string },
	{ rejectValue: { error: string } }
>(
	'transport/transporter-action-thunk',
	async ({ action, id }, { rejectWithValue }) => {
		try {
			return await PUT(`transport/${action}/${id}`, {});
		} catch (error: any) {
			const errorMessage = error?.message || 'Failed to fetch transporters';
			return rejectWithValue({ error: errorMessage });
		}
	}
);

const TransporterActionsReducer = createSlice({
	name: 'transport/transporter-action',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(transporterAction.pending, (state, action) => {
				state.loading = true;
				state.error = '';
				state.id = action.meta.arg.id;
				state.action = action.meta.arg.action;
			})
			.addCase(transporterAction.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.id = '';
				state.action = '';
			})
			.addCase(transporterAction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default TransporterActionsReducer.reducer;
