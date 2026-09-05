/** Past this score she gets angry: red lights, shaking, the angry model, spilled matcha. */
export const ANGRY_AT = 40;

export type Option = { label: string; weight: number };
export type Question = { prompt: string; options: Option[] };
/** Answer value for a skipped question: it is left out of the score entirely. */
export const SKIP = -1;
export type Answer = number | null;

// Fixed order. Every question's heaviest option is the last one and weighs 20,
// so picking the last option on every question scores exactly 100%.
export const QUESTIONS: Question[] = [
  {
    prompt: "Do you like to cut the queue?",
    options: [
      { label: "Never.", weight: 0 },
      { label: "Rarely. Only if I'm really late.", weight: 6 },
      { label: "Sometimes. Nobody notices.", weight: 13 },
      { label: "Often. And I scold people back if they scold me.", weight: 20 },
    ],
  },
  {
    prompt: "You're stressed. What do you do?",
    options: [
      { label: "Drink mineral water.", weight: 0 },
      { label: "Buy a matcha.", weight: 7 },
      { label: "Buy ayam gepuk.", weight: 13 },
      { label: "Buy matcha AND gepuk. Terpaling stressed.", weight: 20 },
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
    prompt: "How often do you say “guys, you know what, I said what I said, periodt, literally, hello??”",
    options: [
      { label: "Never.", weight: 0 },
      { label: "Once in a while, ironically.", weight: 6 },
      { label: "Daily. Literally.", weight: 13 },
      { label: "Every sentence. Hello?? Periodt.", weight: 20 },
    ],
  },
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
    prompt: "Do you hate men?",
    options: [
      { label: "No. I love everyone.", weight: 0 },
      { label: "Only the ones in the comments.", weight: 6 },
      { label: "Only online. In real life I'm very polite.", weight: 13 },
      { label: "Yes, and I post about it daily. Periodt.", weight: 20 },
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
    prompt: "Someone gets cancelled for a tweet from 2016. You…",
    options: [
      { label: "Don't care. It's 2016.", weight: 0 },
      { label: "Read the thread quietly.", weight: 6 },
      { label: "Add a “yikes” comment.", weight: 13 },
      { label: "Dig up their 2014 tweets too.", weight: 20 },
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
    prompt: "The comment section is already 500 copies of the same insult. You…",
    options: [
      { label: "Close the app.", weight: 0 },
      { label: "Read a few for entertainment.", weight: 6 },
      { label: "Add a more original insult.", weight: 13 },
      { label: "Copy-paste the popular one so I don't miss out.", weight: 20 },
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
  {
    prompt: "Your group chat spots a stranger's cringe post. First move?",
    options: [
      { label: "Leave it alone.", weight: 0 },
      { label: "Laugh privately.", weight: 5 },
      { label: "Forward the link to two other group chats.", weight: 13 },
      { label: "Everyone comments at once. Macam biasa.", weight: 20 },
    ],
  },
  {
    prompt: "Someone apologises online. You…",
    options: [
      { label: "Accept it and move on.", weight: 0 },
      { label: "Wait and see if they mean it.", weight: 6 },
      { label: "“Apology not accepted” + a GIF.", weight: 13 },
      { label: "Screenshot it into the receipts folder.", weight: 20 },
    ],
  },
  {
    prompt: "Your go-to caption style?",
    options: [
      { label: "No caption. The photo speaks.", weight: 0 },
      { label: "One emoji.", weight: 5 },
      { label: "A paragraph about “the journey”.", weight: 13 },
      { label: "“Unpopular opinion but…” followed by a very popular opinion.", weight: 20 },
    ],
  },
  {
    prompt: "The report button. How often?",
    options: [
      { label: "Only for real harm.", weight: 0 },
      { label: "Occasionally.", weight: 5 },
      { label: "Whenever I disagree.", weight: 13 },
      { label: "Mass-reporting with friends is a hobby.", weight: 20 },
    ],
  },
  {
    prompt: "People wish you happy birthday on your wall. You…",
    options: [
      { label: "Say thanks once, to everyone.", weight: 0 },
      { label: "Like every comment.", weight: 5 },
      { label: "Reply “thank you sayang” to every single one.", weight: 13 },
      { label: "Repost all of them into a 47-slide story.", weight: 20 },
    ],
  },
];

/** answers[i] is the chosen option index for QUESTIONS[i], null if unanswered, SKIP if skipped. */
export function scoreFor(answers: Answer[]): number {
  let total = 0;
  let max = 0;
  QUESTIONS.forEach((q, i) => {
    const a = answers[i];
    if (a === SKIP) return;
    max += Math.max(...q.options.map((o) => o.weight));
    if (a !== null && a !== undefined) total += q.options[a].weight;
  });
  return max ? Math.round((total / max) * 100) : 0;
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
      "Terpaling kepam. Matcha in one hand, gepuk in the other, caps lock on. You are the reason comment sections have a character limit. Wear this badge with pride, or shame. Both work.",
  };
}
