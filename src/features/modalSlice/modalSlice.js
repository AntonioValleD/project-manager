import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    newProject: false,
    deleteProject: false,
    noProjectSelected: false,
    projectAlreadyExists: false,
    deletePart: false,
    newPart: false,
    noPartSelected: false,
    newProcess: false,
    deleteProcess: false,
    editProcess: false,
    noProcessSelected: false,
    noProductionPartSelected: false, 
    deleteProductionPart: false, 
    newproductionPart: false,
    startMachining: false,
    stopMachining: false,
    startProduction: false,
    stopProduction: false,
    finishParts: false,
    addMeasure: false,
    updateMeasure: false,
    addRealMeasure: false,
    requestMaterial: false,
    warehouseConfirmation: false,
    setUpQualityInspection: false,
    updateInspectionSettings: false,
    newMachine: false,
    editMachineInfo: false,
    userInfo: false,
    confirmationModal: false,
}

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState: initialState,
    reducers: {
        changeModalStatus: (state, action) => {
            let modalName = action.payload.modalName;
            let modalStatus = action.payload.modalStatus
            state[modalName] = modalStatus
        },
    }
})

export const { changeModalStatus } = modalSlice.actions;
export default modalSlice.reducer;