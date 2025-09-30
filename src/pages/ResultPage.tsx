// src/pages/ResultPage.tsx
import React, { useEffect, useMemo, useState, useLayoutEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import StarCanvasBackground from "../components/StarCanvasBackground";
import HamburgerMenu from "../components/HamburgerMenu";
import { useMusic } from "../context/MusicContext";
import { PERSONAS } from "../data/personas";

type PersonaData = any;

/** 轉場覆蓋層（淡入） */
const PageTransition: React.FC<{ show: boolean; onComplete?: () => void }> = ({ show, onComplete }) => (
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

/** Terra 風格按鈕 */
type TerraButtonProps = HTMLMotionProps<"button"> & { subtle?: boolean };
const TerraButton: React.FC<TerraButtonProps> = ({ children, subtle, className = "", ...rest }) => (
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

/** 高級感宇宙框（取代羊皮紙） */
const CosmicFrameShell: React.FC<React.PropsWithChildren<{ title?: string }>> = ({ title, children }) => (
  <div className="relative">
    <div className="absolute -inset-[2px] rounded-[24px] bg-gradient-to-br from-white/25 via-white/10 to-white/25 blur-[8px] opacity-60 pointer-events-none" />
    <div className="relative rounded-[24px] p-[1.2px] bg-gradient-to-br from-white/40 via-white/15 to-white/40">
      <div className="rounded-[23px] bg-black/55 backdrop-blur-xl border border-white/10">
        {title && (
          <div className="px-5 pt-5">
            <div className="inline-flex items-center gap-2 text-base md:text-lg font-semibold">
              <span>🪐</span>
              <span>{title}</span>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  </div>
);

/** —— 超滑順收合：量測高度 + spring —— */
const CollapsibleContent: React.FC<{ expanded: boolean; collapsedHeight?: number; children: React.ReactNode }> = ({
  expanded,
  collapsedHeight = 240,
  children,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [contentH, setContentH] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setContentH(el.scrollHeight);
    measure();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, []);

  const target = expanded ? contentH : collapsedHeight;

  return (
    <motion.div
      className="overflow-hidden will-change-[height]"
      initial={false}
      animate={{ height: target }}
      transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.8 }}
    >
      <div ref={ref} className="px-5 py-5 text-[15px] md:text-[16px] leading-7 md:leading-8 text-white/95 whitespace-pre-line">
        {children}
      </div>
    </motion.div>
  );
};

/** 折疊時的底部漸層提示 */
const FadeHint: React.FC<{ show: boolean }> = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        key="fadehint"
        className="pointer-events-none -mt-10 h-10 rounded-b-[23px] bg-gradient-to-b from-transparent to-black/65"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
    )}
  </AnimatePresence>
);

/** HERO：收斂尺寸，確保一屏可截圖 + 完全置中 */
const HeroHeader: React.FC<{ data: PersonaData; code: string }> = ({ data, code }) => {
  const zhTitle: string | undefined = useMemo(() => data?.tag ?? data?.alias ?? undefined, [data]);
  const enTitle: string | undefined = useMemo(() => data?.aliasEn ?? data?.en ?? data?.alias ?? undefined, [data]);
  const subtitle = data?.subtitle ?? "你不是表現自己，而是讓他人照著你的佈局行動。";

  return (
    <section className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* 左：插畫卡片（更小上限，避免撐版） */}
      <div className="col-span-12 md:col-span-5 flex justify-center md:justify-start">
        {data?.cover && (
          <div className="rounded-[20px] border border-white/10 bg-white/5 p-3 shadow-xl">
            <img
              src={data.cover}
              alt={zhTitle ?? code}
              className="w-full h-full object-contain rounded-[14px] border border-white/10"
              style={{ maxHeight: "42vh", maxWidth: "300px" }}
            />
          </div>
        )}
      </div>

      {/* 右：完全置中 */}
      <div className="col-span-12 md:col-span-7 flex flex-col items-center text-center">
        <div className="font-terra tracking-wider leading-[0.95] font-extrabold text-5xl sm:text-6xl lg:text-7xl">
          {code}
        </div>

        {(zhTitle || enTitle) && (
          <div className="mt-3 text-xl md:text-2xl font-semibold">
            {zhTitle}
            {zhTitle && enTitle && <span className="mx-3 text-white/60">|</span>}
            {enTitle && <span className="uppercase tracking-[0.25em] text-white/85">{enTitle}</span>}
          </div>
        )}

        {subtitle && <div className="mt-2 italic text-[12px] md:text-sm text-white/70 tracking-wide">{subtitle}</div>}

        <div className="mt-4 space-y-2.5 md:space-y-3 text-[15px] md:text-base">
          <div className="flex gap-2 justify-center">
            <div className="text-white/70">代號：</div>
            <div className="font-semibold">{data?.codeLabel ?? code}</div>
          </div>
          <div className="flex gap-2 justify-center">
            <div className="text-white/70">位階：</div>
            <div className="font-semibold">{data?.rank ?? code.split("-")[0]}</div>
          </div>
          <div className="flex gap-2 justify-center">
            <div className="text-white/70">人格組成：</div>
            <div className="font-semibold">{data?.composition ?? "—"}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 沒資料時的占位
const PlaceholderView: React.FC<{ code: string; onGoHome: () => void; onRetake: () => void }> = ({
  code,
  onGoHome,
  onRetake,
}) => (
  <main className="relative z-20 mx-auto w-full max-w-3xl px-6 py-16 text-center">
    <div className="text-sm tracking-widest font-semibold opacity-80">Terra</div>
    <h1 className="mt-3 text-3xl font-bold">你的 Terra 代碼</h1>
    <div className="mt-4 text-5xl font-extrabold font-terra">{code}</div>
    <p className="mt-6 text-white/80">人格內容建置中，稍後將開放閱讀。你可以先回到首頁或重新測驗。</p>
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

  useEffect(() => {
    if (!isMusicOn) toggleMusic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [leaving, setLeaving] = useState(false);
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const goWithTransition = (path: string) => {
    if (leaving) return;
    setTargetPath(path);
    setLeaving(true);
  };

  const handleGoHome = () => goWithTransition("/");
  const handleRetake = () => goWithTransition("/quiz2");

  const normalized = code?.toUpperCase();
  const persona: PersonaData | undefined = normalized ? (PERSONAS as any)[normalized] : undefined;

  const mainDescription: string | undefined = persona?.description ?? persona?.oneLiner;

  const [expanded, setExpanded] = useState(true);
  const toggleExpanded = () => setExpanded((v) => !v);

  return (
    <div className="relative w-screen min-h-screen overflow-y-auto bg-black text-white">
      {/* 背景：改為 fixed + 100dvh */}
      <div className="fixed left-0 top-0 w-[100vw] h-[100dvh] z-0 pointer-events-none">
        <StarCanvasBackground />
      </div>
      {/* 半透明黑遮罩 */}
      <div className="fixed left-0 top-0 w-[100vw] h-[100dvh] bg-black/60 z-10" />

      {/* 漢堡選單 */}
      <div className="absolute top-4 right-4 z-30">
        <HamburgerMenu isMuted={!isMusicOn} toggleMute={toggleMusic} />
      </div>

      {!persona ? (
        <PlaceholderView code={normalized ?? "—"} onGoHome={handleGoHome} onRetake={handleRetake} />
      ) : (
        <main className="relative z-20 mx-auto w-full max-w-6xl px-4 md:px-6 py-6 md:py-8">
          <div className="mb-4">
            <div className="text-sm tracking-widest font-semibold opacity-80 text-center md:text-left">Terra</div>
          </div>

          {/* HERO 區：縮圖＋置中對齊 */}
          <HeroHeader data={persona} code={normalized!} />

          {/* 描述框：超滑順收合 */}
          <div className="mt-6">
            <CosmicFrameShell title="人格描述">
              <CollapsibleContent expanded={expanded} collapsedHeight={240}>
                {mainDescription ? <>{mainDescription}</> : <span className="text-white/70">此代碼的人格描述尚未填寫。</span>}
              </CollapsibleContent>

              {/* 折疊提示漸層（僅在收合時顯示） */}
              <FadeHint show={!expanded} />

              {/* 控制列 */}
              <div className="flex justify-end gap-3 px-5 pb-5 -mt-2">
                <TerraButton subtle onClick={toggleExpanded} aria-expanded={expanded}>
                  {expanded ? "收回" : "展開全文"}
                </TerraButton>
              </div>
            </CosmicFrameShell>
          </div>

          {/* 行動按鈕 */}
          <div className="mt-6 flex flex-wrap gap-3">
            <TerraButton onClick={handleGoHome}>回到首頁</TerraButton>
            <TerraButton subtle onClick={handleRetake}>再測一次</TerraButton>
          </div>
        </main>
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
