import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type StarfieldTransitionProps = {
  onComplete?: () => void;
};

const StarfieldTransition: React.FC<StarfieldTransitionProps> = ({ onComplete }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1300);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-screen h-screen bg-black z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
      />
    </AnimatePresence>
  );
};

export default StarfieldTransition;
