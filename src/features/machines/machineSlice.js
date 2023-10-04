import { createSlice } from '@reduxjs/toolkit'
 

let initialState = [
    {
        operator: 'Jose Luis Ramirez Esparza',
        name: 'Máquina 1',
        type: 'Fresadora CNC',
        operation: {
            running: false,
            pause: false,
            pause: false,
            startTime: '',
            pauseTime: '',
            restartTime: '',
            finishTime: '',
            deathTime: 0,
            totalParts: '0',
        },
    },
]

export const machineSlice = createSlice({
    name: 'machines',
    initialState: initialState,
    reducers: {
        addMachine: (state, action) => {
            console.log(action.payload);
        },
        editMachine: (state, action) => {
            console.log(action.payload);
        },
        deleteMachine: (state, action) => {
            console.log(action.payload);
        },
        startProductionMachine: (state, action) => {
            let machineName = action.payload.machine;
            const machine = state.find(machine => machine.name === machineName).operation;
            if (machine){
                machine.running = true;
                machine.pause = true;
                machine.startTime = Date.now();
                machine.pauseTime = Date.now();
            }
        },
        pauseProductionMachine: (state, action) => {
            let machineName = action.payload.machine;
            const machine = state.find(machine => machine.name === machineName).operation;
            if (machine){
                machine.running = false;
            }
        },
        continueProductionMachine: (state, action) => {
            let machineName = action.payload.machine;
            const machine = state.find(machine => machine.name === machineName).operation;
            if (machine){
                machine.running = true;
            }
        },
        stopProductionMachine: (state, action) => { 
            let machineName = action.payload.machine;
            const machine = state.find(machine => machine.name === machineName).operation;
            if (machine){
                machine.pause = false;
                machine.running = false;
                machine.finishTime = Date.now();
            }
        },
        pauseMachineDeathTime: (state, action) => {
            let machineName = action.payload.machine;
            const machine = state.find(machine => machine.name === machineName).operation;
            if (machine){
                machine.pause = true;
                machine.pauseTime = Date.now();
            }
        },
        continueMachiningDeathTime: (state, action) => {
            let machineName = action.payload.machine;
            const machine = state.find(machine => machine.name === machineName).operation;
            if (machine){
                machine.pause = false;
                machine.restartTime = Date.now();
                machine.deathTime += (machine.restartTime - machine.pauseTime);
            }
        },
        updateTotalParts: (state, action) => {
            let machineName = action.payload.machine;
            let totalParts = action.payload.totalParts;
            const machine = state.find(machine => machine.name === machineName).operation;
            if (machine){
                machine.totalParts = totalParts;
            } 
        }
    }
});

export const { addMachine, editMachine, deleteMachine, startProductionMachine, pauseProductionMachine, continueProductionMachine, stopProductionMachine, pauseMachineDeathTime, continueMachiningDeathTime, updateTotalParts } = machineSlice.actions;
export default machineSlice.reducer;