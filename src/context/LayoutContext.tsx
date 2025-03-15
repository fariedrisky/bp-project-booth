'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextProps {
  isHeroSection: boolean;
  setIsHeroSection: (value: boolean) => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHeroSection, setIsHeroSection] = useState<boolean>(false);

  return (
    <LayoutContext.Provider value={{ isHeroSection, setIsHeroSection }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};
