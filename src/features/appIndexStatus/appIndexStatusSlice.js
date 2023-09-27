import { createSlice } from "@reduxjs/toolkit"


let initialState = {
  projectWindow: [],
  productionWindow: []
}


export const appIndexStatus = createSlice({
  name: "selectedWindow",
  initialState: initialState,
  reducers: {
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
          partId: ""
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
    }
  },
})

export const { openProject, closeProject, updateProjectOt } = appIndexStatus.actions
export default appIndexStatus.reducer
