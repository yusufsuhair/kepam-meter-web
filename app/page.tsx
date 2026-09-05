"use client";

import { MotionConfig } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import KepamMeter from "@/components/KepamMeter";
import NowPlayingBar from "@/components/NowPlayingBar";
import Quiz from "@/components/Quiz";
import { QUESTIONS, scoreFor } from "@/lib/quiz";

const KepamistScene = dynamic(() => import("@/components/KepamistScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center px-2 text-center text-sm uppercase tracking-widest text-white/70">
      Summoning the Kepamist…
    </div>
  ),
});

const EMPTY = QUESTIONS.map(() => null);

const MOOD = {
  calm: "radial-gradient(1200px 800px at 20% 10%, var(--color-mood-a) 0%, transparent 60%), radial-gradient(900px 700px at 90% 90%, var(--color-mood-b) 0%, transparent 60%), var(--color-ink)",
  maxKepam:
    "radial-gradient(1200px 800px at 20% 10%, var(--color-hot-a) 0%, transparent 60%), radial-gradient(900px 700px at 90% 90%, var(--color-hot-b) 0%, transparent 60%), var(--color-ink)",
};

export default function Home() {
  const [answers, setAnswers] = useState<(number | null)[]>(EMPTY);
  const score = scoreFor(answers);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative text-white">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10" style={{ background: MOOD.calm }} />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-1000"
          style={{ background: MOOD.maxKepam, opacity: score > 80 ? 1 : 0 }}
        />
        <div className="mx-auto grid min-h-[calc(100dvh-var(--bar-h))] max-w-7xl lg:grid-cols-2">
          {/* The mascot owns the first phone screen; the wordmark and a compact gauge ride on top of it. */}
          <section
            className="relative h-[60dvh] min-h-[420px] min-w-0 overflow-hidden lg:sticky lg:top-0 lg:h-[calc(100dvh-var(--bar-h))]"
            aria-label="The Kepamist and your score"
          >
            <KepamistScene score={score} />
            <header className="pointer-events-none absolute inset-x-0 top-0 p-4 sm:p-8">
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                Kepam<span className="text-accent">Meter</span>
              </h1>
              <p className="mt-1 max-w-[11rem] text-sm text-white/70 sm:max-w-none sm:text-base">
                A meter to evaluate your kepamism.
              </p>
            </header>
            <div className="pointer-events-none absolute top-4 right-4 w-[140px] sm:top-8 sm:right-8 sm:w-[180px] lg:hidden">
              <KepamMeter score={score} className="w-full" />
            </div>
          </section>

          <section className="flex min-w-0 flex-col gap-4 px-4 pb-6 pt-2 sm:gap-6 sm:px-8 md:pb-8 lg:justify-center lg:py-8">
            <KepamMeter score={score} className="mx-auto hidden w-full max-w-[260px] lg:block xl:max-w-xs" />
            <Quiz
              answers={answers}
              score={score}
              onAnswer={(q, o) => setAnswers((a) => a.map((v, i) => (i === q ? o : v)))}
              onReset={() => setAnswers(EMPTY)}
            />
          </section>
        </div>
      </main>
      <NowPlayingBar />
    </MotionConfig>
  );
}
