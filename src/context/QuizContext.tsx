// src/context/QuizContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { questions } from "../data/questions";
import type { Answer as AnswerType } from "utils/classifier";

type Answer = AnswerType;

interface QuizContextType {
  currentQuestion: number;
  answers: Answer[];
  selectAnswer: (index: number, answer: Answer) => void;
  goToNext: () => void;
  goToPrev: () => void;
  hasGoneBack: boolean; // 兼容舊用法（目前頁面未使用）
  getResult: () => { A: number; B: number; C: number; D: number }; // 兼容舊用法（目前頁面未使用）
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(Array(questions.length).fill(null));
  const [hasGoneBack, setHasGoneBack] = useState(false);

  const selectAnswer = (index: number, answer: Answer) => {
    const updated = [...answers];
    updated[index] = answer;
    setAnswers(updated);
  };

  const goToNext = () => {
    // 不再在 Context 內導頁；頁面自行處理提交與導向
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentQuestion > 0) {
      setHasGoneBack(true);
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const getResult = () => {
    // 兼容舊用法（未使用）；保留簡單統計避免斷裂
    const scoreMap = { A: 0, B: 0, C: 0, D: 0 };
    answers.forEach((ans) => { if (ans) (scoreMap as any)[ans]++; });
    return scoreMap;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setHasGoneBack(false);
  };

  return (
    <QuizContext.Provider
      value={{ currentQuestion, answers, selectAnswer, goToNext, goToPrev, hasGoneBack, getResult, resetQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within a QuizProvider");
  return context;
};
