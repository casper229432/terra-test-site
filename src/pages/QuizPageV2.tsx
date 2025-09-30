import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { QuizProvider, useQuiz } from "../context/QuizContext";
import HamburgerMenu from "../components/HamburgerMenu";
import { useMusic } from "../context/MusicContext";
import { questions } from "../data/questions";
import StarCanvasBackground from "../components/StarCanvasBackground";
import { countScores, pickPersonaId, Answer } from "utils/classifier";

/** 轉場覆蓋層（與 ResultPage 一致：淡入→導頁） */
const PageTransition: React.FC<{ show: boolean; onComplete?: () => void }> = ({ show, onComplete }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        key="fade"
        className="fixed inset-0 z-[60] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black" />
      </motion.div>
    )}
  </AnimatePresence>
);

/** ───────── 題目畫面 ───────── **/
const QuestionDisplay: React.FC<{ onNavigateWithTransition: (path: string) => void }> = ({
  onNavigateWithTransition,
}) => {
  const { currentQuestion, answers, selectAnswer, goToNext, goToPrev } = useQuiz();

  const [isSwitching, setIsSwitching] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleTouch = () => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  useEffect(() => {
    setIsSwitching(false);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }, [currentQuestion]);

  const handleSelect = (value: Exclude<Answer, null>) => {
    if (isSwitching || isNavigating) return;
    setIsSwitching(true);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();

    selectAnswer(currentQuestion, value);
    const isLast = currentQuestion === questions.length - 1;

    if (isLast) {
      const updated = answers.slice() as Answer[];
      updated[currentQuestion] = value;

      const scores = countScores(updated);
      const code = pickPersonaId(scores);

      setIsNavigating(true);
      onNavigateWithTransition(`/result/${code}`);
    } else {
      setTimeout(() => {
        goToNext();
      }, 300);
    }
  };

  const handlePrev = () => {
    if (isSwitching || isNavigating) return;
    setIsSwitching(true);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    goToPrev();
  };

  const handleManualNext = () => {
    if (isSwitching || isNavigating) return;
    setIsSwitching(true);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    goToNext();
  };

  const hasAnsweredCurrent = answers[currentQuestion] !== null;

  return (
    <div className="relative z-20 flex flex-col items-center justify-center min-h-screen-dvh text-white text-center px-4 space-y-6">
      <div className="text-xl">{`第 ${currentQuestion + 1} 題 / ${questions.length}`}</div>
      <div className="text-2xl font-semibold max-w-xl">
        {questions[currentQuestion].question}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {questions[currentQuestion].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(opt.type as Exclude<Answer, null>)}
            disabled={isSwitching || isNavigating}
            className={`px-6 py-3 rounded-lg text-lg font-medium border focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed btn-answer-hover ${
              answers[currentQuestion] === opt.type ? "bg-white text-black" : "bg-black/30 text-white"
            }`}
          >
            {opt.text}
          </button>
        ))}
      </div>

      <div className="flex space-x-4 mt-10">
        {currentQuestion > 0 && (
          <button
            onClick={handlePrev}
            disabled={isSwitching || isNavigating}
            className="px-4 py-2 bg-white/80 text-black rounded hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一頁
          </button>
        )}

        {hasAnsweredCurrent && currentQuestion < questions.length - 1 && (
          <button
            onClick={handleManualNext}
            disabled={isSwitching || isNavigating}
            className="px-4 py-2 bg-white/80 text-black rounded hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一頁
          </button>
        )}
      </div>
    </div>
  );
};

/** ───────── 外層頁面 ───────── **/
const QuizPageV2: React.FC = () => {
  const { isMusicOn, toggleMusic } = useMusic();
  const navigate = useNavigate();

  const [leaving, setLeaving] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const hasNavigatedRef = useRef(false);

  const goWithTransition = (path: string) => {
    if (leaving) return;
    setTargetPath(path);
    setLeaving(true);
  };

  useEffect(() => {
    if (!isMusicOn) toggleMusic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QuizProvider>
      <div className="relative w-screen min-h-screen-dvh overflow-hidden bg-black">
        {/* 背景：固定鋪滿 */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <StarCanvasBackground />
        </div>
        <div className="fixed inset-0 bg-black/60 z-10 pointer-events-none" />

        {/* 內容 */}
        <div className="relative z-20 w-full min-h-screen-dvh flex items-center justify-center">
          <QuestionDisplay onNavigateWithTransition={goWithTransition} />
        </div>

        {/* 漢堡選單 */}
        <div className="absolute top-4 right-4 z-30">
          <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
        </div>

        {/* 轉場覆蓋層（動畫完成後才 navigate） */}
        <PageTransition
          show={leaving}
          onComplete={() => {
            if (!hasNavigatedRef.current && targetPath) {
              hasNavigatedRef.current = true;
              navigate(targetPath);
            }
          }}
        />
      </div>
    </QuizProvider>
  );
};

export default QuizPageV2;
