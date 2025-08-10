// src/App.tsx
import React, { useState, useEffect } from "react";
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
    if (isTransitioning) return;            // ★ 防守：避免二次觸發
    e.currentTarget.blur();
    if (!isMusicOn) toggleMusic();
    setIsTransitioning(true);
  };

  // 过场动画完成后跳转（用 replace，避免歷史堆疊導致奇怪返回）
  const handleTransitionEnd = () => navigate("/quiz2", { replace: true }); // ★

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <StarCanvasBackground />
      </div>
      <div className="absolute inset-0 bg-black/60 z-10" />

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
          disabled={isTransitioning}                                     // ★ 禁用按鈕
          className={`mt-6 px-8 py-3 rounded-full text-lg font-semibold shadow-xl focus:outline-none
          ${isTransitioning ? "pointer-events-none opacity-70" : "bg-white text-black"}`}  // ★ 關掉指標事件
        >
          開始測驗
        </motion.button>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
      </div>

      {isTransitioning && (
        <div className="absolute inset-0 z-30">
          <StarfieldTransition onComplete={handleTransitionEnd} />
        </div>
      )}
    </div>
  );
};

export default App;
