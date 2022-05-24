import { createSlice } from '@reduxjs/toolkit';
import { db, storage } from "../firebase/firebase";
import Swal from 'sweetalert2';
import { collection, query, getDocs, addDoc, deleteDoc, updateDoc, doc, where } from "firebase/firestore";
import { ref, listAll, deleteObject } from "firebase/storage";

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
            state.gateways = state.gateways.filter(gateway => gateway.id !== state.deletegateway);
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

// create new gateway
const onCreateNewGateway = (gateway, callback) => dispatch => {

    try {
        addDoc(collection(db, "gateways"), gateway)
            .then(data => {
                dispatch(onCreateGatewaySuccess({ ...gateway, id: data.id }));

                // Alert 
                Swal.fire(
                    'Correct',
                    'The gateway was added correctly',
                    'success'
                );

                callback();
            });
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

// Function that downloads gateways from the database
const onGetGateways = user => dispatch => {

    if (!user) return;

    try {
        const q = query(collection(db, "gateways"), where("userId", "==", user.uid));
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

        // Error alert
        Swal.fire({
            icon: 'error',
            title: 'There was an error',
            text: 'There was an error, please try again'
        });
    }
}

// Select and delete the gateway
const onDeleteGateway = gateway => dispatch => {

    dispatch(onGetDeleteGateway(gateway.id));

    const imageUrl = gateway.imageUrl;

    const listRef = ref(storage, 'gateways/');
    listAll(listRef)
        .then((res) => {
            console.log(res)

            res.items.forEach((itemRef) => {
                if (imageUrl.includes(itemRef.name)) {
                    // Delete the image from storage
                    deleteObject(itemRef);
                }
            });
        }).catch((error) => {
            console.log(error);
        });

    try {
        deleteDoc(doc(db, "gateways", gateway.id))
            .then(data => {
                dispatch(onDeleteGatewaySuccess());

                Swal.fire(
                    'Deleted',
                    'The gateway was deleted successfully',
                    'success'
                );
            })
    } catch (error) {
        console.log(error);
    }
};

// Clear gateways
const onClearGateways = dispatch => {
    dispatch(onGetClearGateways());
};

// get editing gateway
const onGetEditGateWay = gateway => dispatch => {
    dispatch(onGetEditGateway(gateway));
}

// get gateway's details 
const onGetDetailGateWay = gateway => dispatch => {
    dispatch(onGetDetailGateway(gateway));
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
        getDetailGateway: onGetDetailGateWay,
        clearGateways: onClearGateways,
    },
    selector: {
        gateways: (state) => state[name].gateways,
        deletegateway: (state) => state[name].deletegateway,
        editgateway: (state) => state[name].editgateway,
        detailgateway: (state) => state[name].detailgateway,
    },
}

export default Service;
