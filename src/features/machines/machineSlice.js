import { createSlice } from "@reduxjs/toolkit"

let initialState = [
  {
    name: "Máquina 1",
    machineInfo: {
      machiningType: "Fresadora",
      model: "model 1",
      technology: "CNC",
      operatorName: "Jose Luis Ramirez Esparza",
      registerDate: "",
      brand: "FANUC",
    },
    parts: [
      {
        index: 0,
        ot: "0001",
        project: "Proyecto 1",
        id: "01",
        name: "Parte 1",
        quantity: 100,
        finishedParts: 10,
        material: "Aluminio",
        client: "Cliente 1",
        estimatedTime: {
          hours: 4,
          minutes: 25,
        },
        status: "Finalizado",
      },
      {
        index: 1,
        ot: "0001",
        project: "Proyecto 1",
        id: "01",
        name: "Parte 1",
        quantity: 100,
        finishedParts: 10,
        material: "Aluminio",
        client: "Cliente 1",
        estimatedTime: {
          hours: 4,
          minutes: 25,
        },
        status: "En proceso",
      },
      {
        index: 2,
        ot: "0001",
        project: "Proyecto 1",
        id: "01",
        name: "Parte 1",
        quantity: 100,
        finishedParts: 10,
        material: "Aluminio",
        client: "Cliente 1",
        estimatedTime: {
          hours: 4,
          minutes: 25,
        },
        status: "Pendiente",
      }
    ],

    machineStatus: {
      running: false,
      pause: false,
    },

    currentProcess: {
      projectOt: "0001",
      partId: "01",
      partsQuantity: 0,
      finishedParts: 0,
      estimatedTime: "N/A",
      realTime: "N/A"
    },

    dayProduction: {
      startTime: "",
      deathTime: "",
      finishTime: "",
      totalParts: 0
    },

    processTiming: {
      startTime: "N/A",
      pauseTime: "N/A",
      finishTime: "N/A",
      deathTime: "N/A",
    }
  }
]

export const machineSlice = createSlice({
  name: "machines",
  initialState: initialState,
  reducers: {
    // Machine info actions
    addMachine: (state, action) => {
      const newMachine = {...action.payload.newMachine}

      state.push(newMachine)
    },
    editMachineInfo: (state, action) => {
      const oldMachineName = action.payload.oldMachineName
      const newMachineName = action.payload.newMachineName
      const newMachineInfo = {...action.payload.machineInfo}

      const selectedMachine= state.find(machine => machine.name === oldMachineName)
      if (selectedMachine){
        selectedMachine.machineInfo = {...newMachineInfo}

        if (oldMachineName !== newMachineName){
          selectedMachine.name = newMachineName
        }
      }
    },
    deleteMachine: (state, action) => {
      const machineName = action.payload.machineName

      state.splice(state.indexOf(state.find(machine => machine.name === machineName)), 1)
    },
    startProductionMachine: (state, action) => {
      let machineName = action.payload.machine
      const machine = state.find(
        (machine) => machine.name === machineName
      ).operation
      if (machine) {
        machine.running = true
        machine.pause = true
        machine.startTime = Date.now()
        machine.pauseTime = Date.now()
      }
    },
    pauseProductionMachine: (state, action) => {
      let machineName = action.payload.machine
      const machine = state.find(
        (machine) => machine.name === machineName
      ).operation
      if (machine) {
        machine.running = false
      }
    },
    continueProductionMachine: (state, action) => {
      let machineName = action.payload.machine
      const machine = state.find(
        (machine) => machine.name === machineName
      ).operation
      if (machine) {
        machine.running = true
      }
    },
    stopProductionMachine: (state, action) => {
      let machineName = action.payload.machine
      const machine = state.find(
        (machine) => machine.name === machineName
      ).operation
      if (machine) {
        machine.pause = false
        machine.running = false
        machine.finishTime = Date.now()
      }
    },
    pauseMachineDeathTime: (state, action) => {
      let machineName = action.payload.machine
      const machine = state.find(
        (machine) => machine.name === machineName
      ).operation
      if (machine) {
        machine.pause = true
        machine.pauseTime = Date.now()
      }
    },
    continueMachiningDeathTime: (state, action) => {
      let machineName = action.payload.machine
      const machine = state.find(
        (machine) => machine.name === machineName
      ).operation
      if (machine) {
        machine.pause = false
        machine.restartTime = Date.now()
        machine.deathTime += machine.restartTime - machine.pauseTime
      }
    },
    updateTotalParts: (state, action) => {
      let machineName = action.payload.machine
      let totalParts = action.payload.totalParts
      const machine = state.find(
        (machine) => machine.name === machineName
      ).operation
      if (machine) {
        machine.totalParts = totalParts
      }
    },
  },
})


export const {
  // Machine info actions
  addMachine,
  editMachineInfo,
  deleteMachine,
  startProductionMachine,
  pauseProductionMachine,
  continueProductionMachine,
  stopProductionMachine,
  pauseMachineDeathTime,
  continueMachiningDeathTime,
  updateTotalParts,
} = machineSlice.actions
export default machineSlice.reducer
