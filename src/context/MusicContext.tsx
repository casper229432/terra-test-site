// src/context/MusicContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";

interface MusicContextType {
  isMusicOn: boolean;
  toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [isMusicOn, setIsMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 只创建一次 Audio 实例，文件放在 public/forsaken.mp3
  useEffect(() => {
    const audio = new Audio("/forsaken.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // 根据开关播放或暂停
  useEffect(() => {
    if (!audioRef.current) return;
    if (isMusicOn) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isMusicOn]);

  const toggleMusic = () => setIsMusicOn((prev) => !prev);

  return (
    <MusicContext.Provider value={{ isMusicOn, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

// 一定要这样命名导出
export const useMusic = (): MusicContextType => {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within a MusicProvider");
  return ctx;
};
