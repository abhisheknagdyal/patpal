import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GET } from '@/utils/api.ts';
import { toast } from 'sonner';

type State = {
	error: string;
	loading: boolean;
	idInState: string;
};

const initialState: State = {
	error: '',
	loading: false,
	idInState: '',
};

export const fetchInvoiceFromOrder = createAsyncThunk<
	{ hosted_invoice_url: string; invoice_pdf: string },
	{ invoiceID: string },
	{ rejectValue: { error: string } }
>('payments/fetch-invoice', async ({ invoiceID }, { rejectWithValue }) => {
	try {
		const response = await GET(`payments/orders/invoice/${invoiceID}`);
		const { hosted_invoice_url } = response;
		window.open(hosted_invoice_url, '_blank');
		return response;
	} catch (error: any) {
		const errorMessage =
			error.message || 'Failed to fetch invoice. Please try again.';
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

const FetchInvoiceOrderReducer = createSlice({
	name: 'payments/fetch-invoice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInvoiceFromOrder.pending, (state, action) => {
				state.loading = true;
				state.error = '';
				state.idInState = action.meta.arg.invoiceID;
			})
			.addCase(fetchInvoiceFromOrder.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(fetchInvoiceFromOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.error : 'Unknown error';
			});
	},
});

export default FetchInvoiceOrderReducer.reducer;
