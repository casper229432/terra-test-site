// src/pages/ResultPage.tsx
import React from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import StarCanvasBackground from "../components/StarCanvasBackground";
import HamburgerMenu from "../components/HamburgerMenu";
import { useMusic } from "../context/MusicContext";
import { PERSONAS } from "../data/personas";
import type { PersonaData } from "../data/personas/types";

// 舊版分數型別（為了相容目前流程）
type Scores = { A: number; B: number; C: number; D: number };

const PersonaView: React.FC<{ data: PersonaData }> = ({ data }) => {
  return (
    <main className="relative z-20 max-w-3xl mx-auto px-6 py-12 space-y-8">
      <header className="space-y-3">
        <div
          className={`inline-block text-lg bg-gradient-to-r ${
            data.theme?.primary ?? "from-cyan-500"
          } to-transparent bg-clip-text text-transparent`}
        >
          {data.rank}
        </div>
        <h1 className="text-3xl font-bold">{data.tag}</h1>
        <p className="text-white/80">{data.subtitle}</p>
      </header>

      {data.cover && (
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <img src={data.cover} alt={data.alias} className="w-full h-auto" />
        </div>
      )}

      <section className="grid grid-cols-2 gap-3 md:gap-6">
        <div>人格組成｜{data.composition}</div>
        <div>代號：{data.codeLabel}</div>
        <div>稱號：{data.alias}</div>
        <div>位階：{data.rank}</div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">🧠 一句話人格定位</h2>
        <p className="mt-2">{data.oneLiner}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">🔥 人格描述</h2>
        <p className="mt-2 whitespace-pre-line">{data.description}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">🔍 核心性格特徵</h2>
        <ul className="mt-2 list-disc list-inside space-y-1">
          {data.traits.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">⚠️ 注意事項</h2>
        <ul className="mt-2 list-disc list-inside space-y-1">
          {data.cautions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">🪐 在 Terra 宇宙的定位</h2>
        <p className="mt-2">{data.cosmosRole}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">💘 愛情觀與戀愛舉動</h2>
        <p className="mt-2 whitespace-pre-line">{data.love}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">💼 職場定位與可能 MBTI 對應</h2>
        <div className="mt-2">
          <div className="font-medium">適合：</div>
          <ul className="list-disc list-inside">
            {data.work.fits.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="mt-2">職場風格：{data.work.style}</div>
          <div className="mt-2">可能 MBTI 對應：{data.work.mbti.join(" / ")}</div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">🎬 結語</h2>
        <p className="mt-2">{data.outro}</p>
      </section>

      <div className="pt-6 flex gap-3">
        <Link to="/" className="px-4 py-2 bg-white text-black rounded">
          重新測驗
        </Link>
        <Link to="/quiz2" className="px-4 py-2 bg-white/80 text-black rounded">
          回到題目
        </Link>
      </div>
    </main>
  );
};

// 舊版分數視圖（保留相容，之後可移除）
const ScoresView: React.FC<{ scores: Scores }> = ({ scores }) => {
  return (
    <main className="relative z-20 max-w-2xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-2xl font-bold">分數結算</h1>
      <ul className="space-y-2">
        {(["A", "B", "C", "D"] as const).map((k) => (
          <li key={k}>
            {k}：{scores[k]}
          </li>
        ))}
      </ul>
      <Link
        to="/"
        className="inline-block mt-4 px-4 py-2 bg-white text-black rounded"
      >
        重新測驗
      </Link>
    </main>
  );
};

const ResultPage: React.FC = () => {
  const { code } = useParams();
  const location = useLocation() as any;
  const navigate = useNavigate();
  const { isMusicOn, toggleMusic } = useMusic();

  const persona: PersonaData | undefined = code ? PERSONAS[code] : undefined;

  // 若 URL 有 id 且能命中，就用新版本
  if (persona) {
    return (
      <div className="relative w-screen min-h-screen overflow-y-auto bg-black text-white">
        <div className="absolute inset-0 z-0">
          <StarCanvasBackground />
        </div>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute top-4 right-4 z-30">
          <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
        </div>
        <PersonaView data={persona} />
      </div>
    );
  }

  // 否則退回舊的分數版（相容目前流程）
  const scores: Scores | undefined =
    location.state?.scores || location.state?.result;
  if (!scores) {
    return (
      <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <StarCanvasBackground />
        </div>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full gap-6">
          <div className="text-xl">沒有找到結果</div>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-white text-black rounded"
          >
            回到首頁
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen min-h-screen overflow-y-auto bg-black text-white">
      <div className="absolute inset-0 z-0">
        <StarCanvasBackground />
      </div>
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute top-4 right-4 z-30">
        <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
      </div>
      <ScoresView scores={scores} />
    </div>
  );
};

export default ResultPage;
