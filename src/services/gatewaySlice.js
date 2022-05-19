import { createSlice } from '@reduxjs/toolkit';
import { db } from "../firebase/firebase";
import Swal from 'sweetalert2';
import { collection, query, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

// Define namespace
const name = "gateway";

// Create slice
export const gatewaySlice = createSlice({
    name,
    initialState: {
        gateways: [],
        error: null,
        loading: false,
        deletegateway: null,
        editgateway: null
    },
    reducers: {
        onCreateGateway: (state, action) => {
            state.loading = action.payload
        },
        onStartGatewaysDownload: (state, action) => {
            state.loading = action.payload
        },
        onCreateGatewaySuccess: (state, action) => {
            state.loading = false;
            state.gateways = [...state.gateways, action.payload];
            state.error = false;
        },
        onCreateGatewayFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        onDownloadGatewaysFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        onDeleteGatewayFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        onEditGatewayFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        onDownloadGatewaysSuccess: (state, action) => {
            state.gateways = action.payload;
            state.error = null;
            state.loading = false;
        },
        onDeleteGatewaySuccess: (state, action) => {
            state.gateways = state.gateways.filter(gateway => gateway.id !== state.deletegateway);
            state.deletegateway = null;
        },
        onGetEditGateway: (state, action) => {
            state.deletegateway = action.payload;
        },
        onGetDeleteGateway: (state, action) => {
            state.editgateway = action.payload;
        },
        onEditGatewaySuccess: (state, action) => {
            state.editgateway = null;
            state.gateways = state.gateways.map(gateway => gateway.id === action.payload.id ? gateway = action.payload : gateway);
        },
    },
})

// Actions
export const {
    onCreateGateway,
    onStartGatewaysDownload,
    onCreateGatewaySuccess,
    onCreateGatewayFail,
    onDownloadGatewaysFail,
    onDeleteGatewayFail,
    onEditGatewayFail,
    onDownloadGatewaysSuccess,
    onDeleteGatewaySuccess,
    onGetEditGateway,
    onGetDeleteGateway,
    onEditGatewaySuccess
} = gatewaySlice.actions

// create new gateway
const onCreateNewGateway = gateway => dispatch => {

    dispatch(onCreateGateway(true));

    try {
        addDoc(collection(db, "gateways"), gateway)
            .then(data => {
                dispatch(onCreateGatewaySuccess(gateway));

                // Alert 
                Swal.fire(
                    'Correct',
                    'The gateway was added correctly',
                    'success'
                );
            });
    } catch (error) {
        console.error("Error adding document: ", error);
        dispatch(onCreateGatewayFail(true));
    }
}

// Function that downloads gateways from the database
const onGetGateways = dispatch => {

    try {
        const q = query(collection(db, "gateways"));
        getDocs(q)
            .then(querySnapshot => {
                const gateways = querySnapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });

                // if all goes well update the state
                dispatch(onDownloadGatewaysSuccess(gateways));
            })
    } catch (error) {
        console.log(error.response);

        // if there is an error change the state
        dispatch(onDownloadGatewaysFail());

        // Error alert
        Swal.fire({
            icon: 'error',
            title: 'There was an error',
            text: 'There was an error, please try again'
        });
    }
}

// Select and delete the gateway
const onDeleteGateway = id => dispatch => {

    dispatch(onGetDeleteGateway(id));

    try {
        deleteDoc(doc(db, "gateways", id))
            .then(data => {
                dispatch(onDeleteGatewaySuccess());

                Swal.fire(
                    'Deleted',
                    'The gateway was deleted successfully',
                    'success'
                );
            })
    } catch (error) {
        console.log(error.response);
        dispatch(onDeleteGatewayFail(true));
    }
};

// get editing gateway
const onGetEditGateWay = gateway => dispatch => {
    dispatch(onGetEditGateway(gateway));
}

// edit a gateway
const onEditGateway = gateway => dispatch => {

    try {
        const gatewayQuery = doc(db, "gateways", gateway.id);
        updateDoc(gatewayQuery, {
            ...gateway
        });
        dispatch(onEditGatewaySuccess(gateway));

    } catch (error) {
        console.log(error);
        dispatch(onEditGatewayFail(true));
    }
}

// Export the slice as a service
const Service = {
    name,
    reducer: gatewaySlice.reducer,
    action: {
        createNewGateway: onCreateNewGateway,
        getGateways: onGetGateways,
        deleteGateway: onDeleteGateway,
        getEditGateway: onGetEditGateWay,
        editGateway: onEditGateway,
    },
    selector: {
        gateways: (state) => state[name].gateways,
        error: (state) => state[name].error,
        loading: (state) => state[name].loading,
        deletegateway: (state) => state[name].deletegateway,
        editgateway: (state) => state[name].editgateway,
    },
}

export default Service;
