import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

const initialState = [
    {
        ot: '0001',
        microsipOt: '3254',
        projectName: 'MANUFACTURA DE GUARDA SEG DESPACHADORA, SEGURO PARA ACUMULADOR Y TROMPETAS',
        status: 'En proceso',
        supplier: 'SEAA',
        client: 'K&S Arneses', 
        clientUser: 'Rodrigo Martinez Rosales', 
        startDate: '2021-07-09T00:00:00.000Z',
        estimatedFinishDate: '2021-07-09T00:00:00.000Z',
        finishDate: '',
        oc: '4800088622',
        partsQuantity: '18',
        finishedParts: '9',
        rejectedParts: '3',  
        materialStatus: 'Sin solicitar',
        selected: false,
    }
];
 
export const projectListSlice = createSlice({
    name: 'projectList',
    initialState: initialState,
    reducers: {
        addProject: (state, action) => {
            const project = state.find(project => project.ot === action.payload.ot);

            let newProject = action.payload;
            if (!newProject.startDate){
                newProject["startDate"] = DateTime.local().toString();
            }

            if (!project){
                state.push(newProject);
            }
        },
        editProject: (state, action) => {
            const project = state.find(project => project.ot === action.payload.ot);
            const upProject = action.payload.project;
            if (project){
                if (upProject.ot){
                    project.microsipOt = upProject.microsipOt;
                }
                if (upProject.microsipOt){
                    project.microsipOt = upProject.microsipOt;
                }
                if (upProject.projectName){
                    project.projectName = upProject.projectName;
                }
                if (upProject.status){
                    project.status = upProject.status;
                }
                if (upProject.client){
                    project.client = upProject.client;
                }
                if (upProject.clientUser){
                    project.clientUser = upProject.clientUser;
                }
                if (upProject.estimatedFinishDate){
                    project.estimatedFinishDate = upProject.estimatedFinishDate;
                }
                if (upProject.finishDate){
                    project.finishDate = upProject.finishDate;
                }
                if (upProject.oc){
                    project.oc = upProject.oc;
                }
                if (upProject.partsQuantity){
                    project.partsQuantity = upProject.partsQuantity;
                }
                if (upProject.finishedParts){
                    project.finishedParts = upProject.finishedParts;
                }
                if (upProject.rejectedParts){
                    project.rejectedParts = upProject.rejectedParts;
                }
            }
        },
        deleteProject: (state, action) => { 
            const foundProject = state.find(project => project.ot === action.payload);
            if (foundProject){
                state.splice(state.indexOf(foundProject), 1);
            }
        },
        selectProject: (state, action) => {
            const selectedProject = state.find(project => project.selected === true);
            if (selectedProject){
                selectedProject.selected = false;
            }

            const currentProject = state.find(project => project.ot === action.payload);
            if (currentProject){
                currentProject.selected = true
            }
        },
        unselectProject: (state, action) => {
            const selectedProject = state.find(project => project.selected === true);
            if (selectedProject){
                selectedProject.selected = false;
            }
        },
        updateModelsQuantity: (state, action) => {
            const ot = action.payload.ot;
            const modelsQuantity = action.payload.modelsQuantity.toString();
            console.log(modelsQuantity);

            const projectInfo = state.find(project => project.ot === ot);

            if (!projectInfo.partModelsQuantity){
                projectInfo["partModelsQuantity"] = modelsQuantity;
            } else {
                projectInfo.partModelsQuantity = modelsQuantity;
            }
        },

        // Material request
        increaseRequestMaterialValue: (state, action) => { 
            const ot = action.payload.ot;
            const modelsQuantity = action.payload.modelsQuantity.toString();

            const projectInfo = state.find(project => project.ot === ot);

            if (!projectInfo.partModelsQuantity){
                projectInfo["partModelsQuantity"] = modelsQuantity;
            }

            if (projectInfo.materialRequestQuantity){
                if (projectInfo.partModelsQuantity <= projectInfo.materialRequestQuantity){
                    projectInfo.materialRequestQuantity = projectInfo.partModelsQuantity;
                } else {
                    projectInfo.materialRequestQuantity += 1;
                }
            } else {
                projectInfo["materialRequestQuantity"] = 1;
            }
        },
    }
});

export const { addProject, editProject, deleteProject, selectProject, unselectProject, updateModelsQuantity, increaseRequestMaterialValue } = projectListSlice.actions;
export default projectListSlice.reducer;