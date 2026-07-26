import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = {
  uid: string;
  name: string;
  email: string;
  password?: string;
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
    const currentUser =
      localStorage.getItem("currentUser");

    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }

    setLoading(false);
  }, []);

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<boolean> {
    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    const exists = users.find(
      (u) =>
        u.email.toLowerCase() === normalizedEmail
    );

    if (exists) {
      return false;
    }

    const newUser: User = {
      uid: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: users.length === 0 ? "admin" : "user",
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    const currentUser: User = {
      uid: newUser.uid,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(currentUser)
    );

    setUser(currentUser);

    return true;
  }

  async function login(
    email: string,
    password: string
  ): Promise<boolean> {
    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === normalizedEmail &&
        u.password === password
    );

    if (!foundUser) {
      return false;
    }

    const currentUser: User = {
      uid: foundUser.uid,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(currentUser)
    );

    setUser(currentUser);

    return true;
  }

  async function logout(): Promise<void> {
    localStorage.removeItem("currentUser");
    setUser(null);
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