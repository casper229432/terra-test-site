import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const StartPage = () => {
  const [startClicked, setStartClicked] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setStartClicked(true);
    setTimeout(() => {
      navigate("/quiz");
    }, 1400);
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* 🌌 背景星河動畫 */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full animate-gradient-slow bg-[radial-gradient(circle_at_30%_30%,#6ee7b7,#3b82f6,#9333ea)] bg-[length:400%_400%] opacity-40 blur-xl" />
        <div className="absolute inset-0 bg-black/40" /> {/* 光暈混合層 */}
      </div>

      {/* 主要內容 */}
      <AnimatePresence>
        {!startClicked && (
          <motion.div
            className="flex flex-col items-center text-white space-y-6 z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40, transition: { duration: 0.6 } }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-widest">
              Terra 心理測驗
            </h1>
            <button
              onClick={handleStart}
              className="px-6 py-3 bg-white text-black rounded hover:bg-white/80 transition"
            >
              開始測驗
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 黑色轉場動畫 */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-black z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: startClicked ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      />
    </div>
  );
};

export default StartPage;
