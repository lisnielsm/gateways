import React, { useState } from 'react';
import { register } from "../firebase/firebase";
import srvUser from "../services/userSlice";
import srvGateways from "../services/srvGateway";
import { useDispatch } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        return value === password;
    });

    async function createAccount() {
        try {
            const userAuth = await register(name, email, password);

            dispatch(srvUser.action.logout());

            dispatch(srvUser.action.login({
                email: userAuth.email,
                uid: userAuth.uid,
                displayName: userAuth.displayName,
                photoUrl: userAuth.photoURL,
            }));
            dispatch(srvGateways.action.clearGateways);
            return navigate("/")
        } catch (error) {
            console.error("There was an error creating the user ", error.message);
        }
    }

    const onSubmitCreate = e => {
        e.preventDefault();

        createAccount();
    }

    return (
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <h2 data-cy="title" data-testid="title" style={{ textAlign: "center", marginTop: "5rem" }}>Create account</h2>

            <ValidatorForm
                autoComplete="off"
                onSubmit={onSubmitCreate}
                noValidate={true}
            >
                <div className="login-form col-12">
                    <div className="text-center">
                        <TextValidator
                            data-cy="name"
                            data-testid="name"
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
                            data-cy="email"
                            data-testid="email"
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
                            data-cy="password"
                            data-testid="password"
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
                            data-cy="confirmpassword"
                            data-testid="confirmpassword"
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

                    <Button
                        data-cy="createBtn"
                        data-testid="createBtn"
                        type="submit"
                        variant="contained"
                        className="mt-4"
                        size="large"
                        color="primary"
                        fullWidth
                    >
                        Create
                    </Button>

                </div>

            </ValidatorForm>
        </div>
    )
}

export default CreateAccount;