import { initializeApp } from "firebase/app";
import { getAuth, signOut, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, setDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN8VH2S74uiWk7ndgS4JxGAxXzEHnmygI",
  authDomain: "bittorex-5479b.firebaseapp.com",
  projectId: "bittorex-5479b",
  storageBucket: "bittorex-5479b.appspot.com",
  messagingSenderId: "672435159761",
  appId: "1:672435159761:web:b4c2a9301c9ace4f52bbf0",
  measurementId: "G-C5WFQJZVWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signOut, signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword };
export { db, collection, onSnapshot, addDoc, setDoc, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp };
