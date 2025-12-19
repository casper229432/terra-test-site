// src/data/personas/t1b.ts
import type { PersonaData } from "./types";

export const T1B: PersonaData = {
  id: "T1-B",
  tag: { zh: "🧠 T1-B｜The Mastermind（暫名）", en: "🧠 T1-B｜The Mastermind (WIP)" },
  subtitle: {
    zh: "你不是表現自己，而是讓他人照著你的佈局行動。",
    en: "You don’t perform yourself—you move others according to your design.",
  },
  composition: {
    zh: "B軸主導，策略/秩序導向，偏向冷靜決策。",
    en: "B-axis dominant: strategy & order driven, focused on calm decision-making.",
  },
  codeLabel: "T1-B",
  alias: { zh: "策劃者", en: "Mastermind" },
  rank: "T1",
  oneLiner: {
    zh: "以冷靜與縝密，讓複雜系統按你的步調運轉。",
    en: "With calm precision, you make complex systems run on your tempo.",
  },
  description: {
    zh:
      "你擅長在混亂中建立秩序，觀察棋盤、預判人心與資源流向，\n" +
      "當眾人還在各說各話時，你已經完成下一步的佈局。\n\n" +
      "你不一定外放，但你的影響力能穿透場景、跨越角色與部門。",
    en:
      "You build order from chaos—reading the board, anticipating people, and tracking resources.\n" +
      "While others are still arguing, you’ve already set the next move.\n\n" +
      "You may not be loud, but your influence cuts through scenes, roles, and departments.",
  },
  traits: [
    { zh: "高維度的系統思考", en: "High-dimensional systems thinking" },
    { zh: "耐心與延遲滿足", en: "Patience and delayed gratification" },
    { zh: "對風險具備清晰邊界", en: "Clear boundaries around risk" },
    { zh: "冷靜決策 / 去情緒化處理", en: "Calm decisions / de-emotionalized execution" },
  ],
  cautions: [
    { zh: "容易被誤解為冷漠，需主動補足情感溝通", en: "May be seen as cold—actively add emotional clarity." },
    { zh: "避免過度控制，留白能創造更好結果", en: "Avoid over-control—space often creates better outcomes." },
  ],
  cosmosRole: {
    zh: "在 Terra 宇宙中屬於『結構與秩序』的建構者，負責框架、規則與路徑。",
    en: "In the Terra universe, you are a builder of Structure & Order—frameworks, rules, and paths.",
  },
  love: {
    zh: "你在關係中重視可預期性與可靠性，但請偶爾鬆手，讓對方感受到你的柔軟與信任。",
    en: "In love, you value predictability and reliability—sometimes loosen your grip so trust can be felt.",
  },
  work: {
    fits: [
      { zh: "產品策略", en: "Product Strategy" },
      { zh: "系統架構", en: "Systems Architecture" },
      { zh: "風控/法遵", en: "Risk / Compliance" },
      { zh: "運營/流程設計", en: "Operations / Process Design" },
    ],
    style: {
      zh: "資料與證據導向，重視因果鍊與風險邊界，善於在宏觀與微觀間切換。",
      en: "Data- and evidence-driven. Strong causal thinking and risk boundaries. Switches well between macro and micro.",
    },
    mbti: ["INTJ", "ISTJ", "ENTJ"],
  },
  outro: {
    zh: "你善於讓世界有序運作。當你選擇以人為中心而不只是系統，世界會更完整。",
    en: "You keep the world running in order. When you choose people—not only systems—the world becomes whole.",
  },
  cover: "/personas/T1B.jpg",
  theme: {
    primary: "from-indigo-500",
    accent: "text-amber-300",
  },
};
