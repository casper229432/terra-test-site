// src/data/personas/types.ts
export type PersonaId = string; // e.g. "T1-B", "T4-BC", "T6"

export type Lang = "zh" | "en";
export type I18nText = { zh: string; en: string };
export type MaybeI18nText = string | I18nText;

export interface WorkBlock {
  fits: MaybeI18nText[];
  style: MaybeI18nText;
  mbti: string[];
}

export interface PersonaData {
  id: PersonaId;               // 必須跟 index.ts key 一致
  tag: MaybeI18nText;          // 例：🧠 T1-B｜The Mastermind
  subtitle: MaybeI18nText;     // 一句 summary
  composition: MaybeI18nText;  // 人格組成（可先中文）
  codeLabel?: string;          // 可省略，未填就用 id
  alias: MaybeI18nText;        // 稱號
  rank: string;                // 位階（T1/T2...）
  oneLiner: MaybeI18nText;     // 🧠 一句話人格定位
  description: MaybeI18nText;  // 🔥 人格描述（可多段）
  traits: MaybeI18nText[];     // 🔍 核心性格特徵
  cautions: MaybeI18nText[];   // ⚠️ 注意事項
  cosmosRole: MaybeI18nText;   // 🪐 宇宙定位
  love: MaybeI18nText;         // 💘 愛情觀
  work: WorkBlock;             // 💼 職場
  outro: MaybeI18nText;        // 🎬 結語
  cover?: string;
  theme?: {
    primary?: string;
    accent?: string;
  };
}

// helpers: 英文缺就回中文 / string 直接當中文
export const pickText = (v: MaybeI18nText, lang: Lang): string => {
  if (typeof v === "string") return v;
  return lang === "en" ? (v.en || v.zh) : v.zh;
};

export const pickTextList = (arr: MaybeI18nText[], lang: Lang): string[] =>
  arr.map((v) => pickText(v, lang));
