// src/context/QuizContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";

type Answer = "A" | "B" | "C" | "D" | null;

interface QuizContextType {
  currentQuestion: number;
  answers: Answer[];
  selectAnswer: (index: number, answer: Answer) => void;
  goToNext: () => void;
  goToPrev: () => void;
  hasGoneBack: boolean;
  getResult: () => { A: number; B: number; C: number; D: number };
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(
    Array(questions.length).fill(null)
  );
  const [hasGoneBack, setHasGoneBack] = useState(false);
  const navigate = useNavigate();

  const selectAnswer = (index: number, answer: Answer) => {
    const updated = [...answers];
    updated[index] = answer;
    setAnswers(updated);
  };

  const goToNext = () => {
    if (currentQuestion + 1 >= questions.length) {
      const scoreMap = getResult();
      navigate("/result", { state: { scores: scoreMap } });
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (currentQuestion > 0) {
      setHasGoneBack(true);
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const getResult = () => {
    const scoreMap = { A: 0, B: 0, C: 0, D: 0 };
    answers.forEach((ans) => {
      if (ans) scoreMap[ans]++;
    });
    return scoreMap;
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        answers,
        selectAnswer,
        goToNext,
        goToPrev,
        hasGoneBack,
        getResult,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
