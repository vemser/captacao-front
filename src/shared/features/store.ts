import { configureStore } from "@reduxjs/toolkit";
import stepReducer from "./subscription/stepsSlice";

export const store = configureStore({
  reducer: {
    steps: stepReducer,
  },
});
