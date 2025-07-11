import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import { MusicProvider } from './context/MusicContext'; // ✅ 加入這個
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MusicProvider> {/* ✅ 包住整個 App */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </MusicProvider>
  </React.StrictMode>
);
