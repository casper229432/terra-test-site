// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route /*, Navigate*/ } from 'react-router-dom';
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

          {/* ✅ 新增：參數版結果頁 */}
          <Route path="/result/:code" element={<ResultPage />} />

          {/* ✅ 保留：舊版（用 location.state 的分數） */}
          <Route path="/result" element={<ResultPage />} />

          {/* 若你想把舊路由直接導回首頁，改成下面這行即可 */}
          {/* <Route path="/result" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </MusicProvider>
  </React.StrictMode>
);
