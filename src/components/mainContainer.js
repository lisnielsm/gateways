import React from 'react';
import Paper from '@mui/material/Paper';
import { Button, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

import "../styles/mainContainer.css";

const MainContainer = () => {

    return (
        <div className="container">
            <h2 className="mt-5 text-center mb-4" style={{color: "var(--gray)"}}>Gateways List</h2>
            
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
        </div>
    )
}

export default MainContainer;