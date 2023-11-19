// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJbKj2deuLHKF3646-34RJHyXE2e886s8",
    authDomain: "whatapp-6d29d.firebaseapp.com",
    projectId: "whatapp-6d29d",
    storageBucket: "whatapp-6d29d.appspot.com",
    messagingSenderId: "925168799853",
    appId: "1:925168799853:web:24f7ac17277b16a5aeaf64"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();