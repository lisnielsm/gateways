import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContainer from './components/MainContainer01';
import Header from './components/Header01';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import NewGateway from './components/NewGateway';
import EditGateway from './components/EditGateway';
import DetailsGateway from './components/DetailsGateway';
import ProtectedRoute from "./components/ProtectedRoute";

// Redux
import { store } from './store';
import { Provider } from 'react-redux';

function App() {

    return (
        <Router>
            <Provider store={store}>

                <div className="d-flex flex-column justify-content-between w-100 h-100">
                    <div style={{position: "relative"}}>
                        <Header />

                        <div className="container mt-5">

                            <Routes>
                                <Route path='/' element={<ProtectedRoute><MainContainer /></ProtectedRoute>} />
                                <Route path='/createAccount' element={<CreateAccount />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/gateways/new' element={<ProtectedRoute><NewGateway /></ProtectedRoute>} />
                                <Route path='/gateways/edit/:id' element={<ProtectedRoute><EditGateway /></ProtectedRoute>} />
                                <Route path='/gateways/details/:id' element={<ProtectedRoute><DetailsGateway /></ProtectedRoute>} />
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
            </Provider>
        </Router>
    )
}

export default App;
