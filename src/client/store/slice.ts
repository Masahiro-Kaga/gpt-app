import axios from "axios";

import { createSlice, PayloadAction, createAsyncThunk, AsyncThunkAction, AsyncThunk } from "@reduxjs/toolkit";

import { APIGeneralResponseType } from "../axiosConfig";

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

// Define the type of the thunk inside the slice.
export type FetchLatestSessionData = AsyncThunkAction<APIGeneralResponseType, void, {}>;

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    username: "",
    isSessionActive: false,
  },
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

const locationSlice = createSlice({
  name: "locationSlice",
  initialState: {
    location: "",
  },
  reducers: {
    setCurrentPath: (state, action: PayloadAction<{ location: string }>) => {
      state.location = action.payload.location;
    },
  },
});

const httpErrorSlice = createSlice({
  name: "httpErrorSlice",
  initialState: { httpError: ""},
  reducers: {
    setHttpError: (state, action: PayloadAction<{ httpError: string }>) => {
      state.httpError = action.payload.httpError;
    },
  },
})

const optionSlice = createSlice({
  name: "optionSlice",
  initialState: {
    headerHeight: 0,
  },
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
export const { setCurrentPath } = locationSlice.actions;
export const { setHttpError } = httpErrorSlice.actions;
export const { getHeaderHeight } = optionSlice.actions;

export const userReducer = userSlice.reducer;
export const locationReducer = locationSlice.reducer;
export const httpErrorReducer = httpErrorSlice.reducer;
export const optionReducer = optionSlice.reducer;