import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PUT } from "@/utils/api.ts";

import { toast } from "sonner";
import { NavigateFunction } from "react-router-dom";
import { ROUTES } from "@/constants/routes.ts";

type PutForAdoptionState = {
  error: string;
  loading: boolean;
};

const initialState: PutForAdoptionState = {
  error: "",
  loading: false,
};

export const listForAdoption = createAsyncThunk<
  any,
  {
    id: string;
    navigate: NavigateFunction;
  },
  { rejectValue: { error: string } }
>("my-pet/adoption", async ({ id, navigate }, { rejectWithValue }) => {
  try {
    const response = await PUT(`pets/adoption/abandon/${id}`);
    toast.success("Pet Listed for Adoption!", {
      description:
        "Your pet is now listed for adoption. Thank you for helping them find a new home!",
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
      "Failed to list your pet for adoption. Please try again.";
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

const PutPetForAdoptionReducer = createSlice({
  name: "my-pet/adoption",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listForAdoption.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(listForAdoption.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(
        listForAdoption.rejected,
        (state, action: PayloadAction<{ error: string } | undefined>) => {
          state.loading = false;
          state.error = action.payload ? action.payload.error : "Unknown error";
        },
      );
  },
});

export default PutPetForAdoptionReducer.reducer;
