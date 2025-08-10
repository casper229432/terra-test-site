// src/pages/ResultPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import StarCanvasBackground from "../components/StarCanvasBackground";
import HamburgerMenu from "../components/HamburgerMenu";
import { useMusic } from "../context/MusicContext";

// persona 資料表
import { PERSONAS } from "../data/personas";
// 若你有正式的型別，改成正確的 import；沒有就先用 any
type PersonaData = any;

/** 轉場覆蓋層（淡入） */
const PageTransition: React.FC<{ show: boolean; onComplete?: () => void }> = ({
  show,
  onComplete,
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        key="fade"
        className="fixed inset-0 z-[60] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black" />
      </motion.div>
    )}
  </AnimatePresence>
);

/** Terra 風格的二顆主按鈕（共用樣式） */
type TerraButtonProps = HTMLMotionProps<"button"> & { subtle?: boolean };

const TerraButton: React.FC<TerraButtonProps> = ({
  children,
  subtle,
  className = "",
  ...rest
}) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={
      "px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold tracking-wide " +
      (subtle
        ? "bg-white/10 border border-white/20 text-white backdrop-blur-sm hover:bg-white/20 focus:outline-none "
        : "bg-white text-black shadow-lg hover:shadow-xl focus:outline-none ") +
      className
    }
    {...rest}
  >
    {children}
  </motion.button>
);

/**
 * 手機也維持左圖右文的雙欄排版
 */
const PersonaView: React.FC<{
  data: PersonaData;
  onGoHome: () => void;
  onRetake: () => void;
}> = ({ data, onGoHome, onRetake }) => {
  return (
    <main className="relative z-20 mx-auto w-full max-w-6xl px-4 md:px-6 py-8 md:py-10">
      <div className="grid grid-cols-12 gap-4 md:gap-8 items-start text-left">
        {/* 左側：圖片 */}
        <div className="col-span-5 flex justify-center">
          {data?.cover && (
            <div className="w-full max-w-[240px] sm:max-w-[260px] md:max-w-[420px]">
              <img
                src={data.cover}
                alt={data.alias ?? data.tag ?? data.code}
                className="w-full h-auto rounded-2xl border border-white/10 object-contain shadow-xl"
              />
            </div>
          )}
        </div>

        {/* 右側：文字 */}
        <div className="col-span-7 space-y-6 md:space-y-8">
          <header className="space-y-2 md:space-y-3">
            {data?.rank && (
              <div className="inline-block text-sm md:text-lg text-white/70">
                {data.rank}
              </div>
            )}
            <h1 className="text-2xl md:text-3xl font-bold leading-snug">
              {data?.tag ?? data?.alias ?? data?.code}
            </h1>
            {data?.subtitle && (
              <p className="text-[15px] md:text-base text-white/80">
                {data.subtitle}
              </p>
            )}
          </header>

          {data?.composition && (
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 text-[15px] md:text-base">
              <div>人格組成｜{data.composition}</div>
              {data.codeLabel && <div>代號：{data.codeLabel}</div>}
              {data.alias && <div>稱號：{data.alias}</div>}
              {data.rank && <div>位階：{data.rank}</div>}
            </section>
          )}

          {data?.oneLiner && (
            <section>
              <h2 className="text-lg md:text-xl font-semibold">
                🧠 一句話人格定位
              </h2>
              <p className="mt-2 text-[15px] md:text-base">{data.oneLiner}</p>
            </section>
          )}

          {data?.description && (
            <section>
              <h2 className="text-lg md:text-xl font-semibold">🔥 人格描述</h2>
              <p className="mt-2 text-[15px] md:text-base whitespace-pre-line">
                {data.description}
              </p>
            </section>
          )}

          {Array.isArray(data?.traits) && data.traits.length > 0 && (
            <section>
              <h2 className="text-lg md:text-xl font-semibold">
                🔍 核心性格特徵
              </h2>
              <ul className="mt-2 list-disc list-inside space-y-1 text-[15px] md:text-base">
                {data.traits.map((t: string) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          )}

          {Array.isArray(data?.cautions) && data.cautions.length > 0 && (
            <section>
              <h2 className="text-lg md:text-xl font-semibold">⚠️ 注意事項</h2>
              <ul className="mt-2 list-disc list-inside space-y-1 text-[15px] md:text-base">
                {data.cautions.map((c: string) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          )}

          {data?.cosmosRole && (
            <section>
              <h2 className="text-lg md:text-xl font-semibold">
                🪐 在 Terra 宇宙的定位
              </h2>
              <p className="mt-2 text-[15px] md:text-base whitespace-pre-line">
                {data.cosmosRole}
              </p>
            </section>
          )}

          {data?.love && (
            <section>
              <h2 className="text-lg md:text-xl font-semibold">
                💘 愛情觀與戀愛舉動
              </h2>
              <p className="mt-2 text-[15px] md:text-base whitespace-pre-line">
                {data.love}
              </p>
            </section>
          )}

          {data?.work && (
            <section>
              <h2 className="text-lg md:text-xl font-semibold">
                💼 職場定位與可能 MBTI 對應
              </h2>
              <div className="mt-2 text-[15px] md:text-base">
                {Array.isArray(data.work.fits) && (
                  <>
                    <div className="font-medium">適合：</div>
                    <ul className="list-disc list-inside">
                      {data.work.fits.map((f: string) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}
                {data.work.style && (
                  <div className="mt-2">職場風格：{data.work.style}</div>
                )}
                {Array.isArray(data.work.mbti) && (
                  <div className="mt-2">
                    可能 MBTI 對應：{data.work.mbti.join(" / ")}
                  </div>
                )}
              </div>
            </section>
          )}

          {data?.outro && (
            <section>
              <h2 className="text-lg md:text-xl font-semibold">🎬 結語</h2>
              <p className="mt-2 text-[15px] md:text-base whitespace-pre-line">
                {data.outro}
              </p>
            </section>
          )}

          {/* 行動區：Terra 風格精簡版 */}
          <div className="pt-1 md:pt-2 flex flex-wrap gap-3">
            <TerraButton onClick={onGoHome}>回到首頁</TerraButton>
            <TerraButton subtle onClick={onRetake}>再測一次</TerraButton>
          </div>
        </div>
      </div>
    </main>
  );
};

// 沒資料時的占位頁（不露分數）
const PlaceholderView: React.FC<{
  code: string;
  onGoHome: () => void;
  onRetake: () => void;
}> = ({ code, onGoHome, onRetake }) => (
  <main className="relative z-20 mx-auto w-full max-w-3xl px-6 py-16 text-center">
    <h1 className="text-3xl font-bold">你的 Terra 代碼</h1>
    <div className="mt-4 text-4xl font-extrabold">{code}</div>
    <p className="mt-6 text-white/80">
      人格內容建置中，稍後將開放閱讀。你可以先回到首頁或重新測驗。
    </p>
    <div className="mt-8 flex items-center justify-center gap-3">
      <TerraButton onClick={onGoHome}>回到首頁</TerraButton>
      <TerraButton subtle onClick={onRetake}>再測一次</TerraButton>
    </div>
  </main>
);

const ResultPage: React.FC = () => {
  const { code } = useParams<{ code?: string }>();
  const { isMusicOn, toggleMusic } = useMusic();
  const navigate = useNavigate();

  // 進入頁面時確保音樂開啟
  useEffect(() => {
    if (!isMusicOn) toggleMusic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 轉場控制
  const [leaving, setLeaving] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);

  const goWithTransition = (path: string) => {
    if (leaving) return;
    setTargetPath(path);
    setLeaving(true);
    // 等轉場層淡入再導頁
    setTimeout(() => navigate(path), 280);
  };

  const handleGoHome = () => goWithTransition("/");
  const handleRetake = () => goWithTransition("/quiz2");

  const normalized = code?.toUpperCase();
  const persona: PersonaData | undefined = normalized
    ? (PERSONAS as any)[normalized]
    : undefined;

  return (
    <div className="relative w-screen min-h-screen overflow-y-auto bg-black text-white">
      {/* 背景 */}
      <div className="absolute inset-0 z-0">
        <StarCanvasBackground />
      </div>
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* 漢堡選單 */}
      <div className="absolute top-4 right-4 z-30">
        <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
      </div>

      {/* 內容 */}
      {persona ? (
        <PersonaView data={persona} onGoHome={handleGoHome} onRetake={handleRetake} />
      ) : (
        <PlaceholderView code={normalized ?? "—"} onGoHome={handleGoHome} onRetake={handleRetake} />
      )}

      {/* 轉場覆蓋層 */}
      <PageTransition
        show={leaving}
        onComplete={() => {
          if (targetPath) navigate(targetPath);
        }}
      />
    </div>
  );
};

export default ResultPage;
