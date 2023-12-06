import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALDDmM9KwNUkxYGc6Ekhiu87Nv6nS_Cds",
  authDomain: "project-6c393.firebaseapp.com",
  projectId: "project-6c393",
  storageBucket: "project-6c393.appspot.com",
  messagingSenderId: "892350931270",
  appId: "1:892350931270:web:d1ffab581a510fc4070547",
  measurementId: "G-PYYGFLVC8V",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);
