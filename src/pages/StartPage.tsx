import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import StarCanvasBackground from '@/components/StarCanvasBackground';

const StartPage = () => {
  const navigate = useNavigate();
  const [startClicked, setStartClicked] = useState(false);

  const handleStart = () => {
    setStartClicked(true);
    setTimeout(() => {
      navigate('/quiz');
    }, 2600); // 對應動畫時長
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 星空背景 */}
      <StarCanvasBackground />

      {/* 主內容 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-8"
        >
          歡迎來到 TERRA 宇宙
        </motion.h1>

        {!startClicked && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="px-8 py-3 bg-white text-black rounded-full text-lg font-semibold shadow-lg"
          >
            開始測驗
          </motion.button>
        )}

        {/* 如果點擊開始，播放過場動畫（可自行替換為 StarfieldTransition） */}
        {startClicked && (
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.6 }}
          />
        )}
      </div>
    </div>
  );
};

export default StartPage;
