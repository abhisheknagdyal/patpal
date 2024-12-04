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

export const groomerAction = createAsyncThunk<
	any,
	{ action: Action; id: string },
	{ rejectValue: { error: string } }
>(
	'groomers/groomer-action-thunk',
	async ({ action, id }, { rejectWithValue }) => {
		try {
			return await PUT(`groomer/${action}/${id}`, {});
		} catch (error: any) {
			const errorMessage = error?.message || 'Failed to fetch groomers';
			return rejectWithValue({ error: errorMessage });
		}
	}
);

const GroomerActionsReducer = createSlice({
	name: 'groomer/groomer-action',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(groomerAction.pending, (state, action) => {
				state.loading = true;
				state.error = '';
				state.id = action.meta.arg.id;
				state.action = action.meta.arg.action;
			})
			.addCase(groomerAction.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.id = '';
				state.action = '';
			})
			.addCase(groomerAction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default GroomerActionsReducer.reducer;
