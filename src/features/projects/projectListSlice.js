import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

const initialState = [
    {
        ot: '0001',
        projectInfo: {
            microsipOt: '3254',
            name: 'MANUFACTURA DE GUARDA SEG DESPACHADORA, SEGURO PARA ACUMULADOR Y TROMPETAS',
            status: 'En proceso',
            client: 'K&S Arneses', 
            clientUser: 'Rodrigo Martinez Rosales', 
            startDate: '2021-07-09T00:00:00.000Z',
            estimatedFinishDate: '2021-07-09',
            finishDate: '2021-07-09T00:00:00.000Z',
            oc: '4800088622',
            partsQuantity: 18,
            totalPartUnits: 25, 
            finishedParts: 7,
            totalfinishedPartUnits: 13,
            rejectedPartUnits: 3,
            materialStatus: 'Sin solicitar',
        },
        parts: [
            {
                id: '01',
                partInfo: {
                    name: 'Pieza 1',
                    material: 'Acero 1018',
                    location: 'Producción',
                    quantity: '25',
                    finished: '13',
                    rejected: '1',
                    assembly: 'Ensamblaje 1',
                    type: 'Bloque',
                    dimentionUnits: 'in',
                },
                dimentions:{
                    units: "in",
                    generalDimentions: '4" x 4" x 1"',
                    materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
                },
                processPath: [],
                qualityInfo: [
                    {
                        unitId: '1',
                        selected: false,
                        measures: [],
                    },
                ],
                materialRequest: [
                    {
                        requestId: '1',
                        requestNo: 'sccjbsjsdc',
                        partId: '01',
                        selected: false,
                        status: 'Entregado', 
                        userName: 'Manuel Garcia Valle',
                        userRequestDate: '2023-05-24T00:00:00.000Z',
                        warehouseRequestDate: '2023-05-24T00:00:00.000Z',
                        warehouseArrivalDate: '2023-05-24T00:00:00.000Z',
                        userDeliveryDate: '2023-05-24T00:00:00.000Z',
                        material: "Acero 4140T",
                        generalDimetions: "4 x 4 x 6",
                        materialDimentions: "4 1/8 x 5 1/8 x 6 1/8",
                        units: "in",
                        quantity: "8",
                    }
                ]
            }
        ]
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
            const oldOt = action.payload.oldOt
            const newOt = action.payload.newOt
            const projectInfo = {...action.payload.projectInfo}

            const foundProject = state.find(project => project.ot === oldOt)

            if (foundProject){
                foundProject.ot = newOt
                foundProject.projectInfo = projectInfo
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