"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import KepamMeter from "@/components/KepamMeter";
import Quiz from "@/components/Quiz";
import { QUESTIONS, scoreFor } from "@/lib/quiz";

const KepamistScene = dynamic(() => import("@/components/KepamistScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm uppercase tracking-widest text-white/40">
      Summoning the Kepamist…
    </div>
  ),
});

const EMPTY = QUESTIONS.map(() => null);

const MOOD = {
  calm: "radial-gradient(1200px 800px at 20% 10%, #3b0764 0%, transparent 60%), radial-gradient(900px 700px at 90% 90%, #0c4a6e 0%, transparent 60%), #05010f",
  maxKepam: "radial-gradient(1200px 800px at 20% 10%, #7f1d1d 0%, transparent 60%), radial-gradient(900px 700px at 90% 90%, #450a0a 0%, transparent 60%), #05010f",
};

export default function Home() {
  const [answers, setAnswers] = useState<(number | null)[]>(EMPTY);
  const score = scoreFor(answers);

  return (
    <main className="relative text-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10" style={{ background: MOOD.calm }} />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-1000"
        style={{ background: MOOD.maxKepam, opacity: score > 80 ? 1 : 0 }}
      />
      <div className="mx-auto grid min-h-[calc(100dvh-68px)] max-w-7xl md:min-h-[calc(100dvh-78px)] lg:grid-cols-2">
        <section className="relative h-[45dvh] min-w-0 overflow-hidden lg:sticky lg:top-0 lg:h-[calc(100dvh-78px)]" aria-label="The Kepamist 3D model">
          <KepamistScene score={score} />
          <header className="pointer-events-none absolute inset-x-0 top-0 p-6 sm:p-8">
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
              Kepam<span className="text-fuchsia-400">Meter</span>
            </h1>
            <p className="mt-1 text-sm text-white/60 sm:text-base">A meter to evaluate your kepamism.</p>
          </header>
        </section>

        <section className="flex min-w-0 flex-col gap-6 px-4 pb-24 pt-2 sm:px-8 md:pb-8 lg:justify-center lg:py-12">
          <KepamMeter score={score} />
          <Quiz
            answers={answers}
            score={score}
            onAnswer={(q, o) => setAnswers((a) => a.map((v, i) => (i === q ? o : v)))}
            onReset={() => setAnswers(EMPTY)}
          />
        </section>
      </div>
    </main>
  );
}
