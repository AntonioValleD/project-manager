import { createSlice } from '@reduxjs/toolkit';

let initialState = {selected: ''};

export const selectedProjectSlice = createSlice({
    name: 'selectedProjectSlice',
    initialState: initialState,
    reducers: {
        updateSelectedProject: (state, action) => {
            state.selected = action.payload;
        },
    }
});

export const { updateSelectedProject } = selectedProjectSlice.actions;
export default selectedProjectSlice.reducer;