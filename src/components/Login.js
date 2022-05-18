import React, { useState } from 'react';
import { login } from "../firebase/firebase";
import { login as loginNow } from "../slices/userSlice";
import { useDispatch } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function initSession() {
        try {
            const userAuth = await login(email, password);
            dispatch(loginNow({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoUrl: userAuth.user.photoURL,
              }));
            return navigate("/");
        } catch (error) {
            console.error("There was an error authenticating the user ", error.message);
        }
    }

    const onSubmitLogin = e => {
        e.preventDefault();

        initSession();
    }

    const handleBackClick = () => {
        // redirect
        return navigate("/");
    }

    return (
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <h2 style={{ textAlign: "center", marginTop: "5rem" }}>Login</h2>

            <ValidatorForm
                autoComplete="off"
                onSubmit={onSubmitLogin}
                onError={errors => console.debug(errors)}
                noValidate={true}
            >
                <div className="login-form mt1 col-xs-12">
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
                            validators={['required']}
                            errorMessages={["Password is required"]}
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
                            Login
                        </Button>
                    </div>
                </div>
            </ValidatorForm>
        </div>
    )
}

export default Login;