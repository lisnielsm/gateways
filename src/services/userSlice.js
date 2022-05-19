import { createSlice } from '@reduxjs/toolkit';

// Define namespace
const name = "user";

// Create slice
export const userSlice = createSlice({
    name,
    initialState: {
        user: null,
    },
    reducers: {
        onLogin: (state, action) => {
            state.user = action.payload;
        },
        onLogout: (state) => {
            state.user = null;
        },
    },
});

// Actions
const { onLogin, onLogout } = userSlice.actions;

// Export the slice as a service
const Service = {
    name,
    reducer: userSlice.reducer,
    action: {
        login: onLogin,
        logout: onLogout,
    },
    selector: {
        user: (state) => state[name].user
    },
}

export default Service;