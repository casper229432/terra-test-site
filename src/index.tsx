// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import QuizPageV2 from "./pages/QuizPageV2";
import ResultPage from "./pages/ResultPage";
import { MusicProvider } from "./context/MusicContext";
import { LanguageProvider } from "./context/LanguageContext"; // ✅ 新增
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <MusicProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/quiz2" element={<QuizPageV2 />} />
            {/* 正規結果頁（帶 code） */}
            <Route path="/result/:code" element={<ResultPage />} />
            {/* 萬用路由：未知路由回首頁 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </MusicProvider>
    </LanguageProvider>
  </React.StrictMode>
);
