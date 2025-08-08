// src/utils/classifier.ts
export type Letter = "A"|"B"|"C"|"D";
export type Scores = Record<Letter, number>;

/** 統計分數 */
export function countScores(answers: (Letter|null)[]): Scores {
  return answers.reduce(
    (acc, a) => (a ? { ...acc, [a]: acc[a] + 1 } : acc),
    { A:0, B:0, C:0, D:0 }
  );
}

/** 取得最高票字母（同分用 A>B>C>D 穩定排序） */
export function topLetter(scores: Scores): Letter {
  const order: Letter[] = ["A","B","C","D"];
  return order.sort(
    (x, y) => (scores[y] - scores[x]) || (order.indexOf(x) - order.indexOf(y))
  )[0];
}

/**
 * 暫時：把最高票字母映射成 T1X（為了先能展示 T1B）
 * 之後我們把 47 種規則換成真正的映射即可（可做成表格/權重/規則引擎）。
 */
export function pickPersonaId(scores: Scores): string {
  const t = topLetter(scores);
  return `T1${t}`; // 例：B -> T1B
}
