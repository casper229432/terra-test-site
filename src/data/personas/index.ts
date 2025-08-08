// src/data/personas/index.ts
import { T1B } from "./t1b";
import type { PersonaData } from "./types";

export const PERSONAS: Record<string, PersonaData> = {
  // key 一定要和 URL 代碼完全一致（含連字號、大寫）
  "T1-B": T1B,
  // 之後持續加上去：
  // "T3-A": T3A,
  // "T4-BC": T4BC,
  // "T6": T6,
};
