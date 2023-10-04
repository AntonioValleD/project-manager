import { createSlice } from '@reduxjs/toolkit';

let initialState = [];

export const projectTabSlice = createSlice({
    name: 'projectTab',
    initialState: initialState,
    reducers: {
        addProjectTab: (state, action) => {
            let newTab = {
                id: action.payload,
                selected: true
            }
            
            if (state.length === 0){
                state.push(newTab);
            } else {
                const foundTab = state.find(project => project.id === action.payload);
                const selectedTab = state.find(project => project.selected === true);
                if (selectedTab){
                    selectedTab.selected = false;
                    foundTab.selected = true;
                } else {
                    if (foundTab){
                        foundTab.selected = true;
                    } else {
                        state.push(newTab);
                    }
                }
            }
        },
        updateProjectTab: (state, action) => {
            const selectedTab = state.find(tab => tab.selected === true);
            if (selectedTab){
                selectedTab.id = action.payload;
            }
        },
        editSelectedTab: (state, action) => {
            const foundTab = state.find(project => project.id === action.payload);
            const selectedTab = state.find(project => project.selected === true);
            if (selectedTab){
                selectedTab.selected = false;
            }
            foundTab.selected = true;
        },
        unselectProjectTab: (state, action) => {
            const selectedTab = state.find(tab => tab.selected === true);
            if (selectedTab){
                selectedTab.selected = false;
            }
        },
        deleteProjectTab: (state, action) => {
            state.splice(state.indexOf(state.find(projectTab => projectTab.id === action.payload)), 1);
        }
    }
});

export const { addProjectTab, editSelectedTab, unselectProjectTab, deleteProjectTab, updateProjectTab } = projectTabSlice.actions;
export default projectTabSlice.reducer;