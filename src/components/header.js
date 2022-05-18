import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../slices/userSlice";
import { closeSession } from "../firebase/firebase";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import "../styles/header.css";
import useAuthentication from '../hooks/useAuthentication';

const Header = () => {

    const user = useAuthentication();
    const dispatch = useDispatch();

    console.log(user)

    const logoutOfApp = () => {
        // dispatch to the store with the logout action
        dispatch(logout());
        // close session from firebase
        closeSession();
      };

    return (
        <header style={{borderBottom: "2px solid var(--gray2)", padding: "1rem 0"}}>
            <div className="headerContainer">
                <div style={{display: "flex", alignItems: "center"}}>
                    <Link to="/" className="logo">Gateways</Link>
                </div>

                <div style={{display: "flex", alignItems: "center"}}>
                    {user ? (
                        <>
                            <p style={{marginRight: "2rem", marginBottom: "0"}}>Hello: {user.displayName}</p>

                            <Button
                                variant="outlined"
                                size="medium"
                                color="primary"
                                className="menuBtn"
                                onClick={() => logoutOfApp()}
                            >
                                Close Session
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                component={Link}
                                to="/login"
                                variant="outlined"
                                size="medium"
                                color="primary"
                                className="menuBtn"
                                style={{marginRight: "1rem"}}
                            >
                                Login
                            </Button>
                            
                            <Button
                                component={Link}
                                to="/createAccount"
                                variant="outlined"
                                size="medium"
                                color="primary"
                                className="menuBtn"
                            >
                                Create Account
                            </Button>
                        </>
                    )}

                </div>
            </div>
        </header>
    );
}

export default Header;