import { configureStore } from "@reduxjs/toolkit";
import { userReducer, optionReducer } from "./slice";

const store = configureStore({
  reducer: {
    userKey: userReducer,
    optionKey: optionReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
