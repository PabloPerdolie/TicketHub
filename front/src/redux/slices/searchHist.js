import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "universal-cookie"

const initialState = {
    flights:[],
    trains: []
}

const cookie = new Cookie()

export const fetchFlightsHist = createAsyncThunk('getFlightsHist',
    async () => {
        const data = await axios.get(`http://localhost:8080/get_flight_search_history`,
        {
            headers: {
                "Authorization": "Bearer " + cookie.get("token")
            }
        })
        return data.data
    }
)

export const fetchTrainsHist = createAsyncThunk('getTrainsHist',
    async () => {
        const data = await axios.get(`http://localhost:8080/get_train_search_history`,
        {
            headers: {
                "Authorization": "Bearer " + cookie.get("token")
            }
        })
        console.log(data)

        return data.data
    }
)


export const fetchBusesHist = createAsyncThunk('getBusesHist',
    async () => {
        const data = await axios.get(`http://localhost:8080/get_bus_search_history`,
        {
            headers: {
                "Authorization": "Bearer " + cookie.get("token")
            }
        })
        return data.data
    }
)

const histSlice = createSlice({
    name: "histSlice",
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchFlightsHist.fulfilled]: (state, action) => {
            return {...state, flights: [...action.payload]}
        },
        [fetchTrainsHist.fulfilled]: (state, action) => {
            return {...state, trains: [...action.payload.map((elem) => 
                {
                    return {
                        id: elem.id,
                        origin: elem.from,
                        destination: elem.to,
                        departure_at: elem.departureAt,
                        created_at: elem.createdAt
                    }
                }
            )]}
        }
    }
})

export const histReducer = histSlice.reducer
export const selectHist = (state) => state.hist