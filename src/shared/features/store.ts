import { configureStore } from "@reduxjs/toolkit";
import { apiSlice, apiReducer } from "./api";
import stepReducer from "./subscription/stepsSlice";

export const store = configureStore({
  reducer: {
    steps: stepReducer,
    [apiSlice.reducerPath]: apiReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware);
  },
});
