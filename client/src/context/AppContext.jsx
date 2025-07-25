import { createContext, useContext, useState, useEffect } from 'react';
export const AppContext = createContext();
export default function AppProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === '1');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('dark', dark ? '1' : '0');
  }, [dark]);
  return (
    <AppContext.Provider value={{ dark, setDark }}>
      {children}
    </AppContext.Provider>
  );
}
export const useApp = () => useContext(AppContext);
