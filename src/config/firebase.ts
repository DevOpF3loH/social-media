// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsXCRoR5N4Gd2eoueZo7NZuWtFdp54_as",
  authDomain: "social-media-201a8.firebaseapp.com",
  projectId: "social-media-201a8",
  storageBucket: "social-media-201a8.appspot.com",
  messagingSenderId: "204360942271",
  appId: "1:204360942271:web:280a1abf0ff5c18c53bc0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
