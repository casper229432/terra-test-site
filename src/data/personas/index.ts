// src/data/personas/index.ts
import { T1B } from "./t1b";
import type { PersonaData } from "./types";

export const PERSONAS: Record<string, PersonaData> = {
  T1B,
  // 之後在這裡加更多： T2A, T3C, ... 等等
};
