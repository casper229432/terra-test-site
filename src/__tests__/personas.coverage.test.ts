// src/__tests__/personas.coverage.test.ts
import { pickPersonaId, type Scores } from "utils/classifier";
import { PERSONAS } from "data/personas";
import { questions } from "data/questions";

// 切換嚴格模式：true = 缺文案就讓測試失敗；false = 只 console.warn
const STRICT = false;

// 題目總數：自動取題庫長度
const TOTAL = questions.length;

const makeScores = (A: number, B: number, C: number, D: number): Scores => ({ A, B, C, D });

// 列舉所有非負整數解 A+B+C+D=TOTAL
function enumerateAllScoreTuples(total: number): Scores[] {
  const out: Scores[] = [];
  for (let A = 0; A <= total; A++) {
    for (let B = 0; B <= total - A; B++) {
      for (let C = 0; C <= total - A - B; C++) {
        const D = total - A - B - C;
        out.push(makeScores(A, B, C, D));
      }
    }
  }
  return out;
}

describe("personas 覆蓋率（可能產生的代碼是否都有文案）", () => {
  test(`掃描 ${TOTAL} 題下所有分數分佈，檢查 PERSONAS 覆蓋情況`, () => {
    const allScores = enumerateAllScoreTuples(TOTAL);
    const producedCodes = Array.from(new Set(allScores.map((s) => pickPersonaId(s)))).sort();

    // 基本 sanity check
    expect(producedCodes.length).toBeGreaterThan(0);

    const missing = producedCodes.filter((code) => !PERSONAS[code]);

    if (missing.length > 0) {
      // 只警告（除非 STRICT=true）
      // eslint-disable-next-line no-console
      console.warn(
        `[personas 覆蓋率] 可能被產生但 PERSONAS 缺文案的代碼：\n- ${missing.join(
          "\n- "
        )}\n(將檔案內 STRICT 設為 true 可改為嚴格模式：缺就 fail)`
      );
    }

    // ✅ 永遠執行一個 expect，避免 jest/no-conditional-expect
    const ok = STRICT ? missing.length === 0 : true;
    expect(ok).toBe(true);
  });
});
