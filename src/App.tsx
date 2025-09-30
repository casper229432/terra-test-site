// src/App.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMusic } from "./context/MusicContext";
import HamburgerMenu from "./components/HamburgerMenu";
import StarfieldTransition from "./components/StarfieldTransition";
import StarCanvasBackground from "./components/StarCanvasBackground";

const App: React.FC = () => {
  const navigate = useNavigate();
  const { isMusicOn, toggleMusic } = useMusic();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasNavigatedRef = useRef(false); // ✅ 單次導頁保護

  useEffect(() => {
    const handleTouchStart = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouchStart);
  }, []);

  const handleStart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioning) return; // ✅ 防二次觸發
    e.currentTarget.blur();
    if (!isMusicOn) toggleMusic();
    setIsTransitioning(true);
  };

  // 轉場動畫完成後導頁（replace 避免返回堆疊）
  const handleTransitionEnd = () => {
    if (hasNavigatedRef.current) return; // ✅ 再保險一次
    hasNavigatedRef.current = true;
    navigate("/quiz2", { replace: true });
  };

  return (
    <div className="relative w-screen h-screen bg-black text-white">
      {/* 背景：fixed + 100dvh（解行動端視窗高度問題） */}
      <div className="fixed left-0 top-0 w-[100vw] h-[100dvh] z-0 pointer-events-none">
        <StarCanvasBackground />
      </div>
      {/* 半透明黑遮罩：同樣 fixed，避免滾動時出現縫隙 */}
      <div className="fixed left-0 top-0 w-[100vw] h-[100dvh] bg-black/60 z-10" />

      {/* 內容 */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
        <div className="flex items-center justify-center w-full h-24 md:h-32">
          <AnimatePresence mode="wait">
            {!isTransitioning && (
              <motion.h1
                key="logo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-5xl md:text-6xl font-bold tracking-widest drop-shadow-lg font-terra italic"
              >
                TERRA
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={!isTransitioning ? { scale: 1.1 } : undefined}
          whileTap={!isTransitioning ? { scale: 0.95 } : undefined}
          onClick={handleStart}
          onTouchStart={(e) => e.currentTarget.blur()}
          disabled={isTransitioning}
          aria-label="開始測驗"
          className={`mt-6 px-8 py-3 rounded-full text-lg font-semibold shadow-xl focus:outline-none ${
            isTransitioning ? "pointer-events-none opacity-70" : "bg-white text-black"
          }`}
        >
          開始測驗
        </motion.button>
      </div>

      {/* 右上角：菜單（在遮罩之上） */}
      <div className="absolute top-4 right-4 z-30">
        <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
      </div>

      {/* 轉場層：置頂顯示，避免被任何內容遮住 */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50">
          <StarfieldTransition onComplete={handleTransitionEnd} />
        </div>
      )}
    </div>
  );
};

export default App;
