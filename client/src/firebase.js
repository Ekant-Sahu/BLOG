// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-4d510.firebaseapp.com",
  projectId: "blog-4d510",
  storageBucket: "blog-4d510.appspot.com",
  messagingSenderId: "948798564590",
  appId: "1:948798564590:web:5b4f4fa4b857577a01ebff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

