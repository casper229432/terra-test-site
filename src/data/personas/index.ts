// src/data/personas/index.ts
import { T1B } from "./t1b";
import type { PersonaData } from "./types";

export const PERSONAS: Record<string, PersonaData> = {
  "T1-B": T1B,
};

if (process.env.NODE_ENV !== "production") {
  for (const [key, p] of Object.entries(PERSONAS)) {
    if (p.id !== key) throw new Error(`[PERSONAS] key "${key}" != persona.id "${p.id}"`);
  }
}
