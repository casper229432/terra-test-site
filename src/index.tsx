// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import QuizPage from './QuizPage';
import './index.css';

// 💡 未來可擴充更多頁面（如 WhitepaperPage, PersonalityIntroPage 等）

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 首頁 */}
        <Route path="/" element={<App />} />

        {/* 測驗頁（多題導覽與選項紀錄會在 QuizPage 中處理） */}
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
