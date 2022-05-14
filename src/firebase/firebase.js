import firebaseConfig from "./config";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';

const app = initializeApp(firebaseConfig);

class Firebase {
    constructor() {
        this.db = getFirestore(app);
        this.storage = getStorage();
    }

    // Register a user
    async register(name, email, password) {
        const authentication = getAuth();
        const newUser = await createUserWithEmailAndPassword(authentication, email, password);

        return await updateProfile(newUser.user, {
            displayName: name
        });
    }

    // Login of a user
    async login(email, password) {
        const authentication = getAuth();
        return await signInWithEmailAndPassword(authentication, email, password);
    }

    // Close the user session
    async closeSession() {
        const authentication = getAuth();
        return await signOut(authentication);
    }
}

const firebase = new Firebase();

export default firebase;

