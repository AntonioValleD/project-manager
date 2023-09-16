import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    '0001': [
        {
            id: '01',
            
        }
    ]
};

export const qualitySlice = createSlice({
    name: 'qualitySlice',
    initialState: initialState,
    reducers: {
        addPart: (state, action) => {
            console.log(action.payload);
        },
        editPart: (state, action) => {
            console.log(action.payload);
        },
        deletePart: (state, action) => {
            console.log(action.payload);
        }
    }
});

export const { addPart, editPart, deletePart } = qualitySlice.actions;
export default qualitySlice.reducer;