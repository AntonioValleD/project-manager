import { createSlice } from '@reduxjs/toolkit';

let initialState = {};

export const timerSlice = createSlice({
    name: 'timerSlice',
    initialState: initialState,
    reducers: {
        addMachineTimer: (state, action) => {
            state[action.payload.machine] = true;
        },
        stopMachineTimer: (state, action) => {
            state[action.payload.machine] = false;
        }
    }
});

export const { addMachineTimer, stopMachineTimer } = timerSlice.actions;
export default timerSlice.reducer;