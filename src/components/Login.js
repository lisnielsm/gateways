import React, { useEffect, useState } from 'react';
import { login } from "../firebase/firebase";
import srvUser from "../services/userSlice";
import srvGateways from "../services/gatewaySlice";
import { useDispatch, useSelector } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const user = useSelector(srvUser.selector.user);

    useEffect(() => {

        if (!user) return;

        return navigate("/");

        // eslint-disable-next-line
    }, [user])

    async function initSession() {
        try {
            dispatch(srvUser.action.logout());

            const userAuth = await login(email, password);
            
            dispatch(srvUser.action.login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoUrl: userAuth.user.photoURL,
              }));

              dispatch(srvGateways.action.clearGateways);

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