// src/__tests__/classifier.properties.test.ts
import { classify, type Scores } from "utils/classifier";
import { questions } from "data/questions";

/** tie-break 順序 */
const order: Array<keyof Scores> = ["A", "B", "C", "D"];

/** 依分數↓排序；同分用 A>B>C>D */
function sortTop(s: Scores): Array<[keyof Scores, number]> {
  const arr: Array<[keyof Scores, number]> = [
    ["A", s.A],
    ["B", s.B],
    ["C", s.C],
    ["D", s.D],
  ];
  return arr.sort(
    (a, b) => b[1] - a[1] || order.indexOf(a[0]) - order.indexOf(b[0])
  );
}

/** 列舉所有非負整數解：A+B+C+D = 題目數 */
function enumerateAll(total: number): Scores[] {
  const out: Scores[] = [];
  for (let A = 0; A <= total; A++) {
    for (let B = 0; B <= total - A; B++) {
      for (let C = 0; C <= total - A - B; C++) {
        const D = total - A - B - C;
        out.push({ A, B, C, D });
      }
    }
  }
  return out;
}

describe("classifier 規則整體驗證（可執行規格）", () => {
  const TOTAL = questions.length;
  const all = enumerateAll(TOTAL);

  test(`所有 ${all.length} 組分數分佈皆符合規則與 tie-break`, () => {
    for (const s of all) {
      const res = classify(s);
      const sorted = sortTop(s);
      const [m, m2, m3] = sorted;
      const max = sorted[0][1];

      // 1) main/second/third 與排序結果一致（避免條件式 expect）
      expect(res.main).toBe(res.tier === "T6" ? undefined : m[0]);
      expect(res.second).toBe(
        ["T2", "T4", "T7", "T8"].includes(res.tier) ? m2[0] : undefined
      );
      expect(res.third).toBe(res.tier === "T8" ? m3[0] : undefined);

      // 2) 各 tier 的數學條件必須成立
      const cond = (() => {
        switch (res.tier) {
          case "T1":
            return m[1] >= 13;
          case "T2":
            return m[1] >= 9 && [sorted[1], sorted[2], sorted[3]].some(([, v]) => v >= 4);
          case "T3":
            return m[1] >= 9 && sorted[1][1] < 4 && sorted[2][1] < 4;
          case "T7":
            return m[1] >= 6 && sorted[1][1] >= 6 && m[1] === sorted[1][1];
          case "T4":
            return m[1] >= 6 && m[1] <= 8 && [sorted[1], sorted[2], sorted[3]].some(([, v]) => v >= 4);
          case "T5":
            return m[1] >= 6 && m[1] <= 8 && sorted[1][1] <= 3;
          case "T8": {
            const vs = [s.A, s.B, s.C, s.D].sort((a, b) => b - a);
            const count5 = vs.filter((v) => v === 5).length;
            return count5 === 3;
          }
          case "T6": {
            const vs = [s.A, s.B, s.C, s.D].sort((a, b) => b - a);
            return vs[0] <= 5 && vs[2] <= 4;
          }
          default:
            return false;
        }
      })();
      expect(cond).toBe(true);

      // 3) code 字串與 tier/字母一致
      const expectedTail = (() => {
        if (res.tier === "T6") return ""; // T6 無尾碼
        if (res.tier === "T8" && res.main && res.second && res.third) {
          return `${res.main}${res.second}${res.third}`;
        }
        if (res.main && res.second) return `${res.main}${res.second}`;
        if (res.main) return `${res.main}`;
        return "";
      })();
      const expectedCode = expectedTail ? `${res.tier}-${expectedTail}` : res.tier;
      expect(res.code).toBe(expectedCode);

      // 4) 題數守恆與最大值檢查
      expect(s.A + s.B + s.C + s.D).toBe(TOTAL);
      expect(max).toBeLessThanOrEqual(TOTAL);
    }
  });
});
