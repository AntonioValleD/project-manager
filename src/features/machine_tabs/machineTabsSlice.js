import { createSlice } from '@reduxjs/toolkit';

let initialState = [];

export const machineTabSlice = createSlice({
    name: 'machineTabs',
    initialState: initialState,
    reducers: {
        addMachineTab: (state, action) => {
            let newTab = {
                id: action.payload,
                selected: true
            };
            if (state.length === 0){
                state.push(newTab); 
            } else {
                const foundTab = state.find(machine => machine.id === action.payload);
                const selectedTab = state.find(machine => machine.selected === true);
                if (selectedTab){
                    selectedTab.selected = false;
                }
                if (foundTab){
                    foundTab.selected = true;
                } else {
                    state.push(newTab); 
                }
            }
        },
        editMachineTab: (state, action) => {
            const foundTab = state.find(machine => machine.id === action.payload);
            const selectedTab = state.find(machine => machine.selected === true);
            if (selectedTab){
                selectedTab.selected = false;
            }
            foundTab.selected = true;
        },
        unselectMachineTab: (state, action) => {
            const selectedMachine = state.find(machine => machine.selected === true);
            if (selectedMachine){
                selectedMachine.selected =false;
            }  
        },
        deleteMachineTab: (state, action) => {
            state.splice(state.indexOf(state.find(machineTab => machineTab.id === action.payload)), 1);
        }
    }
});

export const { addMachineTab, editMachineTab, unselectMachineTab, deleteMachineTab } = machineTabSlice.actions;
export default machineTabSlice.reducer;