import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    workOrder: [],
    materialRequest: [],
    rework: [],
    activityLog: [],
};

export const projectOptionSlice = createSlice({
    name: 'projectOptionSlice',
    initialState: initialState,
    reducers: {
        selectProjectOption: (state, action) => {
            const option = action.payload.option;
            const ot =  action.payload.ot;

            state[option].push(ot);
        },
        unselectProjectOption: (state, action) => {
            const option = action.payload.option;
            const ot =  action.payload.ot;

            state[option].splice(state[option].indexOf(ot), 1);
        },
    }
});

export const { selectProjectOption, unselectProjectOption } = projectOptionSlice.actions;
export default projectOptionSlice.reducer;