import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import srvUser from "../services/userSlice";
import { closeSession } from "../firebase/firebase";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

import "../styles/header.css";
import useAuthentication from '../hooks/useAuthentication';

const Header = () => {

    useAuthentication();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(srvUser.selector.user);

    const logoutOfApp = () => {
        // dispatch to the store with the logout action
        dispatch(srvUser.action.logout());
        // close session from firebase
        closeSession();
      };

      const handleLogoClick = () => {
          return navigate("/");
      }

    return (
        <header className="header">
            <div className="headerContainer">
                <div style={{display: "flex", alignItems: "center"}}>
                    <div data-testid="logo" className="logo" onClick={handleLogoClick}>Gateways</div>
                </div>

                <div style={{display: "flex", alignItems: "center"}}>
                    {user ? (
                        <div className="d-flex flex-wrap align-items-center">
                            <p style={{marginRight: "2rem", marginBottom: "0"}}>Hello: {user.displayName}</p>

                            <Button
                                data-cy="btnCloseSesion"
                                variant="outlined"
                                size="medium"
                                color="primary"
                                className="menuBtn"
                                onClick={() => logoutOfApp()}
                            >
                                Close Session
                            </Button>
                        </div>
                    ) : (
                        <div className="d-flex flex-wrap">
                            <Button
                                data-testid="login"
                                id="btnLogin"
                                component={Link}
                                to="/login"
                                variant="outlined"
                                size="medium"
                                color="primary"
                                className="menuBtn me-3"
                            >
                                Login
                            </Button>
                            
                            <Button
                                data-testid="createAccount"
                                component={Link}
                                to="/createAccount"
                                variant="outlined"
                                size="medium"
                                color="primary"
                                className="menuBtn"
                            >
                                Create Account
                            </Button>
                        </div>
                    )}

                </div>
            </div>
        </header>
    );
}

export default Header;