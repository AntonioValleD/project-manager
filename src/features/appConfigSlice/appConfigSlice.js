import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    token: "",
    serverUrl: "http://localhost:4000"
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