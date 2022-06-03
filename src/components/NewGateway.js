import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DropzoneArea } from 'material-ui-dropzone';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject  } from "firebase/storage";
import { storage } from '../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import srvUser from "../services/userSlice";
// import srvGateway from "../services/gatewaySlice";
import srvGateway from "../services/srvGateway";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import Peripheral from './Peripheral';
import Swal from 'sweetalert2';

const NewGateway = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [imageId, setImageId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [newgateway, setNewGateway] = useState({
        serialNumber: "",
        name: "",
        ip: "",
        imageUrl: "",
        peripherals: []
    })

    const user = useSelector(srvUser.selector.user);

    // Read the form data
    const onChangeForm = e => {
        setNewGateway({
            ...newgateway,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitCreate = e => {
        e.preventDefault();

        dispatch(srvGateway.action.createNewGateway({...newgateway, userId: user.uid}, () => {
            return navigate("/")
        }));
    }

    const handleBackClick = async () => {
        // If the image is set, it must be deleted from the storage
        if(imageId) {
            try {
                const fileRef = ref(storage, `gateways/${imageId}`);
                await deleteObject(fileRef);
            } catch (error) {
                console.log(error)
            }
        }

        // redirect
        return navigate("/");
    }

    const handleFileChange = async files => {

        try {
            if (files[0]) {
                setLoading(true);
                const id = uuidv4();
                setImageId(id);
                const storageRef = ref(storage, `gateways/${id}`);
                const uploadTask = await uploadBytesResumable(storageRef, files[0], 'data_url');

                const url = await getDownloadURL(uploadTask.ref);

                setLoading(false);

                setNewGateway({ ...newgateway, imageUrl: url })
            }
        } catch (error) {
            console.error("Error saving the document: ", error);
        }
    }

    const handleNewPeripheral = () => {
        if (newgateway.peripherals.length === 10) {
            Swal.fire({
                icon: 'error',
                title: 'Maximum reached',
                text: 'Each gateway has a maximum of 10 peripherals'
            });

            return;
        }

        const newPeripheral = {
            id: uuidv4(),
            uid: "",
            vendor: "",
            creationDate: Date.now(),
            status: false
        }

        setNewGateway({ ...newgateway, peripherals: [...newgateway.peripherals, newPeripheral] });
    }

    const deletePeripheral = id => {
        setNewGateway({ ...newgateway, peripherals: newgateway.peripherals.filter(peripheral => peripheral.id !== id) });
    }

    return (
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3" style={{ paddingBottom: "5rem" }}>
            <h2 data-cy="title" style={{ textAlign: "center" }}>Create new gateway</h2>

            <ValidatorForm
                data-cy="newGatewayForm"
                autoComplete="off"
                onSubmit={onSubmitCreate}
                onError={errors => console.debug(errors)}
                noValidate={true}
            >
                <div data-cy="gatewayContainer" className="login-form col-12">
                    <fieldset data-cy="imgContainer" className="fieldset">
                        <legend style={{ fontSize: "20px" }}>Image</legend>
                        <div className="text-center mt-3 mb-1">
                            <DropzoneArea
                                acceptedFiles={['image/*']}
                                filesLimit={1}
                                onChange={handleFileChange}
                            />
                        </div>
                    </fieldset>

                    <div className="text-center">
                        <TextValidator
                            data-cy="serialNumber"
                            name="serialNumber"
                            placeholder="Serial Number"
                            label="Serial Number"
                            variant="outlined"
                            margin="normal"
                            value={newgateway ? newgateway.serialNumber : ""}
                            onChange={onChangeForm}
                            fullWidth
                            required={true}
                            validators={['required']}
                            errorMessages={["The serial number is required"]}
                            className="mb2"
                        />
                    </div>

                    <div className="text-center">
                        <TextValidator
                            data-cy="name"
                            name="name"
                            placeholder="Name"
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            value={newgateway ? newgateway.name : ""}
                            onChange={onChangeForm}
                            fullWidth
                            required={true}
                            validators={['required']}
                            errorMessages={["The name is required"]}
                            className="mb2"
                        />
                    </div>

                    <div className="text-center">
                        <TextValidator
                            data-cy="ip"
                            name="ip"
                            placeholder="IP"
                            label="IP"
                            variant="outlined"
                            margin="normal"
                            value={newgateway ? newgateway.ip : ""}
                            onChange={onChangeForm}
                            fullWidth
                            required={true}
                            validators={["required", "matchRegexp:^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\\.(?!$)|$)){4}$"]}
                            errorMessages={["IP is required", "IP must be a v4 valid IP"]}
                            className="mb2"
                        />
                    </div>

                    <div data-cy="peripherals">
                        {newgateway.peripherals.length > 0 ?
                            (
                                newgateway.peripherals.map((peripheral, index) => (
                                    <Peripheral
                                        key={peripheral.id}
                                        element={peripheral}
                                        gateway={newgateway}
                                        index={index + 1}
                                        setGateway={setNewGateway}
                                        deletePeripheral={deletePeripheral}
                                    />
                                ))
                            ) : null}
                    </div>

                    <div className="d-flex justify-content-start w-100">
                        <Button
                            data-cy="newPeripheralBtn"
                            variant="outlined"
                            className="newBtn grayShadow my-3"
                            startIcon={<AddIcon />}
                            size="large"
                            color="primary"
                            onClick={handleNewPeripheral}
                        >
                            New Peripheral
                        </Button>
                    </div>

                    <div className="d-flex flex-column flex-sm-row w-100">
                        <Button
                            data-cy="backBtn"
                            variant="contained"
                            className="mt-4 me-0 me-sm-2 w-100"
                            size="large"
                            color="default"
                            onClick={handleBackClick}
                        >
                            Back
                        </Button>

                        <Button
                            data-cy="newGatewayBtn"
                            type="submit"
                            variant="contained"
                            className="mt-4 ms-0 ms-sm-2 w-100"
                            size="large"
                            color="primary"
                            disabled={loading}
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