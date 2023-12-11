import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookie from "universal-cookie"

const initialState = {
    flights:[],
    trains: []
}

const cookie = new Cookie()

export const fetchFlights = createAsyncThunk('getFlights',
    async (query) => {
        const data = await axios.post(`http://localhost:8080/getFlights`,
        {
            "origin": query.origin,
            "destination": query.destination,
            "departure_at": query.departure_at,
            "return_at": query.return_at
        },
        {
            headers: {
                "Authorization": "Bearer " + cookie.get("token")
            }
        })
        return data.data
    }
)

export const fetchTrains = createAsyncThunk('getTrains',
    async (query) => {
        const data = await axios.post(`http://localhost:8080/getTrains`,
        {
            "from": query.origin,
            "to": query.destination,
            "departureAt": query.departure_at
        },
        {
            headers: {
                "Authorization": "Bearer " + cookie.get("token")
            }
        })
        return data.data
    }
)


export const fetchBuses = createAsyncThunk('getBuses',
    async (query) => {
        const data = await axios.post(`http://localhost:8080/getBuses`,
        {
            "origin": query.origin,
            "destination": query.destination,
            "departure_at": query.departure_at,
            "return_at": query.return_at
        },
        {
            headers: {
                "Authorization": "Bearer " + cookie.get("token")
            }
        })

        return data.data
    }
)

const routesSlice = createSlice({
    name: "routesSlice",
    initialState,
    reducers: {
        setFlights: (state, action) => {
            return {...state, flights: [...action.payload]}
        },
        setTrains: (state, action) => {
            return {...state, trains: [...action.payload]}
        }
    },
    extraReducers: {
        [fetchFlights.fulfilled]: (state, action) => {
            return {...state, flights: [...action.payload]}
        },
        [fetchTrains.fulfilled]: (state, action) => {
            return {...state, trains: [...action.payload]}
        }
    }
})

export const routesReducer = routesSlice.reducer
export const selectRoutes = (state) => state.routes
export const { setFlights, setTrains } = routesSlice.actions