export type Option = { label: string; weight: number };
export type Question = { prompt: string; options: Option[] };

// Each question's heaviest option is 20, so a fully kepam run scores 100.
export const QUESTIONS: Question[] = [
  {
    prompt: "Do you use CAPS LOCK when arguing online?",
    options: [
      { label: "Never. I use full stops and walk away.", weight: 0 },
      { label: "Only when they are WRONG.", weight: 7 },
      { label: "MY KEYBOARD IS STUCK LIKE THIS.", weight: 14 },
      { label: "I TYPE LIKE THIS TO MY OWN GRANDMA.", weight: 20 },
    ],
  },
  {
    prompt: "How fast do you reply to viral drama?",
    options: [
      { label: "I don't follow drama.", weight: 0 },
      { label: "After it hits the news.", weight: 5 },
      { label: "Within the hour, with screenshots.", weight: 13 },
      { label: "Reply? I AM the drama.", weight: 20 },
    ],
  },
  {
    prompt: "Do you use the word “terpaling”?",
    options: [
      { label: "What is that?", weight: 0 },
      { label: "Ironically, sometimes.", weight: 6 },
      { label: "Daily. Terpaling daily.", weight: 14 },
      { label: "It's my whole personality.", weight: 20 },
    ],
  },
  {
    prompt: "Someone posts a photo of their nasi lemak. You…",
    options: [
      { label: "Double tap and move on.", weight: 0 },
      { label: "Comment “where is this?”", weight: 5 },
      { label: "Comment “RM12? terpaling mahal.”", weight: 13 },
      { label: "Rate it 4/10 and tag a food influencer.", weight: 20 },
    ],
  },
  {
    prompt: "Your friend's post gets 10k likes. Your first thought is…",
    options: [
      { label: "Happy for them!", weight: 0 },
      { label: "Nice, but mine was funnier.", weight: 7 },
      { label: "Screenshot to the group chat with 🙄", weight: 14 },
      { label: "Post a story: “reminder that likes don't matter”", weight: 20 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.weight)),
  0,
);

/** answers[i] is the chosen option index for QUESTIONS[i], or null if unanswered. */
export function scoreFor(answers: (number | null)[]): number {
  const total = answers.reduce<number>(
    (sum, a, i) => sum + (a === null ? 0 : QUESTIONS[i].options[a].weight),
    0,
  );
  return Math.round((total / MAX_SCORE) * 100);
}

export type Diagnosis = { title: string; emoji: string; blurb: string };

export function diagnose(score: number): Diagnosis {
  if (score <= 30)
    return {
      title: "Pure Soul",
      emoji: "😇",
      blurb:
        "You log on, you like your friends' photos, you log off. The internet does not deserve you. Protect this energy.",
    };
  if (score <= 70)
    return {
      title: "Average Netizen",
      emoji: "😌",
      blurb:
        "You have opinions and occasionally you share them. Mild kepam detected, but you still know when to close the app. Probably.",
    };
  return {
    title: "Certified Kepamist",
    emoji: "🔥",
    blurb:
      "Terpaling kepam. You are the reason comment sections have a character limit. Wear this badge with pride, or shame. Both work.",
  };
}
