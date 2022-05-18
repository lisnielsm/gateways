import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth, onAuthStateChanged } from "../firebase/firebase";
import { login, logout } from '../slices/userSlice';

function useAuthentication() {

    const dispatch = useDispatch();
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, user => {
            if(user) {
                setUserAuth(user);
                dispatch(
                    login({
                      email: user.email,
                      uid: user.uid,
                      displayName: user.displayName,
                      photoUrl: user.photoURL,
                    })
                  );
            }
            else {
                dispatch(logout());
                setUserAuth(null);
            }
        });

        return () => unsuscribe();
        // eslint-disable-next-line
    }, []);

    return userAuth;
}

export default useAuthentication;