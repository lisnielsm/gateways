import React from 'react';
import firebase, { FirebaseContext } from "./firebase";
import useAuthentication from './hooks/useAuthentication';
import MainContainer from './components/mainContainer';

function App() {
  const user = useAuthentication();

    return (
        <FirebaseContext.Provider
            value={{
                firebase,
                user
            }}
        >
            <MainContainer />
        </FirebaseContext.Provider>

    )
}

export default App;
