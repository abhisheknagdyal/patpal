import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api';

export type MessageContent = {
	_id: string;
	senderId: string;
	receiverId: string;
	message: string;
	createdAt: Date;
	updatedAt: Date;
};

type State = {
	error: string;
	loading: boolean;
	loaded: boolean;
	messages: MessageContent[];
};

const initialState: State = {
	error: '',
	loading: false,
	loaded: false,
	messages: [],
};

export const getMessagesById = createAsyncThunk<
	MessageContent[],
	{ id: string },
	{ rejectValue: { error: string } }
>('social/get-messages-thunk', async ({ id }, { rejectWithValue }) => {
	try {
		return await GET(`social/messages/${id}`);
	} catch (error: any) {
		const errorMessage = error?.message || 'Failed to fetch orders';
		return rejectWithValue({ error: errorMessage });
	}
});

const GetMessagesReducer = createSlice({
	name: 'social/get-messages',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMessagesById.pending, (state) => {
				state.loading = true;
				state.error = '';
			})
			.addCase(getMessagesById.fulfilled, (state, action) => {
				state.loading = false;
				state.error = '';
				state.loaded = true;
				state.messages = action.payload;
			})
			.addCase(getMessagesById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
				state.messages = [];
				state.loaded = true;
			});
	},
});

export default GetMessagesReducer.reducer;
