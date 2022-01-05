import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB7yCs8QyU0hz3Hh1Loci2PF6ASrUGY9RQ",
    authDomain: "svelte-chatapp-f7b9e.firebaseapp.com",
    projectId: "svelte-chatapp-f7b9e",
    storageBucket: "svelte-chatapp-f7b9e.appspot.com",
    messagingSenderId: "427539234634",
    appId: "1:427539234634:web:5d6d78fecde45b0a858bb3"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth= getAuth();
const db = getFirestore();
const googleProvider= new GoogleAuthProvider();


export {firebaseApp, auth, db, googleProvider };