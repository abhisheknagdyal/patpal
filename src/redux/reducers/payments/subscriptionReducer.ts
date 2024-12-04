import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET } from "@/utils/api.ts";

type SubscriptionDetails = {
  priceMonthly: number;
  priceYearly: number;
  name: string;
  fieldId: string;
};

type Subscription = [number, SubscriptionDetails];

type SubscriptionResponse = {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
}[];

type SubscriptionState = {
  loading: boolean;
  error: string;
  models: SubscriptionResponse;
};

const initialState: SubscriptionState = {
  loading: false,
  error: "",
  models: [],
};

export const getSubscriptions = createAsyncThunk<
  SubscriptionResponse,
  void,
  { rejectValue: { error: string } }
>("subscriptions/get", async (_, { rejectWithValue }) => {
  try {
    const response = await GET("payments/subscriptions");
    return response?.models?.map((model: Subscription) => ({
      id: model[1].fieldId,
      name: model[1].name,
      priceMonthly: model[1].priceMonthly,
      priceYearly: model[1].priceYearly,
    }));
  } catch (error: any) {
    const errorMessage =
      error?.message || "Failed to get Subscriptions. Please try again.";
    return rejectWithValue({ error: errorMessage });
  }
});

const SubscriptionReducer = createSlice({
  name: "subscriptions/get",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.models = action.payload;
      })
      .addCase(getSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.error : "Unknown error";
      });
  },
});

export default SubscriptionReducer.reducer;
