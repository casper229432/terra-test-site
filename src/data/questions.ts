// src/data/questions.ts

export type Option = {
  text: string;
  type: "A" | "B" | "C" | "D";
};

export type Question = {
  question: string;
  options: Option[];
};

export const questions: Question[] = [
  {
    question: "你最常被朋友誤會的地方是？",
    options: [
      { text: "看起來什麼都不在乎", type: "D" },
      { text: "其實沒那麼有自信", type: "B" },
      { text: "太拼命，讓人覺得你想贏過所有人", type: "A" },
      { text: "只是安靜，不代表沒想法", type: "C" },
    ],
  },
  {
    question: "你對未來最真實的想法是？",
    options: [
      { text: "可以安穩生活就好，不用太精彩", type: "B" },
      { text: "我要的是靈魂的完成，不是大家的掌聲", type: "C" },
      { text: "如果我失敗，就沒人會記得我", type: "A" },
      { text: "不確定要去哪，但我知道不能跟他們一樣", type: "D" },
    ],
  },
  {
    question: "你最有可能被什麼情境打動？",
    options: [
      { text: "一個人默默創作多年，最後被世界發現", type: "C" },
      { text: "所有人都離開了，但他還在堅持某個信念", type: "D" },
      { text: "主角受盡輕視後突然爆發、逆轉一切", type: "A" },
      { text: "努力很多的人，終於能安心過生活", type: "B" },
    ],
  },
];
