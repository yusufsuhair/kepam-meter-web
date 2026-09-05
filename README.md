# KepamMeter

A meter to evaluate your kepamism. Eight random questions from a bank of fifteen, one 3D Kepamist, one diagnosis.

Next.js 16 · React 19 · Tailwind v4 · React Three Fiber · drei · framer-motion · lucide-react

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # scoring + diagnosis checks (node --test)
npm run build
```

## Structure

- `lib/quiz.ts` — questions, option weights, `scoreFor()`, `diagnose()`
- `components/KepamistScene.tsx` — R3F canvas, Float, studio lights, drag-to-rotate, score-driven spin / scale / red light
- `components/KepamMeter.tsx` — SVG speedometer gauge with a spring needle
- `components/Quiz.tsx` — question cards, results, Share to X
- `components/NowPlayingBar.tsx` — fixed bottom music player for `public/kepamsong.mp3`. Autoplays with sound where the browser allows it; otherwise autoplays muted and unmutes on the first tap/click/key
- `app/page.tsx` — layout and shared score state

## The model

`public/kepamist.glb` is a web-optimised copy of the source `kepamist.glb`
(90 MB, 1.9 M triangles, 4K JPEG textures → 1.35 MB, ~190 k triangles, 1K WebP, Draco).
The source file is git-ignored. To regenerate after editing the source:

```bash
npx @gltf-transform/cli optimize kepamist.glb public/kepamist.glb \
  --compress draco --texture-compress webp --texture-size 1024 \
  --simplify-ratio 0.1 --simplify-error 0.001
```

The Draco decoder is served from `public/draco/` (copied from `three/examples/jsm/libs/draco/gltf/`).
