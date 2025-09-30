import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onComplete?: () => void;
  durationMs?: number; // 預設 1200ms
};

const StarfieldTransition: React.FC<Props> = ({ onComplete, durationMs = 1200 }) => {
  useEffect(() => {
    const id = window.setTimeout(() => onComplete?.(), durationMs);
    return () => window.clearTimeout(id);
  }, [onComplete, durationMs]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: durationMs / 1000, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-black" />
      </motion.div>
    </AnimatePresence>
  );
};

export default StarfieldTransition;
