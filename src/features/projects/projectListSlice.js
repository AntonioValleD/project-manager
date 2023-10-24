import { createSlice } from "@reduxjs/toolkit"
import { DateTime } from "luxon"

const initialState = [
  {
    ot: "0001",
    projectInfo: {
      microsipOt: "3254",
      name: "MANUFACTURA DE GUARDA SEG DESPACHADORA, SEGURO PARA ACUMULADOR Y TROMPETAS",
      status: "En proceso",
      client: "K&S Arneses",
      clientUser: "Rodrigo Martinez Rosales",
      startDate: "2021-07-09T00:00:00.000Z",
      estimatedFinishDate: "2021-07-09",
      finishDate: "2021-07-09T00:00:00.000Z",
      oc: "4800088622",
      partsQuantity: 1,
      totalPartUnits: 25,
      finishedParts: 0,
      totalfinishedPartUnits: 0,
      rejectedPartUnits: 0,
      materialStatus: "Sin solicitar",
    },
    parts: [
      {
        id: "01",
        partInfo: {
          name: "Pieza 1",
          material: "Acero 1018",
          location: "Producción",
          partFinishing: "Pavonado",
          quantity: 25,
          finished: 13,
          rejected: 1,
          assembly: "Ensamblaje 1",
          type: "Bloque",
        },
        dimentions: {
          units: "in",
          generalDimentions: '4" x 4" x 1"',
          materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
        },
        processPath: {
          status: "",
          processList: [
            {
              index: 0,
              name: "Solicitar material",
              department: "projectArea",
              startDate: "2021-07-09T00:00:00.000Z",
              estimatedTime: {
                days: 0,
                hours: 0,
                minuts: 30,
              },
              finishDate: "2021-07-09T00:00:00.000Z",
              status: "Finalizado"
            },
            {
              index: 1,
              name: "Fresado",
              department: "productionArea",
              startDate: "2021-07-09T00:00:00.000Z",
              estimatedTime: {
                days: 2,
                hours: 5,
                minuts: 30,
              },
              finishDate: "",
              status: "En proceso"
            },
            {
              index: 2,
              name: "Inspeccion",
              department: "qualityControlArea",
              startDate: "",
              estimatedTime: {
                days: 2,
                hours: 5,
                minuts: 30,
              },
              finishDate: "",
              status: "Pendiente"
            }
          ]
        },
        qualityInfo: {
          status: "Sin revisar",
          unitList: [
            {
              unitId: "1",
              measures: [],
            },
          ],
        },
        materialRequest: {
          status: "Habilitado",
          requestList: [
            {
              id: "1151",
              status: "Entregado",
              userName: "Manuel Garcia Valle",
              userRequestDate: "2023-05-24T00:00:00.000Z",
              warehouseRequestDate: "2023-05-24T00:00:00.000Z",
              warehouseArrivalDate: "2023-05-24T00:00:00.000Z",
              userDeliveryDate: "2023-05-24T00:00:00.000Z",
              material: "Acero 4140T",
              generalDimetions: "4 x 4 x 6",
              materialDimentions: "4 1/8 x 5 1/8 x 6 1/8",
              units: "in",
              quantity: "8",
            },
          ]
        }
      },
    ],
  },
]


export const projectListSlice = createSlice({
  name: "projectList",
  initialState: initialState,
  reducers: {
    // Project actions
    addProject: (state, action) => {
      const project = state.find((project) => project.ot === action.payload.ot)

      let newProject = action.payload
      if (!newProject.startDate) {
        newProject["startDate"] = DateTime.local().toString()
      }

      if (!project) {
        state.push(newProject)
      }
    },
    editProject: (state, action) => {
      const oldOt = action.payload.oldOt
      const newOt = action.payload.newOt
      const projectInfo = { ...action.payload.projectInfo }

      const foundProject = state.find((project) => project.ot === oldOt)

      if (foundProject) {
        foundProject.ot = newOt
        foundProject.projectInfo = projectInfo
      }
    },
    deleteProject: (state, action) => {
      const foundProject = state.find(
        (project) => project.ot === action.payload
      )
      if (foundProject) {
        state.splice(state.indexOf(foundProject), 1)
      }
    },
    selectProject: (state, action) => {
      const selectedProject = state.find(
        (project) => project.selected === true
      )
      if (selectedProject) {
        selectedProject.selected = false
      }

      const currentProject = state.find(
        (project) => project.ot === action.payload
      )
      if (currentProject) {
        currentProject.selected = true
      }
    },
    unselectProject: (state, action) => {
      const selectedProject = state.find(
        (project) => project.selected === true
      )
      if (selectedProject) {
        selectedProject.selected = false
      }
    },
    updateModelsQuantity: (state, action) => {
      const ot = action.payload.ot
      const modelsQuantity = action.payload.modelsQuantity.toString()
      console.log(modelsQuantity)

      const projectInfo = state.find((project) => project.ot === ot)

      if (!projectInfo.partModelsQuantity) {
        projectInfo["partModelsQuantity"] = modelsQuantity
      } else {
        projectInfo.partModelsQuantity = modelsQuantity
      }
    },


    // Part actions
    addNewPart: (state, action) => {
      const newPart = {...action.payload.newPart}
      const ot = action.payload.ot

      const partList = state.find(project => project.ot === ot).parts
      if (partList){
        partList.push(newPart)
      }
    },
    updatePartsQuantity: (state, action) => {
      const ot = action.payload.ot
      const newPartsQuantity = action.payload.partsQuantity
      const newTotalUnits = action.payload.totalPartUnits

      const projectInfo = state.find(project => project.ot === ot).projectInfo
      if (projectInfo){
        projectInfo.partsQuantity = newPartsQuantity
        projectInfo.totalPartUnits = newTotalUnits
      }
    },
    deletePart: (state, action) => {
      const ot = action.payload.ot
      const partId = action.payload.partId

      const partList = state.find(project => project.ot === ot).parts
      if (partList){
        partList.splice(partList.indexOf(partList.find(part => part.id === partId)))
      }
    },


    // Process path actions
    addNewPartProcess: (state, action) => {
      const ot = action.payload.ot
      const partId = action.payload.partId
      const newProcess = {...action.payload.newProcess}
      const processIndex = newProcess.index

      const processPath = state.find(project => project.ot === ot).parts
        .find(part => part.id === partId).processPath

      if (processPath.processList){
        let firstPartArray = []
        let secondPartArray = []
        for (let i = 0; i < processIndex; i ++){
          firstPartArray.push(processPath.processList[i])
        }
        for (let i = processIndex; i < processPath.processList.length; i ++){
          secondPartArray.push(processPath.processList[i])
        }
        
        let newProcessList = [
          ...firstPartArray,
          newProcess,
          ...secondPartArray
        ]

        let counter = 0
        newProcessList.forEach((process) => {
          process.index = counter
          counter ++
        })

        processPath.processList = newProcessList
      }
    },
    deletePartProcess: (state, action) => {
      const ot = action.payload.ot
      const partId = action.payload.partId
      const processIndex = action.payload.processIndex

      const processList = state.find(project => project.ot === ot).parts
        .find(part => part.id === partId).processPath.processList

      if (processList){
        processList.splice(processIndex, 1)

        let counter = 0
        processList.forEach((process) => {
          process.index = counter
          counter ++
        })
      }
    },

    // Material request
    changeMaterialRequestStatus: (state, action) => {
      const ot = action.payload.ot
      const partId = action.payload.partId
      const requestStatus = action.payload.requestStatus

      const materialRequestList = state.find(project => project.ot === ot).parts
        .find(part => part.id === partId).materialRequest

      if (materialRequestList){
        materialRequestList.status = requestStatus
      }
    },
    addMaterialRequest: (state, action) => {
      const ot = action.payload.ot
      const partId = action.payload.partId
      const newMaterialRequest = {...action.payload.newMaterialRequest}

      const materialRequest = state.find(project => project.ot === ot).parts
        .find(part => part.id === partId).materialRequest

      if (materialRequest.requestList){
        materialRequest.requestList.push(newMaterialRequest)
        materialRequest.status = "Solicitado"
      }
    },
    setRequestDate: (state, action) => {
      console.log(action.payload);
      const ot = action.payload.ot
      const partId = action.payload.partId
      const requestId = action.payload.requestId
      const requestDate = action.payload.requestDate
      const requestStatus = action.payload.requestStatus

      const materialRequest = state.find(project => project.ot === ot).parts
        .find(part => part.id === partId).materialRequest.requestList
        .find(request => request.id === requestId)

      if (materialRequest){
        materialRequest[requestDate] = DateTime.local().toString()
        materialRequest.status = requestStatus
      }
    }
  },
})


export const {
  // Project Actions
  addProject,
  editProject,
  deleteProject,
  selectProject,
  unselectProject,
  updateModelsQuantity,
  increaseRequestMaterialValue,

  // Part actions
  addNewPart,
  updatePartsQuantity,
  deletePart,

  // Process actions
  addNewPartProcess,
  deletePartProcess,

  // Material request actions
  changeMaterialRequestStatus,
  addMaterialRequest,
  setRequestDate,
} = projectListSlice.actions
export default projectListSlice.reducer
