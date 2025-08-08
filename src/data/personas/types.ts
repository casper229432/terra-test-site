// src/data/personas/types.ts
export type PersonaId = string; // 例如 'T1B'、未來你要的任何命名

export interface WorkBlock {
  fits: string[];      // 適合
  style: string;       // 職場風格
  mbti: string[];      // 可能 MBTI 對應
}

export interface PersonaData {
  id: PersonaId;
  tag: string;         // 例：🌓 T4-BC｜溫感解譯師
  subtitle: string;    // 一句 summary
  composition: string; // 人格組成
  codeLabel: string;   // 代號（可重複填 'T1B' 或你的系統代碼）
  alias: string;       // 稱號
  rank: string;        // 位階（T1/T2...或你的等級文案）
  oneLiner: string;    // 🧠 一句話人格定位
  description: string; // 🔥 人格描述（可多段，用 \\n\\n 分段）
  traits: string[];    // 🔍 核心性格特徵
  cautions: string[];  // ⚠️ 注意事項
  cosmosRole: string;  // 🪐 在 Terra 宇宙的定位
  love: string;        // 💘 愛情觀與戀愛舉動
  work: WorkBlock;     // 💼 職場定位與可能 MBTI 對應
  outro: string;       // 🎬 結語
  cover?: string;      // 封面圖（public 路徑），例：/personas/T1B.jpg
  theme?: {
    primary?: string;  // Tailwind 顏色類，如 'from-indigo-500'
    accent?: string;   // 用於小點綴的色
  };
}
