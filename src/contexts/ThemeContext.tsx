import { createContext, useEffect, useState, } from "react"; 
import type { ReactNode } from "react"; 

type Theme = "blue" | "purple" | "green"; 

type ThemeContextType = { 
  theme: Theme; 
  changeTheme: (theme: Theme) => void; 
}; 

export const ThemeContext = createContext<ThemeContextType | null>(null); 

const DEFAULT_THEME: Theme = "blue"; 

export const ThemeProvider = ({children}: { children: ReactNode }) => { 
  const [theme, setTheme] = useState<Theme>(() => { 
    const savedTheme = localStorage.getItem("devsignal-theme"); 
    
    if (savedTheme === "blue" || savedTheme === "purple" || savedTheme === "green") {
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
