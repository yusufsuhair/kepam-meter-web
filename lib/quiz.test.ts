import { test } from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS, SKIP, scoreFor, diagnose } from "./quiz.ts";

const maxAnswers = () =>
  QUESTIONS.map((q) => q.options.findIndex((o) => o.weight === Math.max(...q.options.map((x) => x.weight))));

test("15 questions, 4 options each, max weight 20, themes alternate", () => {
  assert.equal(QUESTIONS.length, 15);
  for (const q of QUESTIONS) {
    assert.equal(q.options.length, 4);
    assert.equal(Math.max(...q.options.map((o) => o.weight)), 20);
  }
  assert.equal(QUESTIONS.filter((q) => q.axis === "kepam").length, 8);
  assert.equal(QUESTIONS.filter((q) => q.axis === "gepuk").length, 7);
  for (let i = 1; i < QUESTIONS.length; i++) assert.notEqual(QUESTIONS[i].axis, QUESTIONS[i - 1].axis);
});

test("scores are 0 with no answers and 100 with all max answers", () => {
  assert.deepEqual(scoreFor(QUESTIONS, QUESTIONS.map(() => null)), { total: 0, kepam: 0, gepuk: 0 });
  assert.deepEqual(scoreFor(QUESTIONS, maxAnswers()), { total: 100, kepam: 100, gepuk: 100 });
});

test("answers only move the axis they belong to", () => {
  const i = QUESTIONS.findIndex((q) => q.axis === "gepuk");
  const answers = QUESTIONS.map((_, k) => (k === i ? 3 : null));
  const s = scoreFor(QUESTIONS, answers);
  assert.equal(s.kepam, 0);
  assert.equal(s.gepuk, Math.round((20 / 140) * 100));
  assert.equal(s.total, Math.round((20 / 300) * 100));
});

test("skipped questions are excluded from the maximum instead of scoring zero", () => {
  const kepamIdx = QUESTIONS.map((q, i) => (q.axis === "kepam" ? i : -1)).filter((i) => i >= 0);
  const answers = QUESTIONS.map((_, i) => (i === kepamIdx[0] ? 3 : kepamIdx.includes(i) ? SKIP : null));
  assert.equal(scoreFor(QUESTIONS, answers).kepam, 100);
  assert.deepEqual(scoreFor(QUESTIONS, QUESTIONS.map(() => SKIP)), { total: 0, kepam: 0, gepuk: 0 });
});

test("diagnosis matrix", () => {
  assert.equal(diagnose({ total: 15, kepam: 10, gepuk: 20 }).title, "Pure Soul");
  assert.equal(diagnose({ total: 45, kepam: 50, gepuk: 40 }).title, "Average Netizen");
  assert.equal(diagnose({ total: 58, kepam: 85, gepuk: 30 }).title, "Average Netizen");
  assert.equal(diagnose({ total: 80, kepam: 90, gepuk: 70 }).title, "Certified Kepamist");
  assert.equal(diagnose({ total: 58, kepam: 30, gepuk: 85 }).title, "Gepuk Squad");
  assert.equal(diagnose({ total: 90, kepam: 90, gepuk: 90 }).title, "Gepuk Kepamist");
});
