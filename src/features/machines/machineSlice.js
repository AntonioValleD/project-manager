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
        partId: "01",
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
        partId: "01",
        name: "Parte 1",
        quantity: 103,
        finishedParts: 0,
        material: "Aluminio",
        client: "Cliente 1",
        estimatedTime: {
          hours: 4,
          minutes: 25,
        },
        status: "Siguiente",
      },
      {
        index: 2,
        ot: "0001",
        project: "Proyecto 1",
        partId: "01",
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

    machiningStatus: {
      startedStatus: false,
      pausedStatus: false,
    },

    dayProduction: {
      operationTime: "",
      deathTime: "",
      totalParts: 10
    },

    processTiming: {
      startTime: "N/A",
      pauseTime: "N/A",
      finishTime: "N/A",
      deathTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
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


    // Production control actions
    addProductionPart: (state, action) => {
      const machineName = action.payload.machineName
      const newPart = {...action.payload.newPart}

      let newPartIndex = newPart.index

      const selectedMachine = state.find(machine => machine.name === machineName)

      if (selectedMachine.parts.length - 1 < newPartIndex){
        selectedMachine.parts.push(newPart)
      } else {
        let newPartList = []

        for (let i = 0; i < selectedMachine.parts.length; i++){
          if (i < newPartIndex){
            newPartList.push(selectedMachine.parts[i])

          } else if (i === newPartIndex){
            newPartList.push(newPart)
            newPartList.push({
              ...selectedMachine.parts[i],
              index: i + 1,
              status: "Pendiente"
            })

          } else if (i > newPartIndex){
            newPartList.push({
              ...selectedMachine.parts[i],
              index: i + 1,
              status: "Pendiente"
            })
          }
        }

        selectedMachine.parts = newPartList
      }
    },
    deleteProductionPart: (state, action) => {
      const machineName = action.payload.machineName
      const partIndex = action.payload.partIndex

      const productionPartList = state.find(machine => machine.name === machineName).parts
      const selectedPart = productionPartList.find(part => part.index === partIndex)

      if (selectedPart){
        productionPartList.splice(partIndex, 1)

        for (let i = 0; i < productionPartList.length; i++){
          productionPartList[i].index = i
        }
      }
    },
    changeMachiningStatus: (state, action) => {
      const machineName = action.payload.machineName
      const statusName = action.payload.statusName
      const statusValue = action.payload.statusValue

      const currentMachiningStatus = state.find(machine => machine.name === machineName).machiningStatus
      if (currentMachiningStatus){
        currentMachiningStatus[statusName] = statusValue
      }
    },
    changePartStatus: (state, action) => {
      const machineName = action.payload.machineName
      const partIndex = action.payload.partIndex
      const statusValue = action.payload.statusValue

      const selectedPart = state.find(machine => machine.name === machineName).parts[partIndex]
      if (selectedPart){
        selectedPart.status = statusValue
      }
    },
    /* */
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


    // Process timing actions
    updateProcessTiming: (state, action) => {
      const machineName = action.payload.machineName
      const timerName = action.payload.timerName
      const timerValue = action.payload.timerValue

      const selectedMachine = state.find(machine => machine.name === machineName)
      if (selectedMachine){
        selectedMachine.processTiming[timerName] = timerValue
      }
    },

  },
})


export const {
  // Machine info actions
  addMachine,
  editMachineInfo,
  deleteMachine,
  updateTotalParts,

  // Production control actions
  addProductionPart,
  deleteProductionPart,
  changeMachiningStatus,
  changePartStatus,

  // Process timing actions
  updateProcessTiming,
} = machineSlice.actions
export default machineSlice.reducer
