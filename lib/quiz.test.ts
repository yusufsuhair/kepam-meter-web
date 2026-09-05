import { test } from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS, scoreFor, diagnose } from "./quiz.ts";

test("five questions, four options each, max weight totals 100", () => {
  assert.equal(QUESTIONS.length, 5);
  for (const q of QUESTIONS) assert.equal(q.options.length, 4);
  const max = QUESTIONS.reduce(
    (sum, q) => sum + Math.max(...q.options.map((o) => o.weight)),
    0,
  );
  assert.equal(max, 100);
});

test("score is 0 with no answers and 100 with all max answers", () => {
  assert.equal(scoreFor(QUESTIONS.map(() => null)), 0);
  assert.equal(scoreFor(QUESTIONS.map(() => 3)), 100);
});

test("partial answers give a partial score", () => {
  const answers = QUESTIONS.map((_, i) => (i === 0 ? 3 : null));
  assert.equal(scoreFor(answers), QUESTIONS[0].options[3].weight);
});

test("diagnosis bands", () => {
  assert.equal(diagnose(0).title, "Pure Soul");
  assert.equal(diagnose(30).title, "Pure Soul");
  assert.equal(diagnose(31).title, "Average Netizen");
  assert.equal(diagnose(70).title, "Average Netizen");
  assert.equal(diagnose(71).title, "Certified Kepamist");
  assert.equal(diagnose(100).title, "Certified Kepamist");
});
