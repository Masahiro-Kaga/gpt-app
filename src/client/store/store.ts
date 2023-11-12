import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Use local storage as the default storage engine.
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

import { userReducer, locationReducer, httpErrorReducer, optionReducer } from "./slice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userKey', 'locationKey', 'optionKey', 'httpErrorKey']
};

const rootReducer = combineReducers({
  userKey: userReducer,
  locationKey: locationReducer,
  httpErrorKey: httpErrorReducer,
  optionKey: optionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // Refer to : https://redux-toolkit.js.org/api/getDefaultMiddleware
  // Refer to: https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
    }
  }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
