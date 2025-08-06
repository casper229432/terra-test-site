// src/pages/QuizPageV2.tsx
import React, { useState } from "react";
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
    // getResult,  ← 不再用 context 的 getResult，改本地計算
  } = useQuiz();
  const navigate = useNavigate();

  // 按過上一頁才顯示「下一頁」
  const [hasVisitedPrevious, setHasVisitedPrevious] = useState(false);

  const handleSelect = (value: "A" | "B" | "C" | "D") => {
    // 解除手機焦點殘留
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // 先寫入 context
    selectAnswer(currentQuestion, value);

    if (currentQuestion === questions.length - 1) {
      // 最後一題：用本地陣列計算所有分數
      const updated = [...answers];
      updated[currentQuestion] = value;

      const scoreMap = { A: 0, B: 0, C: 0, D: 0 };
      updated.forEach((ans) => {
        if (ans) scoreMap[ans]++;
      });

      // 延遲保留過場
      setTimeout(() => {
        navigate("/result", { state: { result: scoreMap } });
      }, 300);
    } else {
      // 非最後一題：自動跳下一題
      setTimeout(() => {
        setHasVisitedPrevious(false);
        goToNext();
      }, 300);
    }
  };

  const handlePrev = () => {
    setHasVisitedPrevious(true);
    goToPrev();
  };

  const handleManualNext = () => {
    // 必須按過上一頁才可
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
            className={`px-6 py-3 rounded-lg text-lg font-medium border ${
              answers[currentQuestion] === opt.type
                ? "bg-white text-black"
                : "bg-black/30 text-white"
            } hover:bg-white hover:text-black transition`}
          >
            {opt.text}
          </button>
        ))}
      </div>

      <div className="flex space-x-4 mt-10">
        {currentQuestion > 0 && (
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-white/80 text-black rounded hover:bg-white"
          >
            上一頁
          </button>
        )}

        {hasVisitedPrevious && currentQuestion < questions.length - 1 && (
          <button
            onClick={handleManualNext}
            className="px-4 py-2 bg-white/80 text-black rounded hover:bg-white"
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
        {/* 星星背景 */}
        <div className="absolute inset-0 z-0">
          <StarCanvasBackground />
        </div>
        {/* 半透遮罩 */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* 題目區 */}
        <div className="relative z-20 w-full h-full flex items-center justify-center">
          <QuestionDisplay />
        </div>
        {/* 漢堡選單 */}
        <div className="absolute top-4 right-4 z-30">
          <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
        </div>
      </div>
    </QuizProvider>
  );
};

export default QuizPageV2;
