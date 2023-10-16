import axios from "axios";

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { APIGeneralResponseType } from "../axiosConfig";

const userInitialState = {
  username: "",
  isSessionActive: false,
};

export const fetchLatestSessionData = createAsyncThunk(
  "user/fetchLatestSessionData",
  async (): Promise<APIGeneralResponseType> => {
    try {
      const response: APIGeneralResponseType = await axios.get(
        "/api/user/check-session"
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: userInitialState,
  reducers: {
    fetchSession: (state, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username;
      state.isSessionActive = true;
    },
    deleteSession: (state) => {
      state.username = "";
      state.isSessionActive = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLatestSessionData.fulfilled, (state, action) => {
      if (action.payload.pass) {
        state.isSessionActive = true;
        state.username = action.payload.data;
      }
    });
    builder.addCase(fetchLatestSessionData.rejected, (state, action) => {
      console.error(action);
      state.isSessionActive = false;
    });
  },
});

const optionInitialState = {
  headerHeight: 0,
};

const optionSlice = createSlice({
  name: "optionSlice",
  initialState: optionInitialState,
  reducers: {
    getHeaderHeight: (
      state,
      action: PayloadAction<{ headerHeight: number }>
    ) => {
      state.headerHeight = action.payload.headerHeight;
    },
  },
});

export const { fetchSession, deleteSession } = userSlice.actions;
export const { getHeaderHeight } = optionSlice.actions;

export const userReducer = userSlice.reducer;
export const optionReducer = optionSlice.reducer;