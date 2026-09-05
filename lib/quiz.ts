export type Axis = "kepam" | "gepuk";
export type Option = { label: string; weight: number };
export type Question = { prompt: string; axis: Axis; options: Option[] };
/** total drives the meter; kepam/gepuk are per-axis sub-scores used only for the diagnosis and mascot. */
export type Scores = { total: number; kepam: number; gepuk: number };
/** Answer value for a skipped question: it is left out of the score entirely. */
export const SKIP = -1;
export type Answer = number | null;

// Kepam = cringe, attention-seeking netizen energy. Gepuk = pile-on, mob, "korang serang" energy.
// The axis tag is internal: it only flavours the diagnosis and the mascot shake.
// Fixed order, kepam and gepuk alternating.
// Every question's heaviest option is 20.
export const QUESTIONS: Question[] = [
  {
    axis: "kepam",
    prompt: "Do you use CAPS LOCK when arguing online?",
    options: [
      { label: "Never. I use full stops and walk away.", weight: 0 },
      { label: "Only when they are WRONG.", weight: 7 },
      { label: "MY KEYBOARD IS STUCK LIKE THIS.", weight: 14 },
      { label: "I TYPE LIKE THIS TO MY OWN GRANDMA.", weight: 20 },
    ],
  },
  {
    axis: "gepuk",
    prompt: "A stranger posts a bad take. What do you do?",
    options: [
      { label: "Scroll past. Not my circus.", weight: 0 },
      { label: "Reply with a calm counterpoint.", weight: 6 },
      { label: "Quote it so my followers can see.", weight: 13 },
      { label: "Tag the group chat: “korang, serang.”", weight: 20 },
    ],
  },
  {
    axis: "kepam",
    prompt: "How fast do you reply to viral drama?",
    options: [
      { label: "I don't follow drama.", weight: 0 },
      { label: "After it hits the news.", weight: 5 },
      { label: "Within the hour, with screenshots.", weight: 13 },
      { label: "Reply? I AM the drama.", weight: 20 },
    ],
  },
  {
    axis: "gepuk",
    prompt: "Someone gets cancelled for a tweet from 2016. You…",
    options: [
      { label: "Don't care. It's 2016.", weight: 0 },
      { label: "Read the thread quietly.", weight: 6 },
      { label: "Add a “yikes” comment.", weight: 13 },
      { label: "Dig up their 2014 tweets too.", weight: 20 },
    ],
  },
  {
    axis: "kepam",
    prompt: "Do you use the word “terpaling”?",
    options: [
      { label: "What is that?", weight: 0 },
      { label: "Ironically, sometimes.", weight: 6 },
      { label: "Daily. Terpaling daily.", weight: 14 },
      { label: "It's my whole personality.", weight: 20 },
    ],
  },
  {
    axis: "gepuk",
    prompt: "A restaurant gets one bad review. You…",
    options: [
      { label: "Take it as one opinion.", weight: 0 },
      { label: "Check the other reviews first.", weight: 5 },
      { label: "Leave a 1-star without ever visiting.", weight: 13 },
      { label: "Organise the group to “bagi rating”.", weight: 20 },
    ],
  },
  {
    axis: "kepam",
    prompt: "Someone posts a photo of their nasi lemak. You…",
    options: [
      { label: "Double tap and move on.", weight: 0 },
      { label: "Comment “where is this?”", weight: 5 },
      { label: "Comment “RM12? terpaling mahal.”", weight: 13 },
      { label: "Rate it 4/10 and tag a food influencer.", weight: 20 },
    ],
  },
  {
    axis: "gepuk",
    prompt: "The comment section is already 500 copies of the same insult. You…",
    options: [
      { label: "Close the app.", weight: 0 },
      { label: "Read a few for entertainment.", weight: 6 },
      { label: "Add a more original insult.", weight: 13 },
      { label: "Copy-paste the popular one so I don't miss out.", weight: 20 },
    ],
  },
  {
    axis: "kepam",
    prompt: "Your friend's post gets 10k likes. Your first thought is…",
    options: [
      { label: "Happy for them!", weight: 0 },
      { label: "Nice, but mine was funnier.", weight: 7 },
      { label: "Screenshot to the group chat with 🙄", weight: 14 },
      { label: "Post a story: “reminder that likes don't matter”", weight: 20 },
    ],
  },
  {
    axis: "gepuk",
    prompt: "Your group chat spots a stranger's cringe post. First move?",
    options: [
      { label: "Leave it alone.", weight: 0 },
      { label: "Laugh privately.", weight: 5 },
      { label: "Forward the link to two other group chats.", weight: 13 },
      { label: "Everyone comments at once. Macam biasa.", weight: 20 },
    ],
  },
  {
    axis: "kepam",
    prompt: "How often do you check who viewed your story?",
    options: [
      { label: "Never. Stories are for posting, not stalking.", weight: 0 },
      { label: "Once, casually.", weight: 6 },
      { label: "Every hour. I have a mental list.", weight: 13 },
      { label: "I have an actual spreadsheet.", weight: 20 },
    ],
  },
  {
    axis: "gepuk",
    prompt: "Someone apologises online. You…",
    options: [
      { label: "Accept it and move on.", weight: 0 },
      { label: "Wait and see if they mean it.", weight: 6 },
      { label: "“Apology not accepted” + a GIF.", weight: 13 },
      { label: "Screenshot it into the receipts folder.", weight: 20 },
    ],
  },
  {
    axis: "kepam",
    prompt: "Your go-to caption style?",
    options: [
      { label: "No caption. The photo speaks.", weight: 0 },
      { label: "One emoji.", weight: 5 },
      { label: "A paragraph about “the journey”.", weight: 13 },
      { label: "“Unpopular opinion but…” followed by a very popular opinion.", weight: 20 },
    ],
  },
  {
    axis: "gepuk",
    prompt: "The report button. How often?",
    options: [
      { label: "Only for real harm.", weight: 0 },
      { label: "Occasionally.", weight: 5 },
      { label: "Whenever I disagree.", weight: 13 },
      { label: "Mass-reporting with friends is a hobby.", weight: 20 },
    ],
  },
  {
    axis: "kepam",
    prompt: "People wish you happy birthday on your wall. You…",
    options: [
      { label: "Say thanks once, to everyone.", weight: 0 },
      { label: "Like every comment.", weight: 5 },
      { label: "Reply “thank you sayang” to every single one.", weight: 13 },
      { label: "Repost all of them into a 47-slide story.", weight: 20 },
    ],
  },
];

/** answers[i] is the chosen option index for questions[i], null if unanswered, SKIP if skipped. */
export function scoreFor(questions: Question[], answers: Answer[]): Scores {
  const score = (axis?: Axis) => {
    let total = 0;
    let max = 0;
    questions.forEach((q, i) => {
      const a = answers[i];
      if ((axis && q.axis !== axis) || a === SKIP) return;
      max += Math.max(...q.options.map((o) => o.weight));
      if (a !== null && a !== undefined) total += q.options[a].weight;
    });
    return max ? Math.round((total / max) * 100) : 0;
  };
  return { total: score(), kepam: score("kepam"), gepuk: score("gepuk") };
}

export type Diagnosis = { title: string; emoji: string; blurb: string };

export function diagnose({ total, gepuk }: Scores): Diagnosis {
  if (total > 70 && gepuk > 70)
    return {
      title: "Gepuk Kepamist",
      emoji: "💀",
      blurb:
        "Terpaling kepam AND terpaling gepuk. You start the drama, then rally the mob to finish it. Comment sections fear you. So does your data plan.",
    };
  if (total > 70)
    return {
      title: "Certified Kepamist",
      emoji: "🔥",
      blurb:
        "Terpaling kepam. You are the reason comment sections have a character limit. Wear this badge with pride, or shame. Both work.",
    };
  if (gepuk > 70)
    return {
      title: "Gepuk Squad",
      emoji: "🥊",
      blurb:
        "You never start the fight, but you always arrive with 40 friends to finish it. “Korang, serang” is muscle memory at this point.",
    };
  if (total <= 30)
    return {
      title: "Pure Soul",
      emoji: "😇",
      blurb:
        "You log on, you like your friends' photos, you log off. The internet does not deserve you. Protect this energy.",
    };
  return {
    title: "Average Netizen",
    emoji: "😌",
    blurb:
      "You have opinions and occasionally you share them. Mild kepam detected, light gepuk tendencies, but you still know when to close the app. Probably.",
  };
}
