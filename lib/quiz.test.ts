import { test } from "node:test";
import assert from "node:assert/strict";
import { BANK, SESSION_SIZE, SKIP, pickQuestions, scoreFor, diagnose } from "./quiz.ts";

const maxAnswers = (qs: { options: { weight: number }[] }[]) =>
  qs.map((q) => q.options.findIndex((o) => o.weight === Math.max(...q.options.map((x) => x.weight))));

test("bank has 15 questions, 4 options each, max weight 20, both axes present", () => {
  assert.equal(BANK.length, 15);
  for (const q of BANK) {
    assert.equal(q.options.length, 4);
    assert.equal(Math.max(...q.options.map((o) => o.weight)), 20);
    assert.ok(q.axis === "kepam" || q.axis === "gepuk");
  }
  assert.equal(BANK.filter((q) => q.axis === "kepam").length, 8);
  assert.equal(BANK.filter((q) => q.axis === "gepuk").length, 7);
});

test("pickQuestions returns 8 unique questions from the mixed bank", () => {
  const qs = pickQuestions();
  assert.equal(qs.length, SESSION_SIZE);
  assert.equal(new Set(qs.map((q) => q.prompt)).size, SESSION_SIZE);
  for (const q of qs) assert.ok(BANK.includes(q));
  // deterministic rng → deterministic pick
  const a = pickQuestions(() => 0.42).map((q) => q.prompt);
  const b = pickQuestions(() => 0.42).map((q) => q.prompt);
  assert.deepEqual(a, b);
});

test("scores are 0 with no answers and 100/100 with all max answers", () => {
  const qs = pickQuestions();
  assert.deepEqual(scoreFor(qs, qs.map(() => null)), { total: 0, kepam: 0, gepuk: 0 });
  assert.deepEqual(scoreFor(qs, maxAnswers(qs)), { total: 100, kepam: 100, gepuk: 100 });
});

test("answers only move the axis they belong to", () => {
  const qs = pickQuestions(() => 0.3);
  const i = qs.findIndex((q) => q.axis === "gepuk");
  assert.ok(i >= 0, "seeded pick should include a gepuk question");
  const answers = qs.map((_, k) => (k === i ? 3 : null));
  const s = scoreFor(qs, answers);
  assert.equal(s.kepam, 0);
  assert.ok(s.gepuk > 0 && s.gepuk <= 100);
  // one max answer out of eight questions → total is 1/8 of 100
  assert.equal(s.total, 13);
});

test("diagnosis matrix", () => {
  assert.equal(diagnose({ total: 15, kepam: 10, gepuk: 20 }).title, "Pure Soul");
  assert.equal(diagnose({ total: 45, kepam: 50, gepuk: 40 }).title, "Average Netizen");
  assert.equal(diagnose({ total: 58, kepam: 85, gepuk: 30 }).title, "Average Netizen");
  assert.equal(diagnose({ total: 80, kepam: 90, gepuk: 70 }).title, "Certified Kepamist");
  assert.equal(diagnose({ total: 58, kepam: 30, gepuk: 85 }).title, "Gepuk Squad");
  assert.equal(diagnose({ total: 90, kepam: 90, gepuk: 90 }).title, "Gepuk Kepamist");
});

test("skipped questions are excluded from the axis maximum instead of scoring zero", () => {
  const qs = pickQuestions(() => 0.1);
  const kepamIdx = qs.map((q, i) => (q.axis === "kepam" ? i : -1)).filter((i) => i >= 0);
  // answer one kepam question with max, skip the other kepam questions
  const answers = qs.map((_, i) => (i === kepamIdx[0] ? 3 : kepamIdx.includes(i) ? SKIP : null));
  assert.equal(scoreFor(qs, answers).kepam, 100);
  // skipping everything gives 0, not NaN
  assert.deepEqual(scoreFor(qs, qs.map(() => SKIP)), { total: 0, kepam: 0, gepuk: 0 });
});
