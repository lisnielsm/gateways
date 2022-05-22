import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TextValidator } from 'react-material-ui-form-validator';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@material-ui/core';

const StatusSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const Peripheral = ({ element, peripherals, setPeripherals, deletePeripheral }) => {

    const [uid, setUID] = useState("");
    const [vendor, setVendor] = useState("");
    const [status, setStatus] = useState(false);

    const handleUIDChange = e => {
        setUID(e.target.value);
        setPeripherals(peripherals.map(p => p.id === element.id ? { ...p, uid: e.target.value } : p));
    }

    const handleVendorChange = e => {
        setVendor(e.target.value);
        setPeripherals(peripherals.map(p => p.id === element.id ? { ...p, vendor: e.target.value } : p));
    }

    const handleStatusChange = e => {
        setPeripherals(peripherals.map(p => p.id === element.id ? { ...p, status: !status } : p));
        setStatus(!status);
    }

    return (
        <fieldset className="fieldset">
            <div className="text-center">
                <TextValidator
                    name="uid"
                    placeholder="UID"
                    label="UID"
                    variant="outlined"
                    margin="normal"
                    value={uid}
                    onChange={handleUIDChange}
                    fullWidth
                    required={true}
                    validators={['required']}
                    errorMessages={["The UID is required"]}
                    className="mb2"
                />
            </div>

            <div className="text-center">
                <TextValidator
                    name="vendor"
                    placeholder="Vendor"
                    label="Vendor"
                    variant="outlined"
                    margin="normal"
                    value={vendor}
                    onChange={handleVendorChange}
                    fullWidth
                    required={true}
                    validators={['required']}
                    errorMessages={["The vendor is required"]}
                    className="mb2"
                />
            </div>

            <div className="d-flex justify-content-between w-100">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Offline</Typography>
                    <FormControlLabel
                        control={<StatusSwitch sx={{ m: 1 }} onChange={handleStatusChange} />}
                    />
                    <Typography>Online</Typography>
                </Stack>

                <Tooltip title="Delete Peropheral" placement="bottom">
                    <div className="d-inline">
                        <IconButton onClick={() => deletePeripheral(element.id)}>
                            <DeleteIcon style={{color: "var(--bs-red)"}} />
                        </IconButton>
                    </div>
                </Tooltip>
            </div>

        </fieldset>
    );
}

export default Peripheral;