import { createSlice } from '@reduxjs/toolkit';

// Define namespace
const name = "gateway";

// Create slice
export const gatewaySlice = createSlice({
    name,
    initialState: {
        gateways: [],
        deletegateway: null,
        editgateway: null,
        detailgateway: null,
    },
    reducers: {
        onCreateGatewaySuccess: (state, action) => {
            state.gateways = [...state.gateways, action.payload];
        },
        onDownloadGatewaysSuccess: (state, action) => {
            state.gateways = action.payload;
        },
        onDeleteGatewaySuccess: (state, action) => {
            state.gateways = state.gateways.filter(gateway => gateway.id !== action.payload);
            state.deletegateway = null;
        },
        onGetDeleteGateway: (state, action) => {
            state.deletegateway = action.payload;
        },
        onGetClearGateways: (state, action) => {
            state.gateways = [];
        },
        onGetEditGateway: (state, action) => {
            state.editgateway = action.payload;
        },
        onGetDetailGateway: (state, action) => {
            state.detailgateway = action.payload;
        },
        onEditGatewaySuccess: (state, action) => {
            state.editgateway = null;
            state.gateways = state.gateways.map(gateway => gateway.id === action.payload.id ? gateway = action.payload : gateway);
        },
    },
})

// Actions
export const {
    onCreateGatewaySuccess,
    onDownloadGatewaysSuccess,
    onDeleteGatewaySuccess,
    onGetEditGateway,
    onGetDetailGateway,
    onGetDeleteGateway,
    onGetClearGateways,
    onEditGatewaySuccess
} = gatewaySlice.actions