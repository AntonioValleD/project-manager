import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../features/projects/projectListSlice';
import projectTabReducer from '../features/project_tabs/projectTabSlice';
import selectedWindowReducer from '../features/selected_window/windowSilice';
import machineTabsReducer from '../features/machine_tabs/machineTabsSlice';
import machineReducer from '../features/machines/machineSlice';
import partsReducer from '../features/partsSlice.js/partsSlice';
import productionListReducer from '../features/productionListSlice/productionListSlice';
import selectedPartReducer from '../features/selectedPartSlice/selectedPartSlice';
import partOptionReducer from '../features/partOptionSlice/partOptionSlice';
import modalReducer from '../features/modalSlice/modalSlice';
import selectedProjectSlice from '../features/projects/selectedProjectSlice';
import timerSlice from '../features/productionListSlice/timerSlice';
import projectOptionReducer from '../features/projects/projectOptionSlice';
import appConfigSlice from '../features/appConfigSlice/appConfigSlice';


export const store = configureStore({
  reducer: {
    projectList: projectReducer,
    projectTabs: projectTabReducer,
    machineTabs: machineTabsReducer,
    machineList: machineReducer,
    selectedWindow: selectedWindowReducer,
    partList: partsReducer,
    productionList: productionListReducer,
    selectedPart: selectedPartReducer,
    selectedPartOption: partOptionReducer,
    modalStatus: modalReducer,
    selectedProject: selectedProjectSlice,
    timerStatus: timerSlice,
    projectOption: projectOptionReducer,
    appConfig: appConfigSlice
  }
});