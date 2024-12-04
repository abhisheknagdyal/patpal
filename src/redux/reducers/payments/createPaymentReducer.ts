import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { POST } from "@/utils/api.ts";

type PaymentState = {
  error: string;
  loading: boolean;
};

const initialState: PaymentState = {
  error: "",
  loading: false,
};

type SubscriptionUpdatePayload = {
  newSubscriptionModel: 1 | 2 | 3;
  redirectPath: string;
  term: "month" | "year";
};

export const createPayment = createAsyncThunk<
  any,
  {
    subscriptionRequest: SubscriptionUpdatePayload;
  },
  { rejectValue: { error: string } }
>("payments/create", async ({ subscriptionRequest }, { rejectWithValue }) => {
  try {
    const response = await POST("payments/subscriptions/create", {
      body: {
        subscription_model: subscriptionRequest.newSubscriptionModel,
        path: subscriptionRequest.redirectPath,
        term: subscriptionRequest.term,
      },
    });
    const { url } = response.session;
    window.location.replace(url);
  } catch (error: any) {
    const errorMessage =
      error.message || "Failed to create payment. Please try again.";
    return rejectWithValue({ error: errorMessage });
  }
});

const CreatePaymentReducer = createSlice({
  name: "payments/create",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createPayment.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(
        createPayment.rejected,
        (state, action: PayloadAction<{ error: string } | undefined>) => {
          state.loading = false;
          state.error = action.payload ? action.payload.error : "Unknown error";
        },
      );
  },
});

export default CreatePaymentReducer.reducer;
