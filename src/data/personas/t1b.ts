// src/data/personas/t1b.ts
import { PersonaData } from "./types";

export const T1B: PersonaData = {
  id: "T1-B",                           // 與 index.ts 的 key 完全一致
  tag: "🧠 T1-B｜The Mastermind（暫名）",
  subtitle: "你不是表現自己，而是讓他人照著你的佈局行動。",
  composition: "B軸主導，策略/秩序導向，偏向冷靜決策。",
  codeLabel: "T1-B",
  alias: "策劃者",
  rank: "T1",
  oneLiner: "以冷靜與縝密，讓複雜系統按你的步調運轉。",
  description:
    "你擅長在混亂中建立秩序，觀察棋盤、預判人心與資源流向，\n" +
    "當眾人還在各說各話時，你已經完成下一步的佈局。\n\n" +
    "你不一定外放，但你的影響力能穿透場景、跨越角色與部門。",
  traits: [
    "高維度的系統思考",
    "耐心與延遲滿足",
    "對風險具備清晰邊界",
    "冷靜決策 / 去情緒化處理"
  ],
  cautions: [
    "容易被誤解為冷漠，需主動補足情感溝通",
    "避免過度控制，留白能創造更好結果"
  ],
  cosmosRole: "在 Terra 宇宙中屬於『結構與秩序』的建構者，負責框架、規則與路徑。",
  love: "你在關係中重視可預期性與可靠性，但請偶爾鬆手，讓對方感受到你的柔軟與信任。",
  work: {
    fits: ["產品策略", "系統架構", "風控/法遵", "運營/流程設計"],
    style: "資料與證據導向，重視因果鍊與風險邊界，善於在宏觀與微觀間切換。",
    mbti: ["INTJ", "ISTJ", "ENTJ"]
  },
  outro: "你善於讓世界有序運作。當你選擇以人為中心而不只是系統，世界會更完整。",
  cover: "/personas/T1B.jpg",           // 你放在 public/personas/T1B.jpg → 路徑這樣寫
  theme: {
    primary: "from-indigo-500",
    accent: "text-amber-300",
    // 需要更細的排版時可以加：
    // layout: { imageOn: "left", align: "left", imageMaxW: "max-w-[420px]", contentMaxW: "max-w-2xl" },
  }
};
