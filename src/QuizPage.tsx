// src/QuizPage.tsx
import React from "react";

function QuizPage() {
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

      {/* 遮罩 */}
      <div className="absolute w-full h-full bg-black/60 z-10" />

      {/* 中央內容 */}
      <div className="relative z-20 flex items-center justify-center h-full text-white text-3xl text-center px-4">
        測驗頁面尚在建構中...
      </div>
    </div>
  );
}

export default QuizPage;
