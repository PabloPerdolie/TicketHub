import { configureStore } from "@reduxjs/toolkit";
import { queryReducer } from "./slices/query";
import { routesReducer } from "./slices/routes";
import { histReducer } from "./slices/searchHist";

export default configureStore({
    reducer: {
        query: queryReducer,
        routes: routesReducer,
        hist: histReducer
    }
})