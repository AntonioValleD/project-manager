import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    projects: true,
    production: false,
};

export const selectedWindowSlice = createSlice({
  name: "selectedWindow",
  initialState: initialState,
  reducers: {
    changeSelectedWindow: (state, action) => {
      const userWindow = action.payload;

      for (let window in state){
        if (state[window]){
          state[window] = false;
        }
      }

      state[userWindow] = true;
    },
  },
});

export const { changeSelectedWindow } = selectedWindowSlice.actions;
export default selectedWindowSlice.reducer;
