// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "splitspace-3d239.firebaseapp.com",
  projectId: "splitspace-3d239",
  storageBucket: "splitspace-3d239.appspot.com",
  messagingSenderId: "1061055087495",
  appId: "1:1061055087495:web:100d7773547d53151e0922"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);