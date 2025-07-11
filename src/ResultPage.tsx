import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const scores = location.state?.scores;

  if (!scores) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-white bg-black">
        <p>你還沒完成測驗！</p>
        <button
          onClick={() => navigate("/quiz")}
          className="mt-4 px-4 py-2 bg-white text-black rounded"
        >
          返回測驗
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-3xl mb-6">測驗完成！</h1>
      <div className="space-y-3 text-xl">
        <p>🔥 熾焰英雄（A）：{scores.A}</p>
        <p>🧩 現實玩家（B）：{scores.B}</p>
        <p>🎨 靈魂造者（C）：{scores.C}</p>
        <p>🕳️ 黑焰反者（D）：{scores.D}</p>
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-8 px-4 py-2 bg-white text-black rounded"
      >
        返回首頁
      </button>
    </div>
  );
}

export default ResultPage;
