// src/App.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./components/HamburgerMenu";
import StarfieldTransition from "./components/StarfieldTransition";

function App() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true); // 控制 logo + 按鈕顯示

  useEffect(() => {
    const audio = document.getElementById("bg-audio") as HTMLAudioElement | null;
    if (audio) {
      audio.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleStart = () => {
    setShowContent(false); // 淡出內容
    setTimeout(() => {
      setIsTransitioning(true);
    }, 500); // 稍微等 fadeout 結束再啟動轉場動畫
  };

  const handleTransitionEnd = () => {
    navigate("/quiz"); // 動畫結束後跳轉
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 背景影片 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/dyhdaq6sx/video/upload/v1751914755/1_n8w5b6.mp4"
          type="video/mp4"
        />
      </video>

      {/* 背景音樂 */}
      <audio id="bg-audio" src="/bg.mp3" autoPlay loop muted />

      {/* 遮罩 */}
      <div className="absolute w-full h-full bg-black/60 z-10" />

      {/* 漢堡選單 */}
      <HamburgerMenu isMuted={isMuted} toggleMute={toggleMute} />

      {/* 中央內容 */}
      {showContent && (
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4 transition-opacity duration-700 opacity-100">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-widest drop-shadow-lg font-terra italic">
            TERRA
          </h1>
          <button
            onClick={handleStart}
            className="mt-4 px-8 py-3 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-200 transition"
          >
            開始測驗
          </button>
        </div>
      )}

      {/* 星體穿越特效轉場 */}
      {isTransitioning && <StarfieldTransition onComplete={handleTransitionEnd} />}
    </div>
  );
}

export default App;
