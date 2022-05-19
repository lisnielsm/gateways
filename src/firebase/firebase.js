import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyB4WcjTc8Ezzl844J6HBzv5bK_Gur7c5RY",
    authDomain: "gateways-d801e.firebaseapp.com",
    projectId: "gateways-d801e",
    storageBucket: "gateways-d801e.appspot.com",
    messagingSenderId: "861405959319",
    appId: "1:861405959319:web:55071052a169fa3e9545d2",
};

const app = initializeApp(firebaseConfig);

//init services
const auth = getAuth();

const db = getFirestore(app);

const storage = getStorage();

// Register a user
const register = async (name, email, password) => {
    const authentication = getAuth();
    const newUser = await createUserWithEmailAndPassword(authentication, email, password);

    await updateProfile(newUser.user, {
        displayName: name
    });

    return newUser.user;
}

// Login of a user
const login = async (email, password) => {
    const authentication = getAuth();
    return await signInWithEmailAndPassword(authentication, email, password);
}

// Close the user session
const closeSession = async () => {
    const authentication = getAuth();
    return await signOut(authentication);
}

export {
    auth,
    db,
    storage,
    onAuthStateChanged,
    register,
    login,
    closeSession
}

