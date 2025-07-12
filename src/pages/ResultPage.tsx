// src/pages/ResultPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scores = location.state?.scores || location.state?.result;

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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4 space-y-6">
      <h1 className="text-3xl font-bold">你的 Terra 分數</h1>
      <div className="space-y-2 text-lg">
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
