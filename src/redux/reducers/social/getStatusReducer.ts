import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';

type State = {
	error: string;
	loading: boolean;
	status?: {
		_id: string;
		username: string;
		details: {
			name: string;
			photo_url: string;
		};
	};
};

const initialState: State = {
	error: '',
	loading: false,
	status: undefined,
};

export const getStatus = createAsyncThunk<
	any,
	{ id: string },
	{ rejectValue: { error: string } }
>('social/get-status-thunk', async ({ id }, { rejectWithValue }) => {
	try {
		return await GET(`social/status/${id}`);
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to fetch orders';
		return rejectWithValue({ error: errorMessage });
	}
});

const GetStatusReducer = createSlice({
	name: 'social/get-status',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getStatus.pending, (state) => {
				state.loading = true;
				state.error = '';
				state.status = undefined;
			})
			.addCase(getStatus.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.status = action.payload;
			})
			.addCase(getStatus.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.status = undefined;
			});
	},
});

export default GetStatusReducer.reducer;
