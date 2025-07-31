
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./components/HamburgerMenu";
import StarfieldTransition from "./components/StarfieldTransition";
import StarCanvasBackground from "./components/StarCanvasBackground";
import { motion } from "framer-motion";

function App() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleStart = () => {
    setIsTransitioning(true);
  };

  const handleTransitionEnd = () => {
    navigate("/quiz");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      <StarCanvasBackground />

      <div className="absolute top-4 left-4 z-10">
        <HamburgerMenu isMuted={false} toggleMute={() => {}} />
      </div>

      {!isTransitioning && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold tracking-widest drop-shadow-lg font-terra italic"
          >
            TERRA
          </motion.h1>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="px-8 py-3 bg-white text-black rounded-full text-lg font-semibold shadow-xl"
          >
            開始測驗
          </motion.button>
        </div>
      )}

      {isTransitioning && (
        <div className="absolute inset-0 z-50">
          <StarfieldTransition onComplete={handleTransitionEnd} />
        </div>
      )}
    </div>
  );
}

export default App;
