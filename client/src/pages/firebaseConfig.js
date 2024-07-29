// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzXD97KZtN5eebDbam0BVfW9V1oKvayRI",
    authDomain: "resourcify-4f66b.firebaseapp.com",
    projectId: "resourcify-4f66b",
    storageBucket: "resourcify-4f66b.appspot.com",
    messagingSenderId: "323586964469",
    appId: "1:323586964469:web:0571363c7420faa6857ebc",
    measurementId: "G-K3R4N83SM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, analytics, auth, database };
