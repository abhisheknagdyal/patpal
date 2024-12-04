import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PUT } from "@/utils/api.ts";

import { toast } from "sonner";
import { NavigateFunction } from "react-router-dom";
import { ROUTES } from "@/constants/routes.ts";

type CancelAdoptionState = {
  error: string;
  loading: boolean;
};

const initialState: CancelAdoptionState = {
  error: "",
  loading: false,
};

export const cancelAdoption = createAsyncThunk<
  any,
  {
    id: string;
    navigate: NavigateFunction;
  },
  { rejectValue: { error: string } }
>("adoption/cancel", async ({ id, navigate }, { rejectWithValue }) => {
  try {
    const response = await PUT(`pets/adoption/cancel/${id}`);
    toast.success("Adoption listing canceled!", {
      description:
        "Your pet is no longer listed for adoption and is back in your care.",
      action: {
        label: "Ok",
        onClick: () => null,
      },
    });

    navigate(ROUTES.MY_PETS.index, { replace: true });
    return response;
  } catch (error: any) {
    const errorMessage =
      error?.message ||
      "Couldn't cancel the adoption listing. Please try again or contact support if the issue persists.";
    toast.error("Unexpected error occurred", {
      description: errorMessage,
      action: {
        label: "Ok",
        onClick: () => null,
      },
    });
    return rejectWithValue({ error: errorMessage });
  }
});

const CancelAdoptionReducer = createSlice({
  name: "adoption/cancel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cancelAdoption.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(cancelAdoption.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(
        cancelAdoption.rejected,
        (state, action: PayloadAction<{ error: string } | undefined>) => {
          state.loading = false;
          state.error = action.payload ? action.payload.error : "Unknown error";
        },
      );
  },
});

export default CancelAdoptionReducer.reducer;
