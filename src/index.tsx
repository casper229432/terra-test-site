// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import QuizPageV2 from './pages/QuizPageV2';
import ResultPage from './pages/ResultPage';
import { MusicProvider } from './context/MusicContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MusicProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/quiz2" element={<QuizPageV2 />} />

          {/* 新版結果頁：帶 code */}
          <Route path="/result/:code" element={<ResultPage />} />

          {/* 舊版保留（如果有人直接打 /result） */}
          <Route path="/result" element={<ResultPage />} />

          {/* ★ 萬用路由：任何未知路由都回首頁，避免白畫面 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MusicProvider>
  </React.StrictMode>
);
