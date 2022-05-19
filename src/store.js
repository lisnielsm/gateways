import { configureStore } from '@reduxjs/toolkit'

import gateway from "./services/gatewaySlice";
import user from "./services/userSlice";

export const store = configureStore({
    reducer: {
        [user.name]: user.reducer,
        [gateway.name]: gateway.reducer,
    }
})

export default store;