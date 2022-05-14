import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth"

function useAuthentication() {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsuscribe = onAuthStateChanged(auth, user => {
            if(user) {
                setAuthUser(user);
            }
            else {
                setAuthUser(null);
            }
        });

        return () => unsuscribe();
    }, []);

    return authUser;
}

export default useAuthentication;