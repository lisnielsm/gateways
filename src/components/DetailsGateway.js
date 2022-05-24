import React, { useEffect, useState } from 'react';
import "../styles/details.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import srvGateway from "../services/gatewaySlice";
import Peripheral from './Peripheral';
import TextField from '@mui/material/TextField';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';

const DetailsGateway = () => {

    const navigate = useNavigate();

    const [detailgateway, setDetailGateway] = useState({
        id: "",
        serialNumber: "",
        name: "",
        ip: "",
        userId: "",
        imageUrl: "",
        peripherals: []
    })

    const detailGateway = useSelector(srvGateway.selector.detailgateway);

    // fill the state automatically
    useEffect(() => {

        if (!detailGateway) return;

        setDetailGateway({
            id: detailGateway.id,
            serialNumber: detailGateway.serialNumber,
            name: detailGateway.name,
            ip: detailGateway.ip,
            userId: detailGateway.userId,
            imageUrl: detailGateway.imageUrl,
            peripherals: detailGateway.peripherals
        });

    }, [detailGateway])

    const handleBackClick = () => {
        // redirect
        return navigate("/");
    }

    return (
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3" style={{ paddingBottom: "5rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Gateway Details</h2>

            <ValidatorForm
                autoComplete="off"
                onSubmit={() => { return; }}
                onError={errors => console.debug(errors)}
                noValidate={true}
            >

                <div className="login-form col-12">

                    <fieldset className="fieldset">
                        <div className="detailField">
                            <div className="text-center w-100">
                                <img
                                    id="image"
                                    src={detailgateway.imageUrl}
                                    className="detailImg"
                                    alt={detailgateway.imageUrl}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <div className="text-center">
                        <TextField
                            name="serialNumber"
                            placeholder="Serial Number"
                            label="Serial Number"
                            variant="outlined"
                            margin="normal"
                            value={detailgateway ? detailgateway.serialNumber : ""}
                            fullWidth
                            disabled
                            className="mb2"
                        />
                    </div>

                    <div className="text-center">
                        <TextField
                            name="name"
                            placeholder="Name"
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            value={detailgateway ? detailgateway.name : ""}
                            fullWidth
                            disabled
                            className="mb2"
                        />
                    </div>

                    <div className="text-center">
                        <TextField
                            name="ip"
                            placeholder="IP"
                            label="IP"
                            variant="outlined"
                            margin="normal"
                            value={detailgateway ? detailgateway.ip : ""}
                            fullWidth
                            disabled
                            className="mb2"
                        />
                    </div>

                    {detailgateway.peripherals.length > 0 ?
                        (
                            detailgateway.peripherals.map((peripheral, index) => (
                                <Peripheral
                                    key={peripheral.id}
                                    element={peripheral}
                                    gateway={detailgateway}
                                    index={index + 1}
                                    detailMode={true}
                                />
                            ))
                        ) : null}

                    <Button
                        variant="contained"
                        className="mt-4 me-0 me-sm-2 w-100"
                        size="large"
                        color="default"
                        fullWidth
                        onClick={handleBackClick}
                    >
                        Back
                    </Button>

                </div>
            </ValidatorForm>

        </div>
    );
}

export default DetailsGateway;