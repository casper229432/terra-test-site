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

  // 全局 touchstart 失焦
  useEffect(() => {
    const handleTouchStart = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouchStart);
  }, []);

  // 点击“开始测验”：失焦 + 启动音乐 + 进过场
  const handleStart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    if (!isMusicOn) {
      toggleMusic();
    }
    setIsTransitioning(true);
  };

  // 过场动画完成后跳转
  const handleTransitionEnd = () => navigate("/quiz2");

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* 星空背景 */}
      <div className="absolute inset-0 z-0">
        <StarCanvasBackground />
      </div>

      {/* 半透遮罩 */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* 主容器：Logo header + 按钮 */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
        {/* Logo 容器：固定高度保留空间 */}
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

        {/* 开始测验按钮 */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          onTouchStart={(e) => e.currentTarget.blur()}
          className="mt-6 px-8 py-3 bg-white text-black rounded-full text-lg font-semibold shadow-xl focus:outline-none"
        >
          開始測驗
        </motion.button>
      </div>

      {/* 汉堡选单 */}
      <div className="absolute top-4 right-4 z-20">
        <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
      </div>

      {/* 过场动画 */}
      {isTransitioning && (
        <div className="absolute inset-0 z-30">
          <StarfieldTransition onComplete={handleTransitionEnd} />
        </div>
      )}
    </div>
  );
};

export default App;
