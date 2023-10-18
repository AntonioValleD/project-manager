import { createSlice } from '@reduxjs/toolkit'


let initialState = {
    projectArea: [],
    productionArea: [],
    qualityControlArea: [],
    warehouseArea: [],
    
}


export const partLocationSlice = createSlice({
    name: 'partLocationSlice',
    initialState: initialState,
    reducers: {
        addProductionPart: (state, action) => {
            let productionPart = { ...action.payload.part };
            let machine = action.payload.machine;
            productionPart.time.estimatedTime = `${productionPart.time.hours} hrs ${productionPart.time.minuts} min`;

            if (state[machine]) {
                if (productionPart.index === "") {
                    productionPart.index = state[machine].length;
                } else {
                    productionPart.index = parseInt(productionPart.index);
                    if (state[machine].length < productionPart.index){
                        productionPart.index = state[machine].length;
                    } else {
                        state[machine].forEach((part) => {
                            if (part.index >= productionPart.index){
                                part.index ++;
                            }
                        })
                    }
                }
                state[machine].push(productionPart);
            } else {
                productionPart.index = 0;
                state[machine] = [
                    productionPart
                ]
            }
        },
        editProductionPart: (state, action) => {
            console.log(action.payload);
        },
        selectMachinePart: (state, action) => {
            let machine = action.payload.machine;
            let partIndex = action.payload.partId;

            const selectedMachine = state[machine];
            let selectedPart;
            let unselectedPart;
            if (selectedMachine){
                selectedPart = selectedMachine.find(part => part.selected === true);
                unselectedPart = selectedMachine.find(part => part.index === partIndex)
            }

            if (selectedPart) {
                selectedPart.selected = false;
            }
            if (unselectedPart) {
                unselectedPart.selected = true;
            }
        },
        deleteProductionPart: (state, action) => {
            let machine = action.payload.machine;
            const selectedPart = state[machine].find(part => part.selected === true);

            if (selectedPart) {
                state[machine].splice(selectedPart.index, 1);
            }

            let counter = 0;
            state[machine].forEach((part) => {
                part.index = counter;
                counter++;
            })
        },
        startProductionPart: (state, action) => {
            let machine = action.payload.machine;
            const productionPart = state[machine].find(part => part.index === 0);
            if (productionPart){
                productionPart.pinit = true;
                productionPart.controlTime.startTime = Date.now(); 
            }
        },
        pauseProductionPart: (state, action) => {
            let machine = action.payload.machine;
            const productionPart = state[machine].find(part => part.index === 0);
            if (productionPart){
                productionPart.pinit = false;
                productionPart.controlTime.pauseTime = Date.now(); 
            }
        },
        continueProductionPart: (state, action) => {
            let machine = action.payload.machine;
            const productionPart = state[machine].find(part => part.index === 0);
            if (productionPart){
                productionPart.pinit = true;
                productionPart.controlTime.restartTime = Date.now();
                productionPart.controlTime.deathTime += (productionPart.controlTime.restartTime - productionPart.controlTime.pauseTime);
            }
        },
        stopProductionPart: (state, action) => {
            let machine = action.payload.machine;
            const productionMachine = state[machine];
            if (productionMachine){ 
                productionMachine.splice(0, 1);

                let counter = 0;
                productionMachine.forEach((process) => {
                    process.index = counter;
                    counter ++;
                })
            }
        },
        updateFinishedParts: (state, action) => {
            let machine = action.payload.machine;
            let totalFinishedParts = action.payload.totalFinishedParts;
            const productionPart = state[machine].find(part => part.index === 0);
            if (productionPart){
                productionPart.finished = totalFinishedParts;
                if (productionPart.finished === productionPart.quantity){
                    productionPart.pinit = false;
                }
            }
        },
        setPartRealTime: (state, action) => {
            let machine = action.payload.machine;
            let realTime = action.payload.realTime;
            const partList = state[machine];
            if (partList){
                const productionPart = partList.find(part => part.index === 0);
                if (productionPart.time && realTime){
                    productionPart.time.realTime = realTime;
                }
            }
        }
    }
});

export const { addProductionPart, editProductionPart, deleteProductionPart, selectMachinePart, startProductionPart, pauseProductionPart, continueProductionPart, stopProductionPart, updateFinishedParts, setPartRealTime } = partLocationSlice.actions
export default partLocationSlice.reducer