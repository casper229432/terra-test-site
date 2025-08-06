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
    // getResult,  ← 改成本地计算
  } = useQuiz();
  const navigate = useNavigate();

  // 控制“上一页”后才显示“下一页”
  const [hasVisitedPrevious, setHasVisitedPrevious] = useState(false);

  // 每次切题，删掉任何残留聚焦
  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [currentQuestion]);

  const handleSelect = (value: "A" | "B" | "C" | "D") => {
    // 先 blur 防残留
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // 记录答案
    selectAnswer(currentQuestion, value);

    if (currentQuestion === questions.length - 1) {
      // 最后一题，计算完整分数
      const updated = [...answers];
      updated[currentQuestion] = value;
      const scoreMap = { A: 0, B: 0, C: 0, D: 0 };
      updated.forEach((ans) => ans && scoreMap[ans]++);
      setTimeout(() => {
        navigate("/result", { state: { result: scoreMap } });
      }, 300);
    } else {
      // 非最后一题：延迟跳下一题
      setTimeout(() => {
        setHasVisitedPrevious(false);
        goToNext();
      }, 300);
    }
  };

  const handlePrev = () => {
    // blur 防残留
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setHasVisitedPrevious(true);
    goToPrev();
  };

  const handleManualNext = () => {
    // blur 防残留
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
            className={`px-6 py-3 rounded-lg text-lg font-medium border focus:outline-none ${
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
            className="px-4 py-2 bg-white/80 text-black rounded hover:bg-white focus:outline-none"
          >
            上一頁
          </button>
        )}

        {hasVisitedPrevious && currentQuestion < questions.length - 1 && (
          <button
            onClick={handleManualNext}
            className="px-4 py-2 bg-white/80 text-black rounded hover:bg-white focus:outline-none"
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
