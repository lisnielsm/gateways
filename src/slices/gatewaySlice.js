import { createSlice } from '@reduxjs/toolkit'

export const gatewaySlice = createSlice({
    name: 'gateway',
    initialState: {
        gateways: [],
        error: null,
        loading: false,
        deletegateway: null,
        editgateway: null
    },
    reducers: {
        createGateway: (state, action) => {
            state.loading = action.payload
        },
        startGatewaysDownload: (state, action) => {
            createGateway(state, action);
        },
        createGatewaySuccess: (state, action) => {
            state.loading = false;
            state.gateways = [...state.gateways, action.payload];
            state.error = false;
        },
        createGatewayFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        downloadGatewayFail: (state, action) => {
            createGatewayFail(state, action);
        },
        deleteGatewayFail: (state, action) => {
            createGatewayFail(state, action);
        },
        editGatewayFail: (state, action) => {
            createGatewayFail(state, action);
        },
        downloadGatewaysSuccess: (state, action) => {
            state.gateways = action.payload;
            state.error = null;
            state.loading = false;
        },
        deleteGatewaySuccess: (state, action) => {
            state.gateways = state.gateways.filter(gateway => gateway.id !== state.deletegateway);
            state.deletegateway = null;
        },
        getEditGateway: (state, action) => {
            state.deletegateway = action.payload;
        },
        getDeleteGateway: (state, action) => {
            state.editgateway = action.payload;
        },
        editGatewaySuccess: (state, action) => {
            state.editgateway = null;
            state.gateways = state.gateways.map(gateway => gateway.id === action.payload.id ? gateway = action.payload : gateway);
        },
    },
})

// Action creators are generated for each case reducer function
export const { createGateway, startGatewaysDownload, createGatewaySuccess, createGatewayFail, downloadGatewayFail,
    deleteGatewayFail, editGatewayFail, downloadGatewaysSuccess, deleteGatewaySuccess, getEditGateway,
    getDeleteGateway, editGatewaySuccess } = gatewaySlice.actions

// selectors
export const selectGateway = (state) => state.gateway.gateway;

export default gatewaySlice.reducer