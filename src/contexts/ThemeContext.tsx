import { createContext, useEffect, useState, } from "react"; 
import type { ReactNode } from "react"; 

export const themes = ["blue", "indigo", "purple"] as const;

export type Theme = (typeof themes)[number]; 

type ThemeContextType = { 
  theme: Theme; 
  changeTheme: (theme: Theme) => void; 
}; 

export const ThemeContext = createContext<ThemeContextType | null>(null); 

const DEFAULT_THEME: Theme = "blue"; 

const isTheme = (value: string | null): value is Theme => {
  return themes.includes(value as Theme);
};

export const ThemeProvider = ({children}: { children: ReactNode }) => { 
  const [theme, setTheme] = useState<Theme>(() => { 
    const savedTheme = localStorage.getItem("devsignal-theme"); 
    
    if (isTheme(savedTheme)) {
      return savedTheme;
    }
    
    return DEFAULT_THEME; 
  }); 

  useEffect(() => { 
    localStorage.setItem("devsignal-theme", theme); 
    document.documentElement.setAttribute("data-theme", theme); 
  }, [theme]); 

  function changeTheme(newTheme: Theme){ 
    setTheme(newTheme); 
  } 

  return ( 
    <ThemeContext.Provider value={{ theme, changeTheme}}> 
      {children} 
    </ThemeContext.Provider> 
  ); 
}
