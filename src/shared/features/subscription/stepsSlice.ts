import { createSlice } from "@reduxjs/toolkit";
import { StepsState, SubscribeData } from "shared/interfaces";

const INITIAL_STATE: StepsState = {
  next: 1,
  previous: 0,
  current: 0,
  data: {} as SubscribeData,
};

export const stepsSlice = createSlice({
  name: "steps",
  initialState: INITIAL_STATE,
  reducers: {
    nextStep: (state) => {
      state.next++;
      state.previous++;
      state.current++;
    },
    previousStep: (state) => {
      state.next--;
      state.previous--;
      state.current--;
    },
    changeData: (state, { payload }) => {
      state.data = { ...state.data, ...payload };
    },
  },
});

export const { nextStep, previousStep, changeData } = stepsSlice.actions;
export default stepsSlice.reducer;

export const useSteps = (state: any) => {
  return state.steps as StepsState;
};
