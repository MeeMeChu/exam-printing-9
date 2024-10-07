// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCu6YJZuJ5X4Rrl2qKHrp1x-rea0fHo8GE",
    authDomain: "exam-printing.firebaseapp.com",
    projectId: "exam-printing",
    storageBucket: "exam-printing.appspot.com",
    messagingSenderId: "937873437550",
    appId: "1:937873437550:web:b1f12de487d1c41f05c77f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app)

export { db, auth, storage };