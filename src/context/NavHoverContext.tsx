import React, { createContext, useContext, useState } from 'react';

interface NavHoverContextType {
  isNavHovered: boolean;
  setIsNavHovered: (value: boolean) => void;
}

const NavHoverContext = createContext<NavHoverContextType | undefined>(undefined);

export const NavHoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNavHovered, setIsNavHovered] = useState(false);

  return (
    <NavHoverContext.Provider value={{ isNavHovered, setIsNavHovered }}>
      {children}
    </NavHoverContext.Provider>
  );
};

export const useNavHover = () => {
  const context = useContext(NavHoverContext);
  if (!context) {
    throw new Error('useNavHover must be used within a NavHoverProvider');
  }
  return context;
};
