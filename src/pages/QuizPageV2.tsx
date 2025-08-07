// src/pages/QuizPageV2.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuizProvider, useQuiz } from "../context/QuizContext";
import HamburgerMenu from "../components/HamburgerMenu";
import { useMusic } from "../context/MusicContext";
import { questions } from "../data/questions";
import StarCanvasBackground from "../components/StarCanvasBackground";

const QuestionDisplay: React.FC = () => {
  const {
    currentQuestion,
    answers,
    selectAnswer,
    goToNext,
    goToPrev,
  } = useQuiz();
  const navigate = useNavigate();

  const [hasVisitedPrevious, setHasVisitedPrevious] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  // 全局 touchstart blur
  useEffect(() => {
    const handleTouch = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  // 切题时 reset isSwitching 并 blur
  useEffect(() => {
    setIsSwitching(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [currentQuestion]);

  const handleSelect = (value: "A" | "B" | "C" | "D") => {
    if (isSwitching) return;
    setIsSwitching(true);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    selectAnswer(currentQuestion, value);

    if (currentQuestion === questions.length - 1) {
      const updated = [...answers, value];
      const scoreMap = { A: 0, B: 0, C: 0, D: 0 };
      updated.forEach((ans) => ans && scoreMap[ans]++);
      setTimeout(() => navigate("/result", { state: { result: scoreMap } }), 300);
    } else {
      setTimeout(() => {
        setHasVisitedPrevious(false);
        goToNext();
      }, 300);
    }
  };

  const handlePrev = () => {
    if (isSwitching) return;
    setIsSwitching(true);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setHasVisitedPrevious(true);
    goToPrev();
  };

  const handleManualNext = () => {
    if (isSwitching) return;
    setIsSwitching(true);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setHasVisitedPrevious(false);
    goToNext();
  };

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
            className={`px-6 py-3 rounded-lg text-lg font-medium border focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
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

        {hasVisitedPrevious && currentQuestion < questions.length - 1 && (
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
