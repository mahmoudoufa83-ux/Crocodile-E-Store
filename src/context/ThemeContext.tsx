import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeSettings = {
  primary: string;
  secondary: string;
  background: string;
  navbar: string;
  footer: string;
  darkMode: boolean;
  websiteTitle: string;
};

type ThemeContextType = {
  theme: ThemeSettings;
  updateTheme: (theme: ThemeSettings) => void;
};

const defaultTheme: ThemeSettings = {
  primary: "#0B6E4F",
  secondary: "#FFD166",
  background: "#ffffff",
  navbar: "#0B6E4F",
  footer: "#1b1b1b",
  darkMode: false,
  websiteTitle: "Crocodile Print Solutions",
};

const ThemeContext =
  createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [theme, setTheme] =
    useState<ThemeSettings>(() => {

      const saved =
        localStorage.getItem("theme");

      return saved
        ? JSON.parse(saved)
        : defaultTheme;

    });

  useEffect(() => {

    localStorage.setItem(
      "theme",
      JSON.stringify(theme)
    );

    document.documentElement.style.setProperty(
      "--primary",
      theme.primary
    );

    document.documentElement.style.setProperty(
      "--secondary",
      theme.secondary
    );

    document.documentElement.style.setProperty(
      "--navbar",
      theme.navbar
    );

    document.documentElement.style.setProperty(
      "--footer",
      theme.footer
    );

    document.documentElement.style.setProperty(
      "--background",
      theme.background
    );

    document.body.style.background =
      theme.background;

    document.title =
      theme.websiteTitle;

  }, [theme]);

  function updateTheme(
    data: ThemeSettings
  ) {

    setTheme(data);

  }

  return (

    <ThemeContext.Provider
      value={{
        theme,
        updateTheme,
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

}

export function useTheme(){

  return useContext(ThemeContext)!;

}