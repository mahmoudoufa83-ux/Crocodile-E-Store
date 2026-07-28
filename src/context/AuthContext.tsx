import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

export type User = {
  uid: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<boolean>;

  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;

  logout: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {

          if (!firebaseUser) {
            setUser(null);
            setLoading(false);
            return;
          }

          try {

            console.log(
              "Firebase Auth User:",
              firebaseUser.uid
            );

            const userRef = doc(
              db,
              "users",
              firebaseUser.uid
            );

            const snapshot =
              await getDoc(userRef);

            if (!snapshot.exists()) {

              console.log(
                "User document not found in Firestore"
              );

              setUser(null);
              setLoading(false);
              return;

            }

            const data = snapshot.data();

            console.log(
              "Firestore User:",
              data
            );

            setUser({
              uid: firebaseUser.uid,
              name: data.name,
              email: data.email,
              role: data.role,
            });

          } catch (error) {

            console.error(
              "Auth Error:",
              error
            );

            setUser(null);

          }

          setLoading(false);

        }
      );

    return () => unsubscribe();

  }, []);

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<boolean> {

    try {

      const credential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim().toLowerCase(),
          password
        );

      await setDoc(
        doc(
          db,
          "users",
          credential.user.uid
        ),
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          role: "user",
        }
      );

      return true;

    } catch (error) {

      console.error(error);

      return false;

    }

  }

  async function login(
    email: string,
    password: string
  ): Promise<boolean> {

    try {

      const credential =
        await signInWithEmailAndPassword(
          auth,
          email.trim().toLowerCase(),
          password
        );

      console.log(
        "Login Success:",
        credential.user.uid
      );

      return true;

    } catch (error) {

      console.error(
        "Login Error:",
        error
      );

      return false;

    }

  }

  async function logout(): Promise<void> {

    try {

      await signOut(auth);

      setUser(null);

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }

  return context;

}