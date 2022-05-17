// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQezxokz-jiym5iOckfqGX4L6WSyN_LTs",
    authDomain: "boilerplate-9ee99.firebaseapp.com",
    projectId: "boilerplate-9ee99",
    storageBucket: "boilerplate-9ee99.appspot.com",
    messagingSenderId: "213384005904",
    appId: "1:213384005904:web:340ad805f936f5d49a3d95"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)