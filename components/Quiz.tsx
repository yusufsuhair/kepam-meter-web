"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { QUESTIONS, diagnose } from "@/lib/quiz";

type Props = {
  answers: (number | null)[];
  score: number;
  onAnswer: (question: number, option: number) => void;
  onReset: () => void;
};

const glass = "rounded-3xl border border-white/15 bg-white/10 shadow-2xl shadow-black/30 backdrop-blur-xl";

export default function Quiz({ answers, score, onAnswer, onReset }: Props) {
  const [step, setStep] = useState(0);
  const done = step >= QUESTIONS.length;

  function pick(option: number) {
    onAnswer(step, option);
    setStep((s) => s + 1);
  }

  function reset() {
    onReset();
    setStep(0);
  }

  return (
    <div className={`${glass} p-6 sm:p-8`}>
      <AnimatePresence mode="wait">
        {done ? (
          <Results key="results" score={score} onReset={reset} />
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-widest text-white/50">
              <span>
                Question {step + 1} / {QUESTIONS.length}
              </span>
              {step > 0 && (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="rounded-full px-3 py-1 hover:bg-white/10 hover:text-white">
                  ← Back
                </button>
              )}
            </div>
            <h2 className="mb-6 text-2xl font-bold leading-snug sm:text-3xl">{QUESTIONS[step].prompt}</h2>
            <ul className="grid gap-3">
              {QUESTIONS[step].options.map((o, i) => {
                const chosen = answers[step] === i;
                return (
                  <li key={o.label}>
                    <button
                      type="button"
                      onClick={() => pick(i)}
                      aria-pressed={chosen}
                      className={`w-full rounded-2xl border px-5 py-4 text-left text-base transition active:scale-[0.98] sm:text-lg ${
                        chosen
                          ? "border-fuchsia-400/70 bg-fuchsia-500/25"
                          : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/15"
                      }`}
                    >
                      {o.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Results({ score, onReset }: { score: number; onReset: () => void }) {
  const d = diagnose(score);
  const text = `I scored ${score}% on the KepamMeter ${d.emoji} Diagnosis: ${d.title}. How kepam are you?`;
  const url = typeof window === "undefined" ? "" : window.location.href;
  const share = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <div className="text-6xl">{d.emoji}</div>
      <p className="mt-4 text-xs uppercase tracking-widest text-white/50">Official diagnosis</p>
      <h2 className="mt-1 text-3xl font-black sm:text-4xl">{d.title}</h2>
      <p className="mx-auto mt-4 max-w-md text-white/80">{d.blurb}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={share}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/90 active:scale-95"
        >
          Share to X
        </a>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:bg-white/10 active:scale-95"
        >
          Try again
        </button>
      </div>
    </motion.div>
  );
}
