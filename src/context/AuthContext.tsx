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
  User as FirebaseUser,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
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
    useState(true);useEffect(() => {

  const unsubscribe = onAuthStateChanged(

    auth,

    async (firebaseUser: FirebaseUser | null) => {

      if (!firebaseUser) {

        setUser(null);

        setLoading(false);

        return;

      }

      const userRef = doc(

        db,

        "users",

        firebaseUser.uid

      );

      const snap = await getDoc(userRef);

      if (snap.exists()) {

        const data = snap.data();

        setUser({

          uid: firebaseUser.uid,

          name: data.name,

          email: data.email,

          role: data.role,

        });

      }

      setLoading(false);

    }

  );

  return () => unsubscribe();

}, []);

async function login(

  email: string,

  password: string

): Promise<boolean> {

  try {

    await signInWithEmailAndPassword(

      auth,

      email,

      password

    );

    return true;

  } catch {

    return false;

  }

}

async function register(

  name: string,

  email: string,

  password: string

): Promise<boolean> {

  try {

    const result = await createUserWithEmailAndPassword(

      auth,

      email,

      password

    );

    await setDoc(

      doc(db, "users", result.user.uid),

      {

        name,

        email,

        role: "user",

      }

    );

    return true;

  } catch {

    return false;

  }

}async function logout() {

  await signOut(auth);

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

  return useContext(AuthContext)!;

}