// src/data/questions.ts

export type Option = {
  text: string;
  type: "A" | "B" | "C" | "D";
};

export type Question = {
  question: string;
  options: Option[];
};

export const questionsZh: Question[] = [
  {
    question: "如果你可以獲得一種超能力，你最希望是？",
    options: [
      { text: "能切斷與外界的連結，完全沉入自己世界，想消失多久就多久。", type: "D" },
      { text: "一種能瞬間燃起自己行動力的能力，想到就能馬上開始做。", type: "A" },
      { text: "一種可以讓日常中的小東西變得特別的能力，像把平凡時刻變得像電影畫面。", type: "C" },
      { text: "能讀懂別人當下的情緒與想法，無論表面說什麼都能看穿。", type: "B" },
    ],
  },
  {
    question: "假設你參加一場陌生人的派對，你會怎麼行動？",
    options: [
      { text: "找個舒服的角落，安靜地體驗這場派對的氛圍。", type: "C" },
      { text: "觀察一下氣氛，有機會就直接找人聊、主動進場。", type: "A" },
      { text: "如果現場能讓我無聲存在，我會滿自在，甚至不介意一整晚都不說話。", type: "D" },
      { text: "先觀察每個人狀態，選擇一個「好切入」的點才加入。", type: "B" },
    ],
  },
  {
    question: "如果你有三天完全空檔，最自然的選擇會是？",
    options: [
      { text: "沉浸在自己的小宇宙裡，不被打擾地享受時間流動。", type: "C" },
      { text: "安排一場新的挑戰，做點刺激的或推進什麼。", type: "A" },
      { text: "躲起來，不想跟任何人互動，就靜靜讓時間自己流過。", type: "D" },
      { text: "把時間分配給朋友、進修、放鬆，各來一點。", type: "B" },
    ],
  },
  {
    question: "假設你喜歡的人今天突然封鎖你，完全沒解釋。你第一個反應？",
    options: [
      { text: "有點震驚，但我馬上會問自己下一步該怎麼應對。", type: "A" },
      { text: "冷靜分析前幾天的互動，推敲可能的變化。", type: "B" },
      { text: "那會讓我很失落，但我會默默放下，不說也不問。", type: "C" },
      { text: "感覺被抽掉什麼，但我會假裝沒事，把自己包起來。", type: "D" },
    ],
  },
  {
    question: "如果你的朋友突然告訴你：「你好像活得太用力了」，你會怎麼想？",
    options: [
      { text: "他們其實也說不出什麼，只是不習慣我這種模式而已。", type: "D" },
      { text: "哈哈可能吧，但我活得有節奏就行。", type: "B" },
      { text: "我不太想解釋，因為有些熱情是沒必要被懂的。", type: "C" },
      { text: "我只是活得夠認真而已，不努力怎麼叫活著。", type: "A" },
    ],
  },
  {
    question: "有人說「每個人都該學會放棄一點夢想」，你會？",
    options: [
      { text: "看他怎麼說，但我知道自己放棄不了那個畫面。", type: "C" },
      { text: "如果那個夢讓我太痛，我會默默把它鎖起來，不說。", type: "D" },
      { text: "分情況，有些夢本來就該轉型成策略。", type: "B" },
      { text: "笑笑，不回答，但我不會照做。", type: "A" },
    ],
  },
  {
    question: "如果你是一部電影的主角，你覺得你的結局會是？",
    options: [
      { text: "起伏很多，但最後站在所有人意料之外的位置。", type: "B" },
      { text: "一個背負重壓、終於打贏的硬派故事。", type: "A" },
      { text: "充滿畫面感，像是一場內心旅程的詩。", type: "C" },
      { text: "結局沒說清楚，但你知道主角還活著，還在走自己的路。", type: "D" },
    ],
  },
  {
    question: "假設你明天就要參加一場殘酷的選拔賽，你會怎麼準備？",
    options: [
      { text: "整理自己的節奏，選一套最熟悉的方式應戰。", type: "C" },
      { text: "不太想練，但我會逼自己沉下來，做完該做的。", type: "D" },
      { text: "全力進化，哪怕只有一天我也會變得更強。", type: "A" },
      { text: "先摸清規則與評審喜好，再動手。", type: "B" },
    ],
  },
  {
    question: "你認為「孤獨」對你來說是什麼？",
    options: [
      { text: "一種必經的路，我習慣自己扛。", type: "A" },
      { text: "有時反而像氧氣，是一種安靜而穩定的狀態。", type: "C" },
      { text: "是我活下來的理由，也是我的武器。", type: "D" },
      { text: "有點難熬，但我會轉移注意力。", type: "B" },
    ],
  },
  {
    question: "你怎麼看待「平凡」？",
    options: [
      { text: "如果我只能選平凡，那寧可不要選。", type: "A" },
      { text: "平凡其實蠻聰明的，只是我不適合而已。", type: "B" },
      { text: "我可以理解，但我會選擇讓日常有自己的節奏。", type: "C" },
      { text: "我不知道該怎麼看待，可能太多時候我只是裝沒事。", type: "D" },
    ],
  },
  {
    question: "假設你喜歡上一個人，你通常的狀態是？",
    options: [
      { text: "想靠近、想保護，但不會讓對方輕易看出來。", type: "A" },
      { text: "會慢慢試探對方底線，再找機會互動。", type: "B" },
      { text: "喜歡是我的事，不見得需要讓對方知道。", type: "C" },
      { text: "會變得很小心，內心戲超多，但表面冷冷的。", type: "D" },
    ],
  },
  {
    question: "你最常在什麼時刻感覺「活著」？",
    options: [
      { text: "決戰前的倒數時刻，心跳快到聽得到。", type: "A" },
      { text: "做到一件很會被低估的事，被誇那刻。", type: "B" },
      { text: "某個夜晚，一首歌、一道光、一個畫面撞到心裡。", type: "C" },
      { text: "當我從一場崩潰中安靜回到現實，還沒死掉的時候。", type: "D" },
    ],
  },
  {
    question: "有人說「你是不是有點防備心太強」，你會？",
    options: [
      { text: "這是生存方式，不是我想這樣。", type: "A" },
      { text: "我會問：\"是有讓你感覺不舒服嗎？\"", type: "B" },
      { text: "心裡記住這句話，但不會表現出來。", type: "D" },
      { text: "沒回答，只是笑一下。", type: "C" },
    ],
  },
  {
    question: "如果你要帶一種氣場進戰場，你選哪種？",
    options: [
      { text: "壓倒一切的衝擊感，敵人還沒動我就已經攻進去了。", type: "A" },
      { text: "看起來平常，但關鍵時刻讓人完全預料不到。", type: "B" },
      { text: "像沒聲音的黑夜，但每一刀都斬在靈魂深處。", type: "C" },
      { text: "他們以為我不會打，下一秒我已經把他們逼到角落。", type: "D" },
    ],
  },
  {
    question: "有人問你：「你這樣每天撐著，是為了什麼？」",
    options: [
      { text: "我知道我能走到大家沒想到的地方。", type: "B" },
      { text: "我沒得選，這是我活下來的方式。", type: "D" },
      { text: "我不想只留下痕跡，我想留下傳說。", type: "A" },
      { text: "因為這是我選的，不選的話我就不是我了。", type: "C" },
    ],
  },
];

export const questionsEn: Question[] = [
  {
    question: "If you could gain one superpower, what would you want most?",
    options: [
      { text: "The ability to cut off from the outside world completely—sink into my own world and disappear for as long as I want.", type: "D" },
      { text: "A power that instantly ignites my drive—if I think it, I can start it immediately.", type: "A" },
      { text: "A power that makes everyday little things feel special—turning ordinary moments into movie scenes.", type: "C" },
      { text: "The ability to read what people feel and think in the moment—see through whatever they say on the surface.", type: "B" },
    ],
  },
  {
    question: "Imagine you walk into a party full of strangers. What do you do?",
    options: [
      { text: "Find a comfortable corner and quietly take in the vibe.", type: "C" },
      { text: "Check the atmosphere—if there’s an opening, I’ll just go talk to people and jump in.", type: "A" },
      { text: "If I can exist silently, I’m totally fine—I'd even be okay not speaking all night.", type: "D" },
      { text: "Observe everyone first, then join when I spot a clean entry point.", type: "B" },
    ],
  },
  {
    question: "If you suddenly have three days completely free, what would you naturally choose?",
    options: [
      { text: "Disappear into my own little universe and enjoy time passing without being disturbed.", type: "C" },
      { text: "Set up a new challenge—something intense, or something I can push forward.", type: "A" },
      { text: "Hide. No interaction. Just let time wash over me.", type: "D" },
      { text: "Split the time between friends, learning, and relaxing—some of each.", type: "B" },
    ],
  },
  {
    question: "Your crush suddenly blocks you today with zero explanation. Your first reaction?",
    options: [
      { text: "Shocked—but I immediately ask myself what my next move should be.", type: "A" },
      { text: "Calmly replay the last few days and infer what changed.", type: "B" },
      { text: "It hurts, but I’ll quietly let it go—no asking, no talking.", type: "C" },
      { text: "It feels like something got pulled out of me, but I’ll act fine and wrap myself up.", type: "D" },
    ],
  },
  {
    question: "If a friend tells you, 'You look like you're living way too intensely,' what do you think?",
    options: [
      { text: "They can’t really explain it—they’re just not used to how I operate.", type: "D" },
      { text: "Maybe. As long as I’m living with rhythm, I’m good.", type: "B" },
      { text: "I don’t feel like explaining. Some passion doesn’t need to be understood.", type: "C" },
      { text: "I’m just serious about life. If you don’t fight for it, what is 'living'?", type: "A" },
    ],
  },
  {
    question: "Someone says, 'Everyone should learn to give up a bit of their dreams.' You…",
    options: [
      { text: "I hear them, but I know I can’t let go of that picture in my head.", type: "C" },
      { text: "If that dream hurts too much, I’ll lock it away quietly and never mention it.", type: "D" },
      { text: "Depends. Some dreams should evolve into strategy.", type: "B" },
      { text: "I smile and don’t answer—but I won’t do it.", type: "A" },
    ],
  },
  {
    question: "If you were the protagonist of a movie, what kind of ending would you have?",
    options: [
      { text: "A lot of ups and downs—ending up somewhere nobody expected.", type: "B" },
      { text: "A hard story: carrying pressure, and finally winning.", type: "A" },
      { text: "Visually poetic—like an inner journey.", type: "C" },
      { text: "The ending isn’t fully explained, but you know the protagonist is still alive, still walking their own path.", type: "D" },
    ],
  },
  {
    question: "You have a brutal selection tryout tomorrow. How do you prepare?",
    options: [
      { text: "Reset my rhythm and face it with the style I know best.", type: "C" },
      { text: "I don’t feel like training, but I’ll force myself to sink in and do what must be done.", type: "D" },
      { text: "Evolve at full speed—even with one day, I’ll make myself stronger.", type: "A" },
      { text: "Figure out the rules and what the judges like, then move.", type: "B" },
    ],
  },
  {
    question: "What is 'loneliness' to you?",
    options: [
      { text: "A road you have to walk. I’m used to carrying it alone.", type: "A" },
      { text: "Sometimes it’s like oxygen—quiet, stable, and necessary.", type: "C" },
      { text: "It’s why I survive—and it’s my weapon.", type: "D" },
      { text: "It’s rough sometimes, so I distract myself.", type: "B" },
    ],
  },
  {
    question: "How do you feel about being 'ordinary'?",
    options: [
      { text: "If I can only choose ordinary, I’d rather choose nothing.", type: "A" },
      { text: "Being ordinary is actually smart. It’s just not for me.", type: "B" },
      { text: "I get it—but I’d rather build my own rhythm inside daily life.", type: "C" },
      { text: "I’m not sure. A lot of the time I’m just pretending I’m fine.", type: "D" },
    ],
  },
  {
    question: "When you fall for someone, what are you usually like?",
    options: [
      { text: "I want to get close and protect them, but I won’t let it show easily.", type: "A" },
      { text: "I test their boundaries slowly, then look for openings to interact.", type: "B" },
      { text: "Liking them is my business. It doesn’t have to be known.", type: "C" },
      { text: "I become extremely careful—tons of inner drama, but cold on the outside.", type: "D" },
    ],
  },
  {
    question: "When do you most often feel 'alive'?",
    options: [
      { text: "The countdown before the final battle—my heartbeat is so loud I can hear it.", type: "A" },
      { text: "When I pull off something people would underestimate, and get praised for it.", type: "B" },
      { text: "Some night—one song, one light, one image hitting my chest.", type: "C" },
      { text: "When I quietly crawl back to reality after a breakdown—and I’m still not dead.", type: "D" },
    ],
  },
  {
    question: "Someone says, 'Aren’t you a bit too guarded?' You…",
    options: [
      { text: "It’s survival. Not something I chose for fun.", type: "A" },
      { text: 'I ask, "Did I make you uncomfortable?"', type: "B" },
      { text: "I remember it, but I won’t show anything.", type: "D" },
      { text: "I don’t answer—just smile.", type: "C" },
    ],
  },
  {
    question: "If you had to bring one kind of aura into battle, which would you choose?",
    options: [
      { text: "Pure impact. Before they move, I’ve already broken in.", type: "A" },
      { text: "Looks normal—until the key moment, when I become completely unpredictable.", type: "B" },
      { text: "A silent night—every strike cutting straight into the soul.", type: "C" },
      { text: "They think I can’t fight. Next second, I’ve pushed them into a corner.", type: "D" },
    ],
  },
  {
    question: "Someone asks you, 'Why do you keep holding on every day like this?'",
    options: [
      { text: "I know I can reach somewhere nobody thought I could.", type: "B" },
      { text: "I don’t have a choice. This is how I survive.", type: "D" },
      { text: "I don’t want to leave just traces—I want to leave a legend.", type: "A" },
      { text: "Because this is what I chose. If I don’t choose it, I’m not me.", type: "C" },
    ],
  },
];

export const getQuestions = (lang: "zh" | "en"): Question[] =>
  lang === "en" ? questionsEn : questionsZh;

// 相容舊用法：原本 import { questions } 的地方不會炸
export const questions: Question[] = questionsZh;
