import { createSlice } from "@reduxjs/toolkit"


let initialState = {
  projectWindow: [],
  productionWindow: []
}


export const appIndexStatus = createSlice({
  name: "selectedWindow",
  initialState: initialState,
  reducers: {
    // Project actions
    openProject: (state, action) => {
      const ot = action.payload.ot

      const foundProject = state.projectWindow.find(project => project.ot === ot)
      const selectedProject = state.projectWindow.find(project => project.selected === true)

      if (selectedProject){
        selectedProject.selected = false
      }

      if (foundProject){
        foundProject.selected = true
      } else {
        let projectCard = {
          ot: ot,
          selected: true,
          projectOptions: {
            edit: false,
            workRequest: false,
            materialRequest: false,
            reeworks: false,
            activityReg: false,
          },
          partOptions: {
            selectedPart: "",
            showDrawing: false,
            showModel: false,
            showAssembly: false,
            showCncCode: false,
            showDimentionalReport: false,
            showProcessPath: false,
            activityReg: false,
            partActions: {
              edit: false,
              inspectPart: false,
              requestMaterial: false,
              processPath: false,
              reeworkRequest: false
            }
          }
        }
        state.projectWindow.push(projectCard)
      }
    },
    updateProjectOt: (state, action) => {
      const ot = action.payload.ot

      const selectedProject = state.projectWindow.find(project => project.selected === true)
      if (selectedProject){
        selectedProject.ot = ot
      }
    },
    closeProject: (state, action) => {
      const ot = action.payload.ot

      const foundProject = state.projectWindow.find(project => project.ot === ot)

      if (foundProject){
        state.projectWindow.splice(state.productionWindow.indexOf(foundProject), 1)
      }
    },
    changeProjectOption: (state, action) => {
      const optionName = action.payload.optionName
      const optionStatus = action.payload.optionStatus

      const projectOptions = state.projectWindow.find(project => project.selected === true).projectOptions
      if (projectOptions){
        projectOptions[optionName] = optionStatus
      }
    },


    // Part actions
    openPart: (state, action) => {
      const ot = action.payload.ot
      const partId = action.payload.partId

      const foundProject = state.projectWindow.find(project => project.ot === ot)

      if (foundProject){
        foundProject.partOptions.selectedPart = partId
      }
    },
    closePart: (state, action) => {
      const ot = action.payload.ot

      const foundProject = state.projectWindow.find(project => project.ot === ot)

      if (foundProject){
        foundProject.partOptions.selectedPart = ""
      }
    },
    changePartOption: (state, action) => {
      const optionName = action.payload.optionName
      const optionStatus = action.payload.optionStatus

      const partOptions = state.projectWindow.find(project => project.selected === true).partOptions
      if (partOptions){
        partOptions[optionName] = optionStatus
      }
    },
    changePartAction: (state, action) => {
      const actionName = action.payload.actionName
      const actionStatus = action.payload.actionStatus

      const partActions = state.projectWindow.find(project => project.selected === true).partOptions.partActions
      if (partActions){
        partActions[actionName] = actionStatus
      }
    }
  },
})


export const { 
  // Project actions
  openProject, 
  closeProject, 
  updateProjectOt,
  changeProjectOption,
  
  // Part actions
  openPart,
  closePart,
  changePartOption,
  changePartAction
} = appIndexStatus.actions
export default appIndexStatus.reducer
