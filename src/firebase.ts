import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAthjMBJyaqePkIaANxg10-CKHXUFEa4Lo",
  authDomain: "crocodile-e-store-d104b.firebaseapp.com",
  projectId: "crocodile-e-store-d104b",
  storageBucket: "crocodile-e-store-d104b.firebasestorage.app",
  messagingSenderId: "522414136648",
  appId: "1:522414136648:web:619c7760bc347cb5f5677d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;