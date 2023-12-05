import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCoHww7x_P473xYxVIsSv7pF9L3n1wxbYI",
  authDomain: "lu-project-53a80.firebaseapp.com",
  projectId: "lu-project-53a80",
  storageBucket: "lu-project-53a80.appspot.com",
  messagingSenderId: "527776142836",
  appId: "1:527776142836:web:7358e7744190335ff415a1",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
