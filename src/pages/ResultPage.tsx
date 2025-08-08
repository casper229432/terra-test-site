// src/pages/ResultPage.tsx
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import StarCanvasBackground from "../components/StarCanvasBackground";
import HamburgerMenu from "../components/HamburgerMenu";
import { useMusic } from "../context/MusicContext";

// 你的 persona 資料表（鍵：T1-B / T4-BC / T6 ...）
import { PERSONAS } from "../data/personas";
// 如果沒有 types，可把下面的 PersonaData 換成 any
type PersonaData = any;

const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

// 顯示一個 persona 的版面（支援簡單佈局參數）
const PersonaView: React.FC<{ data: PersonaData }> = ({ data }) => {
  const layout = data?.theme?.layout ?? {};
  const imageFirst = (layout.imageOn ?? "left") === "left";
  const align = layout.align ?? "left";
  const imageMaxW = layout.imageMaxW ?? "max-w-[420px]";
  const contentMaxW = layout.contentMaxW ?? "max-w-3xl";

  return (
    <main className="relative z-20 mx-auto w-full max-w-6xl px-6 py-10">
      <div
        className={cx(
          "grid md:grid-cols-12 gap-8 items-start",
          align === "center" ? "text-center" : "text-left"
        )}
      >
        {/* 圖片欄 */}
        <div
          className={cx(
            "md:col-span-5 flex justify-center",
            imageFirst ? "order-1" : "order-2"
          )}
        >
          {data?.cover && (
            <div className={cx("w-full", imageMaxW)}>
              <img
                src={data.cover}
                alt={data.alias ?? data.tag ?? data.code}
                className="w-full h-auto rounded-2xl border border-white/10 object-contain shadow-xl"
              />
            </div>
          )}
        </div>

        {/* 文字欄 */}
        <div
          className={cx(
            "md:col-span-7 space-y-8",
            imageFirst ? "order-2" : "order-1",
            contentMaxW,
            align === "center" && "mx-auto"
          )}
        >
          <header className="space-y-3">
            {data?.rank && (
              <div className="inline-block text-lg text-white/70">{data.rank}</div>
            )}
            <h1 className="text-3xl font-bold">
              {data?.tag ?? data?.alias ?? data?.code}
            </h1>
            {data?.subtitle && <p className="text-white/80">{data.subtitle}</p>}
          </header>

          {data?.composition && (
            <section className="grid grid-cols-2 gap-3 md:gap-6">
              <div>人格組成｜{data.composition}</div>
              {data.codeLabel && <div>代號：{data.codeLabel}</div>}
              {data.alias && <div>稱號：{data.alias}</div>}
              {data.rank && <div>位階：{data.rank}</div>}
            </section>
          )}

          {data?.oneLiner && (
            <section>
              <h2 className="text-xl font-semibold">🧠 一句話人格定位</h2>
              <p className="mt-2">{data.oneLiner}</p>
            </section>
          )}

          {data?.description && (
            <section>
              <h2 className="text-xl font-semibold">🔥 人格描述</h2>
              <p className="mt-2 whitespace-pre-line">{data.description}</p>
            </section>
          )}

          {Array.isArray(data?.traits) && data.traits.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold">🔍 核心性格特徵</h2>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {data.traits.map((t: string) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          )}

          {Array.isArray(data?.cautions) && data.cautions.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold">⚠️ 注意事項</h2>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {data.cautions.map((c: string) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          )}

          {data?.cosmosRole && (
            <section>
              <h2 className="text-xl font-semibold">🪐 在 Terra 宇宙的定位</h2>
              <p className="mt-2 whitespace-pre-line">{data.cosmosRole}</p>
            </section>
          )}

          {data?.love && (
            <section>
              <h2 className="text-xl font-semibold">💘 愛情觀與戀愛舉動</h2>
              <p className="mt-2 whitespace-pre-line">{data.love}</p>
            </section>
          )}

          {data?.work && (
            <section>
              <h2 className="text-xl font-semibold">💼 職場定位與可能 MBTI 對應</h2>
              <div className="mt-2">
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
              <h2 className="text-xl font-semibold">🎬 結語</h2>
              <p className="mt-2 whitespace-pre-line">{data.outro}</p>
            </section>
          )}

          <div className="pt-2 flex gap-3">
            <Link to="/" className="px-4 py-2 bg-white text-black rounded">
              回到首頁
            </Link>
            <Link to="/quiz2" className="px-4 py-2 bg-white/80 text-black rounded">
              再測一次
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

// 若該 code 暫時沒有對應 Persona 檔，顯示占位頁（不露分數）
const PlaceholderView: React.FC<{ code: string }> = ({ code }) => (
  <main className="relative z-20 mx-auto w-full max-w-3xl px-6 py-16 text-center">
    <h1 className="text-3xl font-bold">你的 Terra 代碼</h1>
    <div className="mt-4 text-4xl font-extrabold">{code}</div>
    <p className="mt-6 text-white/80">
      人格內容建置中，稍後將開放閱讀。你可以先回到首頁或重新測驗。
    </p>
    <div className="mt-8 flex items-center justify-center gap-3">
      <Link to="/" className="px-4 py-2 bg-white text-black rounded">
        回到首頁
      </Link>
      <Link to="/quiz2" className="px-4 py-2 bg-white/80 text-black rounded">
        再測一次
      </Link>
    </div>
  </main>
);

const ResultPage: React.FC = () => {
  const { code } = useParams<{ code?: string }>();
  const { isMusicOn, toggleMusic } = useMusic();

  // 進入結果頁自動確保音樂開啟
  useEffect(() => {
    if (!isMusicOn) toggleMusic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 解析 URL 代碼（例如 T4-BC / T6）
  const normalized = code?.toUpperCase();
  const persona: PersonaData | undefined = normalized
    ? (PERSONAS as any)[normalized]
    : undefined;

  return (
    <div className="relative w-screen min-h-screen overflow-y-auto bg-black text-white">
      <div className="absolute inset-0 z-0">
        <StarCanvasBackground />
      </div>
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute top-4 right-4 z-30">
        <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
      </div>

      {/* 命中 persona 就顯示內容；沒有就顯示占位頁 */}
      {persona ? <PersonaView data={persona} /> : <PlaceholderView code={normalized ?? "—"} />}
    </div>
  );
};

export default ResultPage;
