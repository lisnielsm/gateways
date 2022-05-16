import React, { useState } from 'react';
import firebase from '../firebase';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        return value === password;
    });

    async function createAccount() {
        try {
            await firebase.register(name, email, password);
            return navigate("/");
        } catch (error) {
            console.error("There was an error creating the user ", error.message);
        }
    }

    const onSubmitCreate = e => {
        e.preventDefault();

        createAccount();
    }

    const handleBackClick = () => {
        // redirect
        return navigate("/");
    }

    return (
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <h2 style={{ textAlign: "center", marginTop: "5rem" }}>Create account</h2>

            <ValidatorForm
                autoComplete="off"
                onSubmit={onSubmitCreate}
                onError={errors => console.debug(errors)}
                noValidate={true}
            >
                <div className="login-form col-12">
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
                            errorMessages={["Name is required"]}
                            className="mb2"
                        />
                    </div>

                    <div className="text-center">
                        <TextValidator
                            name="email"
                            placeholder="Email"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                            required={true}
                            validators={['required', "isEmail"]}
                            errorMessages={["Email is required", "Please enter a correct email"]}
                            className="mb2"
                        />
                    </div>

                    <div className="text-center">
                        <TextValidator
                            name="password"
                            placeholder="Password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            margin="normal"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            required={true}
                            validators={['required', "minStringLength:6"]}
                            errorMessages={["Password is required", "Password must have at least 6 characters"]}
                            className="mb2"
                        />
                    </div>

                    <div className="text-center">
                        <TextValidator
                            name="confirmpassword"
                            placeholder="Confirm password"
                            label="Confirm password"
                            variant="outlined"
                            type="password"
                            margin="normal"
                            value={confirmpassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            fullWidth
                            required={true}
                            validators={['required', "isPasswordMatch"]}
                            errorMessages={["Confirm password is required", "The confirmation password does not match"]}
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

export default CreateAccount;