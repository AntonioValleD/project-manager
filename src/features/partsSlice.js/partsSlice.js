import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

let initialState = [
{
    ot: "0001",
    parts: [
        {
            
            selected: false,
            id: '01',
            partName: 'Pieza 1',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '25',
            finished: '13',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Bloque',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
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
        },
        {
            selected: false,
            id: '02',
            partName: 'Pieza 2',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Cilindro',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualitySettings: {
                userName: "Josue Clemente Perdomo",
                units: "mm",
                moreTolerance: "0.02",
                lessTolerance: "0.02",
                equipment: "Vernier",
                visualInspection: true,
                dimentionalInspection: true,
                startDate: "2023-05-24T00:00:00.000Z",
            },
            qualityTable: [
                {
                    unitId: '1',
                    selected: true,
                    measures: [],
                },
            ],
            materialRequest: [
                {
                    requestId: '2',
                    requestNo: 'sccjbsjc',
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
        },
        {
            selected: false,
            id: '03',
            partName: 'Pieza 3',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'block',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '04',
            partName: 'Pieza 4',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'block',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '05',
            partName: 'Pieza 5',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'block',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '06',
            partName: 'Pieza 6',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'block',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '07',
            partName: 'Pieza 7',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'block',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '08',
            partName: 'Pieza 8',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'block',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '09',
            partName: 'Pieza 9',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'block',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '10',
            partName: 'Pieza 10',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'block',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '11',
            partName: 'Pieza 11',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'block',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '12',
            partName: 'Pieza 12',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'block',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '13',
            partName: 'Pieza 13',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'block',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '14',
            partName: 'Pieza 14',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'block',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '15',
            partName: 'Pieza 15',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '4',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'block',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        }
    ]
},
{
    ot: "2354",
    parts: [
        {
            selected: false,
            id: '1',
            partName: 'Seguro',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '60',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Cilindro',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '2',
            partName: 'Soporte de pin',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '60',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Cilindro',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '3',
            partName: 'Pinza de agarre',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '60',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Cilindro',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
    ]
},
{
    ot: "2365",
    parts: [
        {
            selected: false,
            id: '1',
            partName: 'Mordaza de parte',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '60',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Cilindro',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '2',
            partName: 'Flecha de ajuste',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '60',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Cilindro',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '3',
            partName: 'Conexion W',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '60',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Cilindro',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
    ]
},
{
    ot: "2375",
    parts: [
        {
            selected: false,
            id: '1',
            partName: 'Anillo doble',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '60',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Cilindro',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '2',
            partName: 'Engrane AL265',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '60',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Cilindro',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '3',
            partName: 'Tope de barra',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '60',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Cilindro',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
    ]
},
{
    ot: "2419",
    parts: [
        {
            selected: false,
            id: '1',
            partName: 'Seguro',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '60',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Cilindro',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '2',
            partName: 'Guarda',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '60',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Cilindro',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
        {
            selected: false,
            id: '3',
            partName: 'Base sujetador',
            material: 'Acero 1018',
            location: 'Producción',
            quantity: '60',
            finished: '1',
            rejected: '1',
            assembly: 'Ensamblaje 1',
            qualityProcess: 'En proceso',
            type: 'Cilindro',
            dimentionUnits: 'in',
            generalDimentions: '4" x 4" x 1"',
            materialDimentions: '4 1/4" x 4 1/4" x 1 1/4"',
            currentProcess: 'Process 4',
            previousProcess: 'Process 3',
            nextProcess: 'Process 5',
            qualityTable: [
                {
                    unitId: '1',
                    selected: false,
                    measures: [],
                },
            ],
        },
    ]
},

];

export const partsSlice = createSlice({
    name: 'partList',
    initialState: initialState,
    reducers: {
        // Part functions
        addPart: (state, action) => {
            let ot = action.payload.partOt;
            let newPart = action.payload.newPart;
            const projectParts = state.find(project => project.ot === ot);
            if (projectParts){
                projectParts.parts.push(newPart);
            } else {
                state.push(
                    {
                        ot: ot,
                        parts: [newPart]
                    }
                )
            }
        },
        editPart: (state, action) => {
            console.log(action.payload);
        },
        updatePartInfo: (state, action) => {
            let partOt = action.payload.ot;
            const part = state.find(project => project.ot === partOt).parts.find(part => part.selected === true);
            if (part){
                part.id = action.payload.newPart.id;
                part.partName = action.payload.newPart.partName;
                part.type = action.payload.newPart.type;
                part.assembly = action.payload.newPart.assembly;
                part.material = action.payload.newPart.material;
                part.quantity = action.payload.newPart.quantity;
                part.dimentionUnits = action.payload.newPart.dimentionUnits;
                part.generalDimentions = action.payload.newPart.generalDimentions;
                part.materialDimentions = action.payload.newPart.materialDimentions;
            }
        },
        deletePart: (state, action) => {
            let ot = action.payload;
            const parts = state.find(project => project.ot === ot).parts;
            parts.splice(parts.indexOf(parts.find(part => part.selected === true)), 1);
        },
        editSelectedPart: (state, action) => {
            let partOt = action.payload.partOt;
            let partId = action.payload.partId;

            const selectedPart = state.find(project => project.ot === partOt).parts.find(part => part.selected === true);
            if (selectedPart){
                selectedPart.selected = false;
            }
            const currentpart = state.find(project => project.ot === partOt).parts.find(part => part.id === partId);
            if (currentpart) {
                currentpart.selected = true;
            }
        },
        unselectPart: (state, action) => {
            let partOt = action.payload.partOt;
            const selectedPartOt = state.find(project => project.ot === partOt);
            if (selectedPartOt){
                const selectedPart = selectedPartOt.parts.find(part => part.selected === true);
                if (selectedPart){
                    selectedPart.selected = false;
                }
            } else {
                return;
            }
        },

        // Quality control functions
        editSelectedQualityMeasure: (state, action) => {
            const ot = action.payload.ot;
            const partId = action.payload.partId;
            const measureId = action.payload.measureId;

            const selectedMeasure = state.find(project => project.ot === ot).parts.find(part => part.id === partId).qualityTable.find(unit => unit.selected === true).measures.find(measure => measure.selected === true);
            if (selectedMeasure){
                selectedMeasure.selected = false;
            }

            const foundMeasure = state.find(project => project.ot === ot).parts.find(part => part.id === partId).qualityTable.find(unit => unit.selected === true).measures.find(measure => measure.measureId === measureId);
            if (foundMeasure){
                foundMeasure.selected = true;
            }

        },
        bootstrapQualityInfo: (state, action) => {
            const ot = action.payload.ot;
            const partId = action.payload.partId;
            const partInfo = state.find(project => project.ot === ot).parts.find(part => part.id === partId);
            
            if (parseInt(partInfo.quantity) !== partInfo.qualityTable.length){
                let unitList = [];
                for (let i = 0; i < parseInt(partInfo.quantity); i++){
                    unitList.push({
                        unitId: (i + 1).toString(),
                        selected: false,
                        measures: []
                    })
                }
                unitList[0].selected = true;
                partInfo.qualityTable = unitList;
            }
        },
        selectQualityUnit: (state, action) => {
            const ot = action.payload.ot;
            const partId = action.payload.partId;
            let unitId = action.payload.unitId;
             
            const unitList = state.find(project => project.ot === ot).parts.find(part => part.id === partId).qualityTable;

            const selectedUnit = unitList.find(unit => unit.selected === true);
            if (selectedUnit){
                selectedUnit.selected = false;
            }

            if (parseInt(unitId) >= unitList.length){
                unitId = unitList.length.toString();
            } else if (parseInt(unitId) <= 1){
                unitId = "1";
            }

            unitList.find(unit => unit.unitId === unitId).selected = true;
        },
        addMeasure: (state, action) => {
            let ot = action.payload.ot;
            let partId = action.payload.partId;
            let measure = action.payload.measure;

            const unitList = state.find(project => project.ot === ot).parts.find(part => part.id === partId).qualityTable;
            if (unitList){
                measure.tolerance = `+ ${measure.lessTolerance}, - ${measure.moreTolerance}`;
                measure.measureId = unitList[0].measures.length + 1;
                unitList.forEach(unit => unit.measures.push(measure));
            }
        },
        updateMeasure: (state, action) => {
            const ot = action.payload.ot;
            const partId = action.payload.partId;
            const measureId = action.payload.measureId;
            let updatedMeasure = action.payload.newMeasure;

            const qualityTable = state.find(project => project.ot === ot).parts.find(part => part.id === partId).qualityTable;

            if (qualityTable){
                qualityTable.forEach((unit) => {
                    const selectedMeasure = unit.measures.find(measure => measure.measureId === measureId);
                    selectedMeasure.cota = updatedMeasure.cota;
                    selectedMeasure.lessTolerance = updatedMeasure.lessTolerance;
                    selectedMeasure.moreTolerance = updatedMeasure.moreTolerance;
                })
            }

        },
        deleteMeasure: (state, action) => {
            let ot = action.payload.ot;
            let partId = action.payload.partId;

            const unitList = state.find(project => project.ot === ot).parts.find(part => part.id === partId).qualityTable;
            if (unitList){
                let measureIndex = unitList[0].measures.indexOf(unitList[0].measures.find(measure => measure.selected === true));
                if (measureIndex >= 0){
                    unitList.forEach((unit) => {
                        unit.measures.splice(measureIndex, 1);
                        for (let i = measureIndex; i < unit.measures.length; i++){
                            unit.measures[i].measureId = (i + 1).toString();
                        }
                    })
                } else {
                    return;
                }
            }
        },
        updateRealMeasure: (state, action) => {
            const ot = action.payload.ot;
            const partId = action.payload.partId;
            const realMeasure = action.payload.realMeasure;

            const selectedMeasure = state.find(project => project.ot === ot).parts.find(part => part.id === partId).qualityTable.find(unit => unit.selected === true).measures.find(measure => measure.selected === true);
            if (selectedMeasure){
                selectedMeasure.measure = realMeasure;
            }
        },
        updateInspectionSettings: (state, action) => {
            const ot = action.payload.ot;
            const partId = action.payload.partId;
            let inspectionSettings = {...action.payload.inspectionSettings};

            const foundPart = state.find(project => project.ot === ot).parts.find(part => part.id === partId);
            const qualitySettings = foundPart.qualitySettings;

            if (qualitySettings){
                qualitySettings.units = inspectionSettings.units;
                qualitySettings.moreTolerance = inspectionSettings.moreTolerance;
                qualitySettings.lessTolerance = inspectionSettings.lessTolerance;
                qualitySettings.equipment = inspectionSettings.equipment;
                qualitySettings.visualInspection = inspectionSettings.visualInspection;
                qualitySettings.dimentionalInspection = inspectionSettings.dimentionalInspection;
            } else {
                inspectionSettings["startDate"] = DateTime.local().toString();
                foundPart["qualitySettings"] = inspectionSettings;
            }
        },
        addPartsArray: (state, action) => {
            const partOt = action.payload;
            const partsArray = state.find(project => project.ot === partOt);
            if (!partsArray){
                state.push({
                    ot: partOt,
                    parts: [],
                })
            }
        },
        updatePartsOt: (state, action) => {
            let oldOt = action.payload.oldOt;
            let newOt = action.payload.newOt;
            const projectParts = state.find(project => project.ot === oldOt);
            if (projectParts){
                projectParts.ot = newOt; 
            }
        },

        // Process functions
        addProcess: (state, action) => {
            let ot = action.payload.ot;
            let partId = action.payload.partId;
            let newProcess = action.payload.newProcess;
            const processOt = state.find(project => project.ot === ot);
            if (!processOt){
              state.push({
                ot: ot,
                parts: [
                  {
                    id: partId,
                    processes: [],
                  }
                ]
              })
            } else {
              const part = processOt.parts.find(part => part.selected === true);
              if (!part){
                processOt.parts.push({
                  id: partId,
                  processes: [],
                })
              }
            }
            const processes = state.find(project => project.ot === ot).parts.find(part => part.selected === true).processes;

            if (processes){
                let index = processes.length + 1;
                newProcess.index = index;
                processes.push(newProcess); 
            }
        },
        editProcess: (state, action) => {
            let ot = action.payload.ot;
            let processIndex = action.payload.index;
            let newProcess = action.payload.newProcess;
            const process = state.find(project => project.ot === ot).parts.find(part => part.selected === true).processes.find(process => process.index === processIndex);
            if (process){
                process.processName = newProcess.processName;
                process.department = newProcess.deletePart;
            }
        },
        deleteProcess: (state, action) => {
            let ot = action.payload.ot;
            let processIndex = action.payload.processIndex - 1;
            const processes = state.find(project => project.ot === ot).parts.find(part => part.selected === true).processes;
            processes.splice(processIndex, 1);
            
            let counter = 0;
            processes.forEach((process) => {
                process.index = counter;
                counter ++; 
            })
        },

        // Material request functions
        requestMaterial: (state, action) => {
            const ot = action.payload.ot;
            const partId = action.payload.partId;

            let request = action.payload.request;
            request.userRequestDate = DateTime.local().toString();

            const partInfo = state.find(project => project.ot === ot).parts.find(part => part.id === partId);

            if (partInfo.materialRequest){
                request.requestId = (partInfo.materialRequest.length + 1).toString();
                partInfo.materialRequest.push(request);
            } else {
                request.requestId = "1";
                partInfo["materialRequest"] = [
                    request
                ];
            }
        },
        updateRequestStatus: (state, action) => {
            const ot = action.payload.ot;
            const partId = action.payload.partId;
            const requestNo = action.payload.requestNo;
            const requestStatus = action.payload.requestStatus;

            const selectedRequest = state.find(project => project.ot === ot).parts.find(part => part.id === partId).materialRequest.find(request => request.requestNo === requestNo);

            if (selectedRequest){
                switch (requestStatus){
                    case "materialRequest":
                        selectedRequest.warehouseRequestDate = DateTime.local().toString();
                        selectedRequest.status = "Comprado";
                        break;
                    case "materialEnable":
                        selectedRequest.warehouseArrivalDate = DateTime.local().toString();
                        selectedRequest.status = "Habilitado";
                        break;
                    case "materialDelivery":
                        selectedRequest.userDeliveryDate = DateTime.local().toString();
                        selectedRequest.status = "Entregado";
                        break;
                    case "cancelRequest":
                        selectedRequest.status = "Cancelado";
                        break;
                    default:
                        console.log("Invalid request action");
                }
            }
        },
    }
});

export const { addPart, editPart, deletePart, editSelectedPart, editSelectedQualityMeasure, bootstrapQualityInfo, selectQualityUnit, updateRealMeasure, unselectPart, addMeasure, updateMeasure, deleteMeasure, updateInspectionSettings, addPartsArray, updatePartsOt, addProcess, editProcess, deleteProcess, updatePartInfo, requestMaterial, updateRequestStatus } = partsSlice.actions;
export default partsSlice.reducer;