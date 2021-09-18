import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, setDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDuM5ZzIc9FC-CiSBMyNWM8Ru4XeHDz2io",
    authDomain: "sandese-app.firebaseapp.com",
    projectId: "sandese-app",
    storageBucket: "sandese-app.appspot.com",
    messagingSenderId: "379805090136",
    appId: "1:379805090136:web:15b91aedf60157455f252d",
    measurementId: "G-8HD1CPNFFS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
export { db, collection, onSnapshot, addDoc, setDoc, doc, query, orderBy, serverTimestamp };