import { createSlice } from '@reduxjs/toolkit';

let initialState = [];

export const selectedPartSlice = createSlice({
    name: 'selectedPart',
    initialState: initialState,
    reducers: {
        addSelectedPart: (state, action) => {
            let newPart = {
                ot: action.payload.ot, 
                partId: action.payload.id 
            };
            state.push(newPart);
        },
        deleteSelectedPart: (state, action) => {
            state.splice(state.indexOf(state.find(part => part.ot === action.payload)), 1);
        },
        updateSelectedPart: (state, action) => {
            const part = state.find(part => part.ot === action.payload.ot);
            if (part){
                part.partId = action.payload.id;
            }
        }
    }
});

export const { addSelectedPart, deleteSelectedPart, updateSelectedPart } = selectedPartSlice.actions;
export default selectedPartSlice.reducer;