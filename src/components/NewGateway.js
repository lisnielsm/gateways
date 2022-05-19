import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import srvUser from "../services/userSlice";
import srvGateway from "../services/gatewaySlice";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

const NewGateway = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [serialNumber, setSerialNumber] = useState("");
    const [name, setName] = useState("");
    const [ip, setIp] = useState("");

    const user = useSelector(srvUser.selector.user);

    const onSubmitCreate = e => {
        e.preventDefault();

        dispatch(srvGateway.action.createNewGateway({
            serialNumber,
            name,
            ip,
            userId: user.uid,
            devices: []
        }));

        return navigate("/");
    }

    const handleBackClick = () => {
        // redirect
        return navigate("/");
    }

    return (
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <h2 style={{ textAlign: "center", marginTop: "5rem" }}>Create new gateway</h2>

            <ValidatorForm
                autoComplete="off"
                onSubmit={onSubmitCreate}
                onError={errors => console.debug(errors)}
                noValidate={true}
            >
                <div className="login-form col-12">
                    <div className="text-center">
                        <TextValidator
                            name="serialNumber"
                            placeholder="Serial Number"
                            label="Serial Number"
                            variant="outlined"
                            margin="normal"
                            value={serialNumber}
                            onChange={e => setSerialNumber(e.target.value)}
                            fullWidth
                            required={true}
                            validators={['required']}
                            errorMessages={["The serial number is required"]}
                            className="mb2"
                        />
                    </div>

                    <div className="text-center">
                        <TextValidator
                            name="name"
                            placeholder="Name"
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            fullWidth
                            required={true}
                            validators={['required']}
                            errorMessages={["The name is required"]}
                            className="mb2"
                        />
                    </div>

                    <div className="text-center">
                        <TextValidator
                            name="ip"
                            placeholder="IP"
                            label="IP"
                            variant="outlined"
                            margin="normal"
                            value={ip}
                            onChange={e => setIp(e.target.value)}
                            fullWidth
                            required={true}
                            validators={["required", "matchRegexp:^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\\.(?!$)|$)){4}$"]}
                            errorMessages={["IP is required", "IP must be a v4 valid IP"]}
                            className="mb2"
                        />
                    </div>

                    <div className="d-flex flex-column flex-sm-row w-100">
                        <Button
                            variant="contained"
                            className="mt-4 me-0 me-sm-2 w-100"
                            size="large"
                            color="default"
                            onClick={handleBackClick}
                        >
                            Back
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            className="mt-4 ms-0 ms-sm-2 w-100"
                            size="large"
                            color="primary"
                        >
                            Create
                        </Button>
                    </div>

                </div>

            </ValidatorForm>
        </div>
    )
}

export default NewGateway;