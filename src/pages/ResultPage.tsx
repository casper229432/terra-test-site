// src/pages/ResultPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const personalityMap: Record<string, string> = {
  A: "🔥 熾焰英雄",
  B: "🧩 現實玩家",
  C: "🎨 靈魂造者",
  D: "🕳️ 黑焰反者",
};

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scores = location.state?.scores ?? null;

  if (!scores) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-black">
        <p>未找到測驗結果，請重新進行測驗。</p>
        <button
          onClick={() => navigate("/quiz")}
          className="mt-4 px-4 py-2 bg-white text-black rounded"
        >
          回到測驗
        </button>
      </div>
    );
  }

  // 判斷最高分（可能會同分）
  const maxScore = Math.max(...Object.values(scores) as number[]);
  const highestTypes = Object.keys(scores).filter(
    (key) => scores[key as keyof typeof scores] === maxScore
  );

  const resultTitle = highestTypes.map((key) => personalityMap[key]).join(" ＋ ");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4 space-y-6">
      <h1 className="text-3xl font-bold">你的人格主軸：{resultTitle}</h1>

      <div className="space-y-2 text-lg mt-4">
        <p>🔥 熾焰英雄（A）：{scores.A}</p>
        <p>🧩 現實玩家（B）：{scores.B}</p>
        <p>🎨 靈魂造者（C）：{scores.C}</p>
        <p>🕳️ 黑焰反者（D）：{scores.D}</p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-white text-black rounded"
      >
        返回首頁
      </button>
    </div>
  );
};

export default ResultPage;
