// src/App.tsx
import React, { useState } from "react";
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

  const handleStart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 解除焦点，避免触觉残留
    e.currentTarget.blur();
    setIsTransitioning(true);
  };
  const handleTransitionEnd = () => navigate("/quiz2");

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* 星空背景 */}
      <div className="absolute inset-0 z-0">
        <StarCanvasBackground />
      </div>
      {/* 半透遮罩 */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* 漢堡選單，始終可見 */}
      <div className="absolute top-4 right-4 z-40">
        <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
      </div>

      {/* 主體 container：Logo + 按鈕 */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full space-y-6 text-center px-4">
        {/* 只有 Logo 受 AnimatePresence 控制 */}
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

        {/* 開始測驗 按鈕：常駐不動 */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="px-8 py-3 bg-white text-black rounded-full text-lg font-semibold shadow-xl"
        >
          開始測驗
        </motion.button>
      </div>

      {/* 過場動畫：覆蓋全螢幕 */}
      {isTransitioning && (
        <div className="absolute inset-0 z-30">
          <StarfieldTransition onComplete={handleTransitionEnd} />
        </div>
      )}
    </div>
  );
};

export default App;
