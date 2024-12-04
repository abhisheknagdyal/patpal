import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PUT } from '@/utils/api';
import { Action } from '@/components/personnelRequestCard/requestCard.tsx';
import { toast } from 'sonner';

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

export const boarderAction = createAsyncThunk<
	any,
	{ action: Action; id: string; hasMonitoring?: boolean; body?: any },
	{ rejectValue: { error: string } }
>(
	'boarders/boarder-action-thunk',
	async (
		{ action, id, hasMonitoring = false, body = {} },
		{ rejectWithValue }
	) => {
		try {
			const response = hasMonitoring
				? await PUT(`boarding/v2/${action}`, {
						body,
					})
				: await PUT(`boarding/v1/${action}/${id}`, {});
			toast.success(`Action executed - ${action} session`, {
				action: {
					label: 'Ok',
					onClick: () => null,
				},
			});
			return response;
		} catch (error: any) {
			const errorMessage = error?.message || 'Unknown error';
			toast.error(`Failed to ${action} session. Try again later`, {
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

const BoarderActionsReducer = createSlice({
	name: 'boarder/boarder-action',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(boarderAction.pending, (state, action) => {
				state.loading = true;
				state.error = '';
				state.id = action.meta.arg.id;
				state.action = action.meta.arg.action;
			})
			.addCase(boarderAction.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
				state.id = '';
				state.action = '';
			})
			.addCase(boarderAction.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default BoarderActionsReducer.reducer;
