// src/pages/QuizPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { QuizProvider, useQuiz } from "../context/QuizContext";
import HamburgerMenu from "../components/HamburgerMenu";
import { useMusic } from "../context/MusicContext";
import { questions } from "../data/questions";

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

  const handleSelect = (value: "A" | "B" | "C" | "D") => {
    selectAnswer(currentQuestion, value);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      goToNext();
    } else {
      const result = getResult();
      if (result) {
        navigate("/result", { state: { result } });
      } else {
        alert("⚠️ 尚有題目未完成，請回答所有題目後再查看結果。");
      }
    }
  };

  const isAnswerSelected = answers[currentQuestion] !== null;

  return (
    <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 space-y-6">
      <div className="text-xl">{`第 ${currentQuestion + 1} 題 / ${questions.length}`}</div>
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
            onClick={goToPrev}
            className="px-4 py-2 bg-white/80 text-black rounded hover:bg-white"
          >
            上一頁
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!isAnswerSelected}
          className={`px-4 py-2 rounded ${
            isAnswerSelected
              ? "bg-white/80 text-black hover:bg-white"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          {currentQuestion < questions.length - 1 ? "下一頁" : "查看結果"}
        </button>
      </div>
    </div>
  );
};

function QuizPage() {
  const { isMusicOn, toggleMusic } = useMusic();

  return (
    <QuizProvider>
      <div className="relative w-screen h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted={!isMusicOn}
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dyhdaq6sx/video/upload/v1751914755/1_n8w5b6.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute w-full h-full bg-black/60 z-10" />

        <div className="relative z-20 w-full h-full flex items-center justify-center">
          <QuestionDisplay />
        </div>

        <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
      </div>
    </QuizProvider>
  );
}

export default QuizPage;
