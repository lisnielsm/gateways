import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import firebase, { FirebaseContext } from "./firebase";
import useAuthentication from './hooks/useAuthentication';
import MainContainer from './components/MainContainer';
import Header from './components/Header';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';

function App() {
    const user = useAuthentication();

    return (
        <Router>
            <FirebaseContext.Provider
                value={{
                    firebase,
                    user
                }}
            >
                <div className="d-flex flex-column justify-content-between w-100 h-100">
                    <div>
                        <Header />

                        <div className="container mt-5">

                            <Routes>
                                <Route path='/' element={<MainContainer />} />
                                <Route path='/createAccount' element={<CreateAccount />} />
                                <Route path='/login' element={<Login />} />
                            </Routes>
                        </div>
                    </div>
                    <div>
                        <footer className="footer">
                            <div className="d-flex justify-content-center align-items-center">
                                <div><span>{'\u00A9'}</span> 2022 Lisniel Sánchez Morales</div>
                            </div>
                        </footer>
                    </div>
                </div>
            </FirebaseContext.Provider>
        </Router>
    )
}

export default App;
