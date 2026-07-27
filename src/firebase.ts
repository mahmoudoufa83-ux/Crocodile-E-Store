import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAtihMBJyaqePkIaANrg1O-CKHXUFEa4Lo",
  authDomain: "crocodile-e-store-d104b.firebaseapp.com",
  projectId: "crocodile-e-store-d104b",
  storageBucket: "crocodile-e-store-d104b.firebasestorage.app",
  messagingSenderId: "522414136648",
  appId: "1:522414136648:web:619c7760bc347cb5f5677d",
  measurementId: "G-B27RDRHY70",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

export default app;