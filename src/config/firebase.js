// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFOzL5At4DtXLH2b5UKaY0PFv6L4a29LU",
  authDomain: "vite-contactapp-7e7a6.firebaseapp.com",
  projectId: "vite-contactapp-7e7a6",
  storageBucket: "vite-contactapp-7e7a6.firebasestorage.app",
  messagingSenderId: "468291043081",
  appId: "1:468291043081:web:dcc170f441877b9baaddd8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
