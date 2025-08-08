// src/pages/QuizPageV2.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuizProvider, useQuiz } from "../context/QuizContext";
import HamburgerMenu from "../components/HamburgerMenu";
import { useMusic } from "../context/MusicContext";
import { questions } from "../data/questions";
import StarCanvasBackground from "../components/StarCanvasBackground";
import { countScores, pickPersonaId } from "../utils/classifier";

const QuestionDisplay: React.FC = () => {
  const { currentQuestion, answers, selectAnswer, goToNext, goToPrev } = useQuiz();
  const navigate = useNavigate();
  const [isSwitching, setIsSwitching] = useState(false);

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

  const handleSelect = (value: "A" | "B" | "C" | "D") => {
    if (isSwitching) return;
    setIsSwitching(true);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();

    // 寫入答案
    selectAnswer(currentQuestion, value);

    const isLast = currentQuestion === questions.length - 1;
    if (isLast) {
      // 以「已選 + 本次點選」組合成最新答案
      const updated = [...answers];
      updated[currentQuestion] = value as any;

      const scores = countScores(updated as any);
      const code = pickPersonaId(scores); // 依 T1~T8 規則產生碼（例如 T4-BC、T6）

      // ✅ 帶著分數一起去結果頁；若該 code 暫時沒內容會 fallback 到分數版
      setTimeout(() => navigate(`/result/${code}`, { state: { scores } }), 300);
    } else {
      setTimeout(() => {
        goToNext();
      }, 300);
    }
  };

  const handlePrev = () => {
    if (isSwitching) return;
    setIsSwitching(true);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    goToPrev();
  };

  const handleManualNext = () => {
    if (isSwitching) return;
    setIsSwitching(true);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    goToNext();
  };

  const showNext = answers[currentQuestion] != null && currentQuestion < questions.length - 1;

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
            onClick={() => handleSelect(opt.type)}
            disabled={isSwitching}
            className={`px-6 py-3 rounded-lg text-lg font-medium border focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-black ${
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
            disabled={isSwitching}
            className="px-4 py-2 bg-white/80 text-black rounded hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一頁
          </button>
        )}
        {showNext && (
          <button
            onClick={handleManualNext}
            disabled={isSwitching}
            className="px-4 py-2 bg-white/80 text-black rounded hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一頁
          </button>
        )}
      </div>
    </div>
  );
};

const QuizPageV2: React.FC = () => {
  const { isMusicOn, toggleMusic } = useMusic();

  useEffect(() => {
    if (!isMusicOn) toggleMusic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QuizProvider>
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <StarCanvasBackground />
        </div>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 w-full h-full flex items-center justify-center">
          <QuestionDisplay />
        </div>
        <div className="absolute top-4 right-4 z-30">
          <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
        </div>
      </div>
    </QuizProvider>
  );
};

export default QuizPageV2;
