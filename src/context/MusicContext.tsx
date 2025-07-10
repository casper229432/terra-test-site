// src/context/MusicContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface MusicContextType {
  isMusicOn: boolean;
  toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [isMusicOn, setIsMusicOn] = useState(true);

  const toggleMusic = () => {
    setIsMusicOn((prev) => !prev);
  };

  return (
    <MusicContext.Provider value={{ isMusicOn, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
