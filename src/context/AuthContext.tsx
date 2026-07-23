import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

export type User = {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
};

type AuthContextType = {
  user: User | null;

  login: (
    email: string,
    password: string
  ) => boolean;

  register: (
    name: string,
    email: string,
    password: string
  ) => boolean;

  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(() => {

      const saved =
        localStorage.getItem("user");

      return saved
        ? JSON.parse(saved)
        : null;

    });

  useEffect(() => {

    if (user) {

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

    } else {

      localStorage.removeItem("user");

    }

  }, [user]);

  function login(
    email: string,
    password: string
  ): boolean {

    // ==========================
    // Admin Login From Settings
    // ==========================

    const storeSettings = JSON.parse(

      localStorage.getItem("storeSettings") || "{}"

    );

    const adminEmail =
      storeSettings.adminEmail ||
      "admin@crocodile.com";

    const adminPassword =
      storeSettings.adminPassword ||
      "123456";

    const adminName =
      storeSettings.adminName ||
      "Administrator";

    if (

      email === adminEmail &&
      password === adminPassword

    ) {

      setUser({

        name: adminName,

        email,

        role: "admin",

      });

      return true;

    }

    // ==========================
    // Normal Users Login
    // ==========================

    const users: User[] = JSON.parse(

      localStorage.getItem("users") || "[]"

    );

    const foundUser = users.find(

      (u) =>

        u.email === email &&
        u.password === password

    );

    if (!foundUser) {

      return false;

    }

    setUser({

      name: foundUser.name,

      email: foundUser.email,

      role: "user",

    });

    return true;

  }

  function register(

    name: string,

    email: string,

    password: string

  ): boolean {

    const users: User[] = JSON.parse(

      localStorage.getItem("users") || "[]"

    );

    const exists = users.find(

      (u) => u.email === email

    );

    if (exists) {

      return false;

    }

    const newUser: User = {

      name,

      email,

      password,

      role: "user",

    };

    users.push(newUser);

    localStorage.setItem(

      "users",

      JSON.stringify(users)

    );

    return true;

  }

  function logout() {

    setUser(null);

  }

  return (

    <AuthContext.Provider

      value={{

        user,

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