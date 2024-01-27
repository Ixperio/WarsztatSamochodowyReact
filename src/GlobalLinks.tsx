import React, { createContext, useContext, ReactNode } from 'react';

interface GlobalLinksContextProps {
  loginLink: string;
  registerLink: string;
}

const GlobalLinksContext = createContext<GlobalLinksContextProps | undefined>(undefined);

export const useGlobalLinks = () => {
  const context = useContext(GlobalLinksContext);
  if (!context) {
    throw new Error('useGlobalLinks must be used within a GlobalLinksProvider');
  }
  return context;
};

interface GlobalLinksProviderProps {
  children: ReactNode;
}

export const GlobalLinksProvider: React.FC<GlobalLinksProviderProps> = ({ children }) => {

   //KONFIGURACJA LINKÓW 
  const loginLink: string = "/User/Login";
  const registerLink: string = "/User/Register";
  
  
  return (
    <GlobalLinksContext.Provider
      value={{ loginLink, 
               registerLink }}
    >
      {children}
    </GlobalLinksContext.Provider>
  );
};