// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBc_9mPkQPPaHuUMwQgcqE5gzNIKJCmtOk",
    authDomain: "playstation-86ea9.firebaseapp.com",
    projectId: "playstation-86ea9",
    storageBucket: "playstation-86ea9.appspot.com",
    messagingSenderId: "710707622372",
    appId: "1:710707622372:web:a79711916d041cd074d7f1",
    measurementId: "G-TWLNYV0ZR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Firetore
export const db = getFirestore(app);