# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Malaysian netizens on X, TikTok, and Instagram who already know the slang ("kepam", "terpaling") and recognise the online behaviours the quiz pokes at. They arrive from a shared link on a phone, mid-scroll, expecting a laugh in under a minute. The job is: take the test, get a diagnosis that is funny enough to post, and post it.

Secondary: the people those posts reach, who click through to compare scores.

## Product Purpose

KepamMeter is a viral joke quiz that "measures your kepamism". Five weighted questions drive a live score that spins, scales, and reddens a 3D Kepamist character and swings a speedometer gauge, then produces one of three diagnoses (Pure Soul, Average Netizen, Certified Kepamist) with a shareable line.

It exists as a gag for Malaysian internet culture. Success is people sharing their score and diagnosis, and their friends taking it in turn. It is not a lead funnel, a portfolio piece, or a brand front door.

## Positioning

Its unfair advantage is specificity: the questions, answers, and diagnoses are written in the exact register of Malaysian comment sections (CAPS LOCK arguments, "terpaling mahal" on a nasi lemak photo, "reminder that likes don't matter" stories). A generic "how toxic are you online" quiz cannot land these jokes. The original 3D Kepamist and Kepam Song give the gag a face and a sound nobody else has.

## Operating Context

- Entered almost always from a social share on mobile, mid-scroll, with sound possibly off.
- Whole experience is one page: hero with the 3D Kepamist, gauge, five question cards, results, share. No accounts, no persistence, no backend.
- Score updates live while answering; the mood (background, model tint, light) follows it. Reaching a high score is meant to feel like an event.
- Background anthem plays (autoplay where allowed, otherwise unmuted on first gesture) through a fixed bottom Now Playing bar.
- Results are shared as text via an X intent link with the page URL.

## Capabilities and Constraints

Confirmed:
- Five questions, four options each, weights 0 to 20 per question; score is a 0 to 100 percentage. Scoring and diagnosis live in `lib/quiz.ts` with node tests.
- Three diagnosis bands: 0 to 30 Pure Soul, 31 to 70 Average Netizen, 71 to 100 Certified Kepamist.
- 3D model is a Draco-compressed GLB (about 1.35 MB, 190k triangles, 1K WebP textures) served from `public/`, regenerated from the git-ignored 90 MB source with gltf-transform. Draco decoder is self-hosted in `public/draco/`.
- Stack: Next.js 16 (App Router), React 19, Tailwind v4, React Three Fiber, drei, framer-motion, lucide-react. Client-rendered page; 3D scene is dynamically imported with SSR off.
- Deployed as a static export (`output: "export"`) to Cloudflare Pages. No server runtime: everything, including the Open Graph card, is generated at build time.
- Link previews: `app/opengraph-image.tsx` renders a 1200x630 card (wordmark, tagline, gauge at 100%) with the Geist faces in `app/fonts/`.
- Must stay fast on mid-range Android phones over mobile data; the 3D asset budget above is the ceiling.
- Autoplay policy: sound cannot be assumed; the experience must work muted.

Open product decisions (not yet made):
- **More share channels are wanted.** Only Share to X exists. WhatsApp, TikTok, IG story image, and copy-link are candidates. Which ones, and whether a shareable result image is generated, is undecided.
- Domain is undecided. Set `NEXT_PUBLIC_SITE_URL` at build once it exists so link-preview image URLs are absolute.
- Whether the question set grows beyond five, or rotates, is undecided.

## Brand Commitments

- Name: KepamMeter (one word, camel-cased). Tagline: "A meter to evaluate your kepamism."
- Voice: Manglish. English sentences with Malay slang left untranslated (kepam, terpaling, nasi lemak). Deadpan, sarcastic, mock-official ("Official diagnosis"). Never explain the slang. This is binding.
- The Kepamist (3D character) and the Kepam Song are original assets made for this product. They are the product's face and sound; future work may restyle around them but must not replace them with generic stand-ins.
- The bottom music player follows the user's house pattern (Spotify-style Now Playing bar ported from rembuyang-web).

## Evidence on Hand

- `public/kepamist.glb`: the optimised 3D Kepamist. Source `kepamist.glb` at repo root (git-ignored).
- `public/kepamsong.mp3`: the Kepam Song, original anthem.
- `lib/quiz.ts`: final question, option, and diagnosis copy as currently shipped.
- No testimonials, traffic numbers, press, or user quotes exist. Do not fabricate share counts, "taken by N people", or social proof.

## Product Principles

1. **The joke is the product.** Every screen must be funnier than it is impressive. If craft and joke compete for attention, the joke wins.
2. **Phone-first, share-first.** Assume a mobile viewport from a social link. The path from landing to posted result should be the shortest thing on the page.
3. **Never explain the slang.** The audience is in on it. Glossaries, tooltips, or translations break the bit.
4. **The score is alive.** The Kepamist, the gauge, and the mood respond to every answer immediately. Reaching Certified Kepamist should feel like an event, not a summary.
5. **Loud but light.** 3D, motion, and music are welcome, but nothing may make the page slow or the quiz hard to finish on a mid-range phone.

## Accessibility & Inclusion

- Must be fully usable with sound off; audio is flavour, never information.
- Quiz must be completable by keyboard and screen reader; the 3D scene and gauge are decorative reflections of the score, not the only way to read it.
- Respect reduced-motion preferences for the spin, gauge spring, and mood transitions.
