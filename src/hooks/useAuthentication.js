import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth, onAuthStateChanged } from "../firebase/firebase";
import srvUser from '../services/userSlice';

function useAuthentication() {

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(
                    srvUser.action.login({
                        email: user.email,
                        uid: user.uid,
                        displayName: user.displayName,
                        photoUrl: user.photoURL,
                    })
                );
            }
            else {
                dispatch(srvUser.action.logout());
            }
        });

        return () => unsubscribe();
        // eslint-disable-next-line
    }, []);
}

export default useAuthentication;