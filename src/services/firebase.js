// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaXPvdUm0R796lZ4fM-2TsrWTOa5SHVDI",
  authDomain: "toolkit-f3455.firebaseapp.com",
  projectId: "toolkit-f3455",
  storageBucket: "toolkit-f3455.firebasestorage.app",
  messagingSenderId: "181023257695",
  appId: "1:181023257695:web:2be81b2fd96a4aca4557ea",
  measurementId: "G-68Z9807F5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;