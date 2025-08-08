import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import StarfieldTransition from '../components/StarfieldTransition';
import StarCanvasBackground from '../components/StarCanvasBackground'; // ✅ 改這行
import { motion } from 'framer-motion';

const NewStartPage = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = () => {
    setIsTransitioning(true);
  };

  const handleTransitionEnd = () => {
    navigate('/quiz2');
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black text-white overflow-hidden">
      {/* ✅ 使用自訂的星星背景 */}
      <StarCanvasBackground />

      {/* ✅ 過場動畫 */}
      {isTransitioning && (
        <div className="absolute inset-0 z-50">
          <StarfieldTransition onComplete={handleTransitionEnd} />
        </div>
      )}

      {/* ✅ UI 內容（非過場時顯示） */}
      {!isTransitioning && (
        <>
          {/* 漢堡選單 */}
          <div className="absolute top-6 left-6 z-20">
            <HamburgerMenu isMuted={false} toggleMute={() => {}} />
          </div>

          {/* LOGO 與按鈕 */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center space-y-6">
            <img src="/logo.svg" alt="TERRA Logo" className="w-40 h-40" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-3 bg-white text-black rounded-full text-lg font-semibold shadow-xl"
            >
              開始測驗
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewStartPage;
