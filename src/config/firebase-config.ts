// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCIiKVlZE8Upo09ETEVyQfHXyPAUqT6CTE",
    authDomain: "exam-printing-38f04.firebaseapp.com",
    projectId: "exam-printing-38f04",
    storageBucket: "exam-printing-38f04.appspot.com",
    messagingSenderId: "57270544752",
    appId: "1:57270544752:web:b6cb5a431b4868ae5cc7b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app)

export { db, auth, storage };