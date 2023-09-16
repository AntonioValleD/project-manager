import { createSlice } from '@reduxjs/toolkit';

let initialState = {};

export const partOptionSlice = createSlice({
    name: 'partOptionSlice',
    initialState: initialState,
    reducers: {
        selectOption: (state, action) => {
            state[action.payload.ot] = action.payload.option;
        },
        unselectOption: (state, action) => {
            delete state[action.payload];
        },
    }
});

export const { selectOption, unselectOption } = partOptionSlice.actions;
export default partOptionSlice.reducer;