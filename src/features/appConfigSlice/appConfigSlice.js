import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    token: "",
    serverUrl: "http://localhost:4000",
    timing: {
      shiftStart: { hours: 8 },
      mondayShiftEnd: { hours: 4 },
      weekShiftEnd: { hours: 6 },
    },
    userInfo: {
      id: 35,
      name: "Juan Antonio Valle Duran",
      department: "Proyectos"
    }
}


export const configSlice = createSlice({
    name: "configSlice",
    initialState: initialState,
    reducers: {
        setAppConfig: (state, action) => {
            const configName = action.payload.configName
            const configPayload = action.payload.configPayload

            state[configName] = configPayload
        }
    }
})


export const { setAppConfig } = configSlice.actions

export default configSlice.reducer