import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

import { GET } from "@/utils/api";
import { updateSession } from "@/utils/auth/session.ts";
import { configUpdate } from "@/redux/reducers/auth/loginReducer.ts";

const initialState = {
  error: '',
  loading: false,
  configUpdated: false,
};

export const getConfig = createAsyncThunk("config", async (_, { dispatch }) => {
  try {
    const token = await GET("auth/config");
    if (token) {
      const newModel =
        (jwtDecode(token) as { subscription_model: string; }).subscription_model;
      updateSession(token, newModel);
      dispatch(configUpdate(newModel));
    }
    return token;
  } catch {
    return;
  }
});

const ConfigReducer = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfig.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getConfig.fulfilled, (state) => {
        state.loading = false;
        state.error = "";
        state.configUpdated = true;
      })
      .addCase(
        getConfig.rejected,
        (state) => {
          state.loading = false;
          state.error = "Unable to fetch config";
          state.configUpdated = true;
        },
      );
  },
});

export default ConfigReducer.reducer;
