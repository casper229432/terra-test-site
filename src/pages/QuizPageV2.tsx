// src/pages/QuizPageV2.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { QuizProvider, useQuiz } from "../context/QuizContext";
import HamburgerMenu from "../components/HamburgerMenu";
import { useMusic } from "../context/MusicContext";
import { questions } from "../data/questions";
import StarCanvasBackground from "../components/StarCanvasBackground";

// ✅ 用 classifier 的嚴謹規則來計分與產生代碼
// CRA 不支援 "@/..." 別名；因為 tsconfig 有 baseUrl:"src" → 用 "utils/..." 絕對匯入
import { countScores, pickPersonaId, Answer } from "utils/classifier";

/** 轉場覆蓋層（與 ResultPage 一致：淡入→導頁） */
const PageTransition: React.FC<{ show: boolean; onComplete?: () => void }> = ({
  show,
  onComplete,
}) => (
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
const QuestionDisplay: React.FC<{
  onNavigateWithTransition: (path: string) => void;
}> = ({ onNavigateWithTransition }) => {
  const {
    currentQuestion,
    answers,
    selectAnswer,
    goToNext,
    goToPrev,
  } = useQuiz();

  const [isSwitching, setIsSwitching] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false); // ✅ 提交後防連點

  // 全局 touchstart → 失焦，避免手機殘留 focus/hover
  useEffect(() => {
    const handleTouch = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  // 切題時重置鎖並失焦
  useEffect(() => {
    setIsSwitching(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [currentQuestion]);

  const handleSelect = (value: Exclude<Answer, null>) => {
    if (isSwitching || isNavigating) return;
    setIsSwitching(true);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // 寫回當前題目的答案
    selectAnswer(currentQuestion, value);

    const isLast = currentQuestion === questions.length - 1;

    if (isLast) {
      // 用「最新答案」計分：複製 answers 並覆蓋當前題
      const updated = answers.slice() as Answer[];
      updated[currentQuestion] = value;

      // ✅ 用 classifier 統計 + 產生 Terra 代碼（只走 /result/:code）
      const scores = countScores(updated);
      const code = pickPersonaId(scores); // 例如 "T4-BC" / "T1-B" / "T6" / "T8-ABC"

      // ✅ 轉場導航：觸發覆蓋層 → 動畫完成再導頁（與 ResultPage 一致）
      setIsNavigating(true); // 防連點：禁用所有互動
      onNavigateWithTransition(`/result/${code}`);
    } else {
      // 保留原有節奏的小延遲，再切到下一題
      setTimeout(() => {
        goToNext();
      }, 300);
    }
  };

  const handlePrev = () => {
    if (isSwitching || isNavigating) return;
    setIsSwitching(true);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    goToPrev();
  };

  const handleManualNext = () => {
    if (isSwitching || isNavigating) return;
    setIsSwitching(true);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    goToNext();
  };

  // ✅ 僅在已作答 且 非最後一題 時顯示「下一頁」
  const hasAnsweredCurrent = answers[currentQuestion] !== null;

  return (
    <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 space-y-6">
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
              answers[currentQuestion] === opt.type
                ? "bg-white text-black"
                : "bg-black/30 text-white"
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

  // 轉場控制（與 ResultPage 同步語感）
  const [leaving, setLeaving] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const hasNavigatedRef = useRef(false); // ✅ 防止 onAnimationComplete 重複觸發時二次導頁

  const goWithTransition = (path: string) => {
    if (leaving) return; // 二次點擊保護
    setTargetPath(path);
    setLeaving(true);
  };

  useEffect(() => {
    if (!isMusicOn) toggleMusic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QuizProvider>
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        {/* 背景 */}
        <div className="absolute inset-0 z-0">
          <StarCanvasBackground />
        </div>
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* 內容 */}
        <div className="relative z-20 w-full h-full flex items-center justify-center">
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
              hasNavigatedRef.current = true; // ✅ 僅導頁一次
              navigate(targetPath);
            }
          }}
        />
      </div>
    </QuizProvider>
  );
};

export default QuizPageV2;
