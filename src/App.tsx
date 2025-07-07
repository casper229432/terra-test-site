// src/App.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./components/HamburgerMenu";

function App() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = document.getElementById("bg-audio") as HTMLAudioElement | null;
    if (audio) {
      audio.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
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
        Your browser does not support the video tag.
      </video>

      {/* 背景音樂 */}
      <audio id="bg-audio" src="/bg.mp3" autoPlay loop muted />

      {/* 遮罩 */}
      <div className="absolute w-full h-full bg-black/60 z-10" />

      {/* 漢堡選單 */}
      <HamburgerMenu isMuted={isMuted} toggleMute={toggleMute} />

      {/* 中央內容 */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 tracking-widest drop-shadow-lg font-terra italic">
          TERRA
        </h1>

        <button
          onClick={() => navigate("/quiz")}
          className="mt-4 px-8 py-3 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-200 transition"
        >
          開始測驗
        </button>
      </div>
    </div>
  );
}

export default App;
