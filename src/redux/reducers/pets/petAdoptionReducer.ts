import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PUT } from "@/utils/api.ts";

import { toast } from "sonner";
import { NavigateFunction } from "react-router-dom";
import { ROUTES } from "@/constants/routes.ts";

type AdoptPetState = {
  error: string;
  loading: boolean;
};

const initialState: AdoptPetState = {
  error: "",
  loading: false,
};

export const adoptPet = createAsyncThunk<
  any,
  { id: string; navigate: NavigateFunction },
  { rejectValue: { error: string } }
>("adoption/put", async ({ id, navigate }, { rejectWithValue }) => {
  try {
    const response = await PUT(`pets/adoption/adopt/${id}`);
    navigate(ROUTES.ADOPTION.index);
    toast.success("Adoption successful!", {
      description: "Thank you for giving this pet a new home!",
      action: {
        label: "Ok",
        onClick: () => null,
      },
    });
    return response;
  } catch (error: any) {
    const errorMessage = error?.message || "Failed to adopt. Please try again.";
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

const PetAdoptionReducer = createSlice({
  name: "adoption/put",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adoptPet.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(adoptPet.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(
        adoptPet.rejected,
        (state, action: PayloadAction<{ error: string } | undefined>) => {
          state.loading = false;
          state.error = action.payload ? action.payload.error : "Unknown error";
        },
      );
  },
});

export default PetAdoptionReducer.reducer;
