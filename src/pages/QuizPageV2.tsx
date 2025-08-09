// src/pages/QuizPageV2.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuizProvider, useQuiz } from "../context/QuizContext";
import HamburgerMenu from "../components/HamburgerMenu";
import { useMusic } from "../context/MusicContext";
import { questions } from "../data/questions";
import StarCanvasBackground from "../components/StarCanvasBackground";

/** 分數型別 */
type Scores = { A: number; B: number; C: number; D: number };

/** 計算分數 */
function computeScores(ans: Array<"A" | "B" | "C" | "D" | null>): Scores {
  const s: Scores = { A: 0, B: 0, C: 0, D: 0 };
  ans.forEach((a) => {
    if (a) s[a] += 1;
  });
  return s;
}

/** 分類邏輯（照你之前提供的規則） */
function classify(scores: Scores): string {
  const entries: Array<[keyof Scores, number]> = Object.entries(scores) as any;
  const order = ["A", "B", "C", "D"] as const;
  entries.sort((a, b) => b[1] - a[1] || order.indexOf(a[0]) - order.indexOf(b[0]));

  const [t1, t2, t3] = entries;
  const main = t1[0], mainScore = t1[1];
  const second = t2[0], secondScore = t2[1];
  const thirdScore = t3[1];
  const values = entries.map(([, v]) => v);

  // T1：主型 ≥13
  if (mainScore >= 13) return `T1-${main}`;

  // T2：主型 ≥9 且 至少一副型 ≥4
  if (mainScore >= 9 && values.some((v, i) => i > 0 && v >= 4)) {
    return `T2-${main}${second}`;
  }

  // T3：主型 ≥9 且 其餘 <4
  if (mainScore >= 9 && secondScore < 4 && thirdScore < 4) {
    return `T3-${main}`;
  }

  // T7：雙主核（最高兩項相等且都 ≥6）
  if (mainScore >= 6 && secondScore >= 6 && mainScore === secondScore) {
    return `T7-${main}${second}`;
  }

  // T4：主型 6~8 且 至少一副型 ≥4
  if (mainScore >= 6 && mainScore <= 8 && values.some((v, i) => i > 0 && v >= 4)) {
    return `T4-${main}${second}`;
  }

  // T5：主型 6~8 且 第二高 ≤3（沒有副型 ≥4）
  if (mainScore >= 6 && mainScore <= 8 && secondScore <= 3) {
    return `T5-${main}`;
  }

  // T8：恰好三個等於 5
  const eq5 = values.filter((v) => v === 5).length;
  if (eq5 === 3) {
    const letters = entries.filter(([, v]) => v === 5).map(([k]) => k).sort();
    return `T8-${letters.join("")}`;
  }

  // T6：所有 ≤5（且前述皆不成立）
  if (values.every((v) => v <= 5)) return "T6";

  // 保底（理論上不會到）
  return `T4-${main}${second}`;
}

/** 找出第一個尚未作答的 index（全答完則回傳 questions.length） */
function firstUnansweredIndex(ans: Array<"A" | "B" | "C" | "D" | null>): number {
  const idx = ans.findIndex((x) => x === null);
  return idx === -1 ? questions.length : idx;
}

/** 題目畫面 */
const QuestionDisplay: React.FC = () => {
  const { currentQuestion, answers, selectAnswer, goToNext, goToPrev } = useQuiz();
  const navigate = useNavigate();

  const [isSwitching, setIsSwitching] = useState(false);

  // 進入頁面時：清掉手機殘留 hover 狀態（方案1）
  useEffect(() => {
    document.body.classList.add("no-hover");
    const timer = setTimeout(() => {
      document.body.classList.remove("no-hover");
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // 全局 touchstart blur（避免觸控殘留 focus）
  useEffect(() => {
    const handleTouch = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  // 切題時解鎖 + 失焦
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

    // 寫回答案
    selectAnswer(currentQuestion, value);

    const isLast = currentQuestion === questions.length - 1;
    if (isLast) {
      const updated = answers.slice();
      updated[currentQuestion] = value;
      const scoreMap = computeScores(updated);
      const code = classify(scoreMap);
      setTimeout(() => navigate(`/result/${code}`), 300); // SPEED: 300ms
    } else {
      setTimeout(() => {
        goToNext();
      }, 300); // SPEED: 300ms
    }
  };

  const handlePrev = () => {
    if (isSwitching) return;
    setIsSwitching(true);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    goToPrev();
  };

  const handleManualNext = () => {
    if (isSwitching) return;
    setIsSwitching(true);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    goToNext();
  };

  // 是否顯示「下一頁」：只要「當前題號 < 第一個未作答題號」就顯示
  // 代表用戶在已作答區域往回翻，只要還沒回到第一個未答題，就一直顯示。
  const firstUnanswered = firstUnansweredIndex(answers);
  const showNext = currentQuestion < firstUnanswered && currentQuestion < questions.length - 1;

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
            className={`btn-answer-hover px-6 py-3 rounded-lg text-lg font-medium border focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
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

/** 外層頁面 */
const QuizPageV2: React.FC = () => {
  const { isMusicOn, toggleMusic } = useMusic();

  // 進入測驗頁時若尚未開啟音樂，自動播放
  useEffect(() => {
    if (!isMusicOn) toggleMusic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QuizProvider>
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        {/* 星空背景 */}
        <div className="absolute inset-0 z-0">
          <StarCanvasBackground />
        </div>

        {/* 半透遮罩 */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* 題目主區 */}
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
