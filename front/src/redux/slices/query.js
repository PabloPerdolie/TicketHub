import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: "",
    destination: "",
    departure_at: "",
    return_at: "",
    vehicles: []
}

const querySlice = createSlice({
    name: "querySlice",
    initialState,
    reducers: {
        setQuery: (state, action) => {
            return action.payload
        }
    }
})

export const queryReducer = querySlice.reducer
export const {setQuery} = querySlice.actions
export const selectQuery = (state) => state.query