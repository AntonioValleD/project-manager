import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    token: "",
    serverUrl: "http://localhost:4000",
    timing: {
      shiftStart: {
        hours: 8,
        minutes: 0
      },
      mondayShiftEnd: { 
        hours: 4,
        minutes: 0
      },
      weekShiftEnd: { 
        hours: 6,
        minutes: 0
      },
    },
    userInfo: {
      id: 35,
      name: "Juan Antonio",
      lastName: "Valle Duran",
      shortName: "JA",
      email: "juan.valle.d1@gmail.com",
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