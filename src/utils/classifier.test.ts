// src/utils/classifier.test.ts
import { classify, countScores, pickPersonaId, type Scores, type Answer } from "utils/classifier";

const makeScores = (A: number, B: number, C: number, D: number): Scores => ({ A, B, C, D });

// 題目數（你的題庫目前 15 題）
const TOTAL = 15;
const buildAnswers = (A: number, B: number, C: number, D: number): Answer[] => {
  const arr: Answer[] = [
    ...Array(A).fill("A"),
    ...Array(B).fill("B"),
    ...Array(C).fill("C"),
    ...Array(D).fill("D"),
  ];
  while (arr.length < TOTAL) arr.push(null);
  return arr.slice(0, TOTAL);
};

describe("classifier｜分層與代碼", () => {
  test("T1｜極端純種：主型 ≥13", () => {
    expect(classify(makeScores(13, 1, 1, 0)).code).toBe("T1-A");
  });

  test("T2｜純種+副核：主型 ≥9 且至少一副型 ≥4", () => {
    expect(classify(makeScores(0, 10, 4, 1)).code).toBe("T2-BC"); // B=10, C=4
  });

  test("T3｜純種：主型 ≥9，其他 <4", () => {
    expect(classify(makeScores(9, 3, 2, 1)).code).toBe("T3-A");
  });

  test("T4｜主核 6~8 且至少一副型 ≥4（第二高 tie 時採 A>B>C>D）", () => {
    // A=8，B=4、C=4 並列第二 → 應選 B → T4-AB
    expect(classify(makeScores(8, 4, 4, 0)).code).toBe("T4-AB");
  });

  test("T5｜主核共存：主型 6~8 且第二高 ≤3", () => {
    expect(classify(makeScores(2, 3, 3, 6)).code).toBe("T5-D"); // D=6，次高=3
  });

  test("T7｜雙主核：兩項並列最高且均 ≥6（tie-break 選字母序）", () => {
    expect(classify(makeScores(6, 6, 2, 1)).code).toBe("T7-AB");
  });

  test("T8｜三主核：恰有三項 = 5（字母序 A→B→C）", () => {
    expect(classify(makeScores(5, 5, 5, 0)).code).toBe("T8-ABC");
  });

  test("T6｜均衡變化：最高 ≤5 且第三高 ≤4（且未命中其它型）", () => {
    expect(classify(makeScores(5, 5, 4, 1)).code).toBe("T6");
  });

  test("countScores 串 pickPersonaId 應產生正確代碼", () => {
    const answers = buildAnswers(13, 1, 1, 0);
    const scores = countScores(answers);
    expect(scores).toEqual(makeScores(13, 1, 1, 0));
    expect(pickPersonaId(scores)).toBe("T1-A");
  });

  test("回傳字串格式為 T# 或 T#-<ABCD…>", () => {
    const samples: Scores[] = [
      makeScores(13,1,1,0),
      makeScores(10,4,1,0),
      makeScores(9,3,2,1),
      makeScores(8,4,4,0),
      makeScores(6,3,3,3),
      makeScores(6,6,2,1),
      makeScores(5,5,5,0),
      makeScores(5,5,4,1),
    ];
    const re = /^T[1-8](?:-[ABCD]{1,3})?$/;
    for (const s of samples) {
      expect(pickPersonaId(s)).toMatch(re);
    }
  });

  // ⭐ 新增：分類結果不受作答順序影響
  test("分類結果不受作答順序影響（同一組 A/B/C/D 總數）", () => {
    const baseAnswers: Answer[] = buildAnswers(8, 4, 4, 0); // 換其他分佈也可
    const baseCode = classify(countScores(baseAnswers)).code;

    // 簡單洗牌（Fisher–Yates），每次都產生新序列
    const shuffle = <T,>(arr: T[]): T[] => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    for (let i = 0; i < 30; i++) {
      const code = classify(countScores(shuffle(baseAnswers))).code;
      expect(code).toBe(baseCode);
    }
  });
});
