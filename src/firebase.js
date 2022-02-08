import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
//Your firebase config
};

const firebaseApp = initializeApp(firebaseConfig);
const auth= getAuth();
const db = getFirestore();
const googleProvider= new GoogleAuthProvider();


export {firebaseApp, auth, db, googleProvider };