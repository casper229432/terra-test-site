import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizProvider, useQuiz } from "../context/QuizContext";
import HamburgerMenu from "../components/HamburgerMenu";
import { useMusic } from "../context/MusicContext";
import { questions } from "../data/questions";
import StarCanvasBackground from "../components/StarCanvasBackground";

const QuestionDisplay = () => {
  const {
    currentQuestion,
    answers,
    selectAnswer,
    goToNext,
    goToPrev,
    getResult,
  } = useQuiz();

  const navigate = useNavigate();
  const [hasVisitedPrevious, setHasVisitedPrevious] = useState(false);

  // 自動跳下一題後清除「hasVisitedPrevious」
  const handleSelect = (value: "A" | "B" | "C" | "D") => {
    selectAnswer(currentQuestion, value);
    setTimeout(() => {
      if (currentQuestion < 14) {
        setHasVisitedPrevious(false); // 重設狀態
        goToNext();
      } else {
        const result = getResult();
        if (result) {
          navigate("/result", { state: { result } });
        } else {
          alert("⚠️ 尚有題目未完成，請回答所有題目後再查看結果。");
        }
      }
    }, 300); // 增加延遲避免過快跳頁
  };

  const handlePrev = () => {
    setHasVisitedPrevious(true); // 代表使用者點過上一頁
    goToPrev();
  };

  return (
    <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 space-y-6">
      <div className="text-xl">{`第 ${currentQuestion + 1} 題 / 15`}</div>
      <div className="text-2xl font-semibold max-w-xl">
        {questions[currentQuestion].question}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {questions[currentQuestion].options.map((opt, index) => (
          <button
            key={index}
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

        {hasVisitedPrevious && (
          <button
            onClick={() => {
              const result = getResult();
              if (result) navigate("/result", { state: { result } });
            }}
            className="px-4 py-2 bg-white/80 text-black rounded hover:bg-white"
          >
            {currentQuestion < 14 ? "下一頁" : "查看結果"}
          </button>
        )}
      </div>
    </div>
  );
};

function Quiz2Page() {
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

        <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
      </div>
    </QuizProvider>
  );
}

export default Quiz2Page;
