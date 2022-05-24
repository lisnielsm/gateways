import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Button, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import srvGateways from "../services/gatewaySlice";
import srvUser from "../services/userSlice";

import "../styles/mainContainer.css";
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
    root: {

        "& .MuiTablePagination-select": {
            paddingBottom: "0.2rem !important"
        },

        "& .MuiTablePagination-selectLabel": {
            marginBottom: "0 !important"
        },

        "& .MuiTablePagination-displayedRows": {
            marginBottom: "0 !important"
        },

        "& .MuiButtonBase-root.MuiIconButton-root": {
            padding: "8px"
        },

        "& .MuiDataGrid-columnHeaders": {
            color: "white",
            backgroundColor: "var(--orange)"
        },

        "& .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeSmall": {
            color: "white"
        },

        "& .MuiDataGrid-columnSeparator svg": {
            height: "100%"
        },

        "& .MuiDataGrid-columnHeader": {
            outline: "none !important"
        }
    },

});

const MainContainer = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();

    const [pageSize, setPageSize] = useState(20);

    const user = useSelector(srvUser.selector.user);
    const gateways = useSelector(srvGateways.selector.gateways);

    useEffect(() => {

        if (gateways.length > 0) return;

        if (!user) return;

        dispatch(srvGateways.action.getGateways(user));

        // eslint-disable-next-line
    }, [user])

    const columns = [
        {
            field: 'col1',
            headerName: 'Options',
            width: 150,
            sortable: false,
            renderCell: (cellValues) => {
                return (
                    <div className={classes.root}>
                        <Tooltip title="Edit Gateway" placement="bottom">
                            <div className="d-inline">
                                <IconButton onClick={() => goToGatewayEdit(cellValues.id)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                            </div>
                        </Tooltip>

                        <Tooltip title="Delete Gateway" placement="bottom">
                            <div className="d-inline">
                                <IconButton onClick={() => confirmDeleteGateway({
                                    id: cellValues.row.id,
                                    imageUrl: cellValues.row.col5
                                })}>
                                    <DeleteIcon style={{ color: "var(--bs-red)" }} />
                                </IconButton>
                            </div>
                        </Tooltip>

                        <Tooltip title="Gateway Details" placement="bottom">
                            <div className="d-inline">
                                <IconButton onClick={() => goToDetails(cellValues.id)}>
                                    <InfoIcon style={{ color: "var(--bs-orange)" }} />
                                </IconButton>
                            </div>
                        </Tooltip>
                    </div>
                );
            }
        },
        { field: 'col2', headerName: 'Serial Number', width: 220 },
        { field: 'col3', headerName: 'Name', width: 240 },
        { field: 'col4', headerName: 'Address', width: 180 },
        {
            field: 'col5',
            headerName: 'Image',
            width: 70,
            sortable: false,
            renderCell: (cellValues) => {
                return (
                    <div className="d-flex justify-content-center align-items-center">
                        <img src={cellValues.row.col5} className="gatewayImage" alt="" />
                    </div>
                );
            }
        },
    ];

    const rows = gateways.map(gateway => ({
        id: gateway.id,
        col2: gateway.serialNumber,
        col3: gateway.name,
        col4: gateway.ip,
        col5: gateway.imageUrl
    }));

    const handleCellClick = (param, event) => {
        event.stopPropagation();
    };

    const handleRowClick = (param, event) => {
        event.stopPropagation();
    };

    // confirm if user want to delete the gateway
    const confirmDeleteGateway = gateway => {

        Swal.fire({
            title: '¿Are you sure?',
            text: "A product that is deleted cannot be recovered",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3f51b5',
            cancelButtonColor: 'var(--bs-red)',
        }).then(result => {
            if (result.value) {
                dispatch(srvGateways.action.deleteGateway(gateway));
            }
        })
    }

    // function that redirect in controlled way
    const goToGatewayEdit = id => {
        //get the gateway by this id
        const gateway = gateways.find(gateway => gateway.id === id);

        dispatch(srvGateways.action.getEditGateway(gateway));
        // redirect
        return navigate(`/gateways/edit/${gateway.id}`);
    }

    // function that redirect in controlled way
    const goToDetails = id => {
        //get the gateway by this id
        const gateway = gateways.find(gateway => gateway.id === id);

        dispatch(srvGateways.action.getDetailGateway(gateway));
        // redirect
        return navigate(`/gateways/details/${gateway.id}`);
    }

    return (
        <div className="container overflow-auto" style={{paddingBottom: "4rem"}}>
            <h2 className="text-center" style={{ color: "var(--gray)" }}>Gateways List</h2>

            <div className="d-flex justify-content-start w-100">
                <Button
                    component={Link}
                    to="/gateways/new"
                    variant="outlined"
                    className="newBtn grayShadow my-4"
                    startIcon={<AddIcon />}
                    size="large"
                    color="primary"
                >
                    New Gateway
                </Button>
            </div>

            <Paper elevation={8} sx={{ height: "500px", width: '100%', overflow: 'hidden', marginTop: "1rem" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    className={classes.root}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 20, 100]}
                    pagination
                    onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                />
            </Paper>
        </div>
    )
}

export default MainContainer;