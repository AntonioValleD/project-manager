import { configureStore } from '@reduxjs/toolkit'
import projectReducer from '../features/projects/projectListSlice'
import projectTabReducer from '../features/project_tabs/projectTabSlice'
import selectedWindowReducer from '../features/selected_window/windowSilice'
import machineTabsReducer from '../features/machine_tabs/machineTabsSlice'
import machineReducer from '../features/machines/machineSlice'
import partOptionReducer from '../features/partOptionSlice/partOptionSlice'
import modalReducer from '../features/modalSlice/modalSlice'
import projectOptionReducer from '../features/projects/projectOptionSlice'
import appConfigSlice from '../features/appConfigSlice/appConfigSlice'
import appIndexStatusSlice from '../features/appIndexSlice/appIndexStatusSlice'


export const store = configureStore({
  reducer: {
    projectList: projectReducer,
    projectTabs: projectTabReducer,
    machineTabs: machineTabsReducer,
    machineList: machineReducer,
    selectedWindow: selectedWindowReducer,
    selectedPartOption: partOptionReducer,
    modalStatus: modalReducer,
    projectOption: projectOptionReducer,
    appConfig: appConfigSlice,
    appIndex: appIndexStatusSlice
  }
})