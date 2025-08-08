// src/utils/classifier.ts
export type Scores = { A: number; B: number; C: number; D: number };
export type Answer = "A" | "B" | "C" | "D" | null;

export function countScores(answers: Answer[]): Scores {
  const s: Scores = { A: 0, B: 0, C: 0, D: 0 };
  for (const a of answers) if (a) s[a]++;
  return s;
}

type Tier = "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7" | "T8";

export interface Classification {
  tier: Tier;
  main?: keyof Scores;
  second?: keyof Scores;
  third?: keyof Scores;
  code: string; // 例如 T4-BC / T1-B / T6 / T8-ABC
}

const letterOrder: (keyof Scores)[] = ["A", "B", "C", "D"];

function sortTop(scores: Scores): Array<[keyof Scores, number]> {
  // 分數高者在前；同分用 A>B>C>D 作穩定排序當作 tie-break
  return (Object.entries(scores) as Array<[keyof Scores, number]>).sort(
    (a, b) => b[1] - a[1] || letterOrder.indexOf(a[0]) - letterOrder.indexOf(b[0])
  );
}

export function classify(scores: Scores): Classification {
  const sorted = sortTop(scores);
  const [t1, t2, t3, t4] = sorted;
  const main = t1[0], mainScore = t1[1];
  const second = t2[0], secondScore = t2[1];
  const thirdScore = t3[1]; // 只需要第三名分數做判斷
  const values = [t1[1], t2[1], t3[1], t4[1]];

  // 🧠 T1｜極端純種：單一人格 ≥13
  if (mainScore >= 13) {
    return { tier: "T1", main, code: `T1-${main}` };
  }

  // ⚔️ T2｜純種 + 副核：主型 ≥9，且至少一副型 ≥4
  if (mainScore >= 9 && [t2, t3, t4].some(([, v]) => v >= 4)) {
    return { tier: "T2", main, second, code: `T2-${main}${second}` };
  }

  // 🔥 T3｜純種：主型 ≥9，其餘 <4
  if (mainScore >= 9 && secondScore < 4 && thirdScore < 4) {
    return { tier: "T3", main, code: `T3-${main}` };
  }

  // ♊ T7｜雙主核：兩項並列最高且均 ≥6
  if (mainScore >= 6 && secondScore >= 6 && mainScore === secondScore) {
    return { tier: "T7", main, second, code: `T7-${main}${second}` };
  }

  // 🎯 T4｜主核 + 副核：主型 6~8，且至少一副型 ≥4
  if (mainScore >= 6 && mainScore <= 8 && [t2, t3, t4].some(([, v]) => v >= 4)) {
    return { tier: "T4", main, second, code: `T4-${main}${second}` };
  }

  // ⚙️ T5｜主核共存型：主型 6~8，且沒有副型 ≥4（= 其餘 ≤3）
  if (mainScore >= 6 && mainScore <= 8 && secondScore <= 3) {
    return { tier: "T5", main, code: `T5-${main}` };
  }

  // 🧩 T8｜三主核：恰有三項 = 5
  const sortedValsDesc = [...values].sort((a, b) => b - a);
  const eq5 = sortedValsDesc.filter((v) => v === 5).length;
  if (eq5 === 3) {
    const letters = (sorted.filter(([, v]) => v === 5).map(([k]) => k) as (keyof Scores)[])
      .sort((a, b) => letterOrder.indexOf(a) - letterOrder.indexOf(b));
    return {
      tier: "T8",
      main: letters[0],
      second: letters[1],
      third: letters[2],
      code: `T8-${letters.join("")}`,
    };
  }

  // 🌈 T6｜均衡變化型（你的新版定義）：
  // 最高分 ≤ 5，且第三高 ≤ 4（同時不屬於前面任何象限）
  const [m1, , m3] = sortedValsDesc;
  if (m1 <= 5 && m3 <= 4) {
    return { tier: "T6", code: "T6" };
  }

  // 理論上到不了；保底回傳 T5-主型
  return { tier: "T5", main, code: `T5-${main}` };
}

// 提供現有頁面呼叫（只取代碼字串）
export function pickPersonaId(scores: Scores): string {
  return classify(scores).code;
}
