import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';
import { SubscriptionLevel } from '@/utils/types.ts';

type Session = {
	requestId: string;
	sessionURL: string;
	userId: string;
	userSubscriptionModel: SubscriptionLevel;
};

type State = {
	error: string;
	loading: boolean;
	session?: Session;
};

const initialState: State = {
	error: '',
	loading: false,
	session: undefined,
};

export const getMonitoringSession = createAsyncThunk<
	any,
	{ id: string },
	{ rejectValue: { error: string } }
>(
	'boarders/get-monitoring-session-thunk',
	async ({ id }, { rejectWithValue }) => {
		try {
			return await GET(`boarding/v2/live/${id}`);
		} catch (error: any) {
			const errorMessage = error?.message || 'Failed to fetch session';
			return rejectWithValue({ error: errorMessage });
		}
	}
);

const MonitoringReducer = createSlice({
	name: 'boarders/get-monitoring-session-thunk',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMonitoringSession.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getMonitoringSession.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.session = action.payload;
			})
			.addCase(getMonitoringSession.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.session = undefined;
			});
	},
});

export default MonitoringReducer.reducer;
