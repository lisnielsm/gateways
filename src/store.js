import { configureStore } from '@reduxjs/toolkit'
import gatewayReducer from "./slices/gatewaySlice";

export const store = configureStore({
    reducer: {
        gateway: gatewayReducer,
    },
})

export default store;