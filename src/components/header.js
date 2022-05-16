import React, { useContext } from 'react';
import { FirebaseContext } from '../firebase';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import "../styles/header.css";

const Header = () => {

    const {user, firebase} = useContext(FirebaseContext);

    return (
        <header style={{borderBottom: "2px solid #e1e1e1", padding: "1rem 0"}}>
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
                                onClick={() => firebase.closeSession()}
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