---
name: KepamMeter
description: A meter to evaluate your kepamism.
colors:
  void-ink: "#05010f"
  kepam-fuchsia: "#e879f9"
  kepam-fuchsia-soft: "#f0abfc"
  calm-violet: "#3b0764"
  deep-sky: "#0c4a6e"
  blood-alert: "#ff2d2d"
  blood-alert-glow: "#7f1d1d"
  blood-alert-deep: "#450a0a"
  scene-calm: "#cfd8ff"
  gauge-low: "#34d399"
  gauge-mid: "#fbbf24"
  gauge-high: "#ef4444"
  white: "#ffffff"
  bar-surface: "#09090b"
  text-secondary: "#a1a1aa"
typography:
  display:
    fontFamily: "Cherry Bomb One, Fredoka, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 3rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Fredoka, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.375
  title:
    fontFamily: "Cherry Bomb One, Fredoka, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Fredoka, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Fredoka, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.25em"
rounded:
  md: "6px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
spacing:
  xs: "10px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.white}"
    textColor: "#000000"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    typography: "{typography.body}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    typography: "{typography.body}"
  option:
    backgroundColor: "rgba(255,255,255,0.05)"
    textColor: "{colors.white}"
    rounded: "{rounded.2xl}"
    padding: "14px 16px"
    typography: "{typography.body}"
  option-chosen:
    backgroundColor: "rgba(232,121,249,0.25)"
    textColor: "{colors.white}"
    rounded: "{rounded.2xl}"
    padding: "14px 16px"
    typography: "{typography.body}"
  card-glass:
    backgroundColor: "rgba(255,255,255,0.10)"
    textColor: "{colors.white}"
    rounded: "{rounded.3xl}"
    padding: "{spacing.md}"
  bar:
    backgroundColor: "rgba(9,9,11,0.90)"
    textColor: "#f4f4f5"
    height: "68px"
    padding: "0 16px"
  play-button:
    backgroundColor: "{colors.white}"
    textColor: "{colors.bar-surface}"
    rounded: "{rounded.full}"
    size: "44px"
---

# Design System: KepamMeter

## Overview

**Creative North Star: "The Midnight Scroll"**

The feed at 2am: black glass, a glow leaking in from the corners, one thing lit up in the middle. The Kepamist is the post you cannot stop looking at. Everything on the page is built to serve that single lit thing: a near-black void surface, two soft radial mood glows bleeding in from opposite corners, and a 3D mascot that owns the first phone screen while a fuchsia wordmark and a compact gauge ride on top of it.

Density is low and the hierarchy is blunt. One wordmark, one question at a time, one white primary pill. Surfaces are either the void itself or one of two floating glass panes (the quiz card and the fixed Now Playing bar). Light does the work that shadow does elsewhere: the accent glow marks whatever is live, the mood gradient tells you how far gone your score is, and when the score crosses 80 the whole world goes Blood Alert: the background, the ambient light on the mascot, and the gauge label all turn red together.

The voice is deadpan mock-official Manglish (PRODUCT.md binding commitment), and the type treats that voice seriously: heavy black weights, tight tracking, tabular numbers on the score. The Kepamist and the Kepam Song are original assets; the visual system exists around them and never replaces them with stand-ins.

**Key Characteristics:**
- Void-black surface with two corner radial glows (Calm Violet top-left, Deep Sky bottom-right) that swap to Blood Alert past 80%.
- Glow is the depth system; drop shadows are soft and rare.
- Glass (backdrop blur) is reserved for exactly two floating surfaces.
- Pill and rounded-2xl controls, tactile on press, one white primary.
- Cherry Bomb One for anything that shouts (wordmark, percent, diagnosis), Fredoka for everything else, uppercase 0.25em-tracked labels for anything official.
- The score is alive: gauge, mood, mascot lighting, and label all respond to every answer.

## Colors

A near-black void with a fuchsia accent, two calm corner glows, and a red takeover state that the whole page shares.

### Primary
- **Kepam Fuchsia** (`kepam-fuchsia`): the brand accent. The "Meter" half of the wordmark, the focus ring, the selection highlight, the chosen-option border and tint (at 70% and 25%), the play button's ambient glow, the waveform bars (at 70%), and the seek fill on hover. It marks what is live or chosen, never large fills.
- **Kepam Fuchsia Soft** (`kepam-fuchsia-soft`): the lighter tint used for the one instructional line in the music bar ("Tap anywhere for sound") when audio is muted. Text only.

### Secondary (Mood)
- **Calm Violet** (`calm-violet`): the top-left radial glow at rest, and the middle stop of the art tile gradient. Never a fill or text colour.
- **Deep Sky** (`deep-sky`): the bottom-right radial glow at rest, and the end stop of the art tile gradient.
- **Scene Calm** (`scene-calm`): the ambient light colour on the 3D mascot at rest. Lerps to Blood Alert past 80%.

### Tertiary (Blood Alert)
- **Blood Alert** (`blood-alert`): the "MAXIMUM KEPAM" gauge label and the mascot's ambient light when score exceeds 80. Pulses (motion-safe only).
- **Blood Alert Glow** (`blood-alert-glow`) and **Blood Alert Deep** (`blood-alert-deep`): the red replacements for the two corner glows during takeover, cross-faded in over 1s.

### Gauge sweep
- **Gauge Low / Mid / High** (`gauge-low`, `gauge-mid`, `gauge-high`): the three stops of the speedometer arc gradient, green to amber to red left-to-right. Used only inside the gauge and the OG card; never as UI colours.

### Neutral
- **Void Ink** (`void-ink`): the page background, theme colour, and base of every mood gradient.
- **White** (`white`): primary text, the needle and pivot, the primary pill, the seek fill and thumb. Secondary text is white at 60 to 80% (`rgba(255,255,255,0.6)` for labels, `0.7` for the tagline, `0.8` for the diagnosis blurb).
- **Bar Surface** (`bar-surface`): the Now Playing bar at 90% over blur. Also the play glyph colour on the white play button.
- **Text Secondary** (`text-secondary`): timestamps, artist line, and inactive icons in the music bar (Tailwind zinc-400).
- **Ghost borders**: white at 10% (card edges, option rest, bar top edge), 15% (glass card), 20% (ghost pill), 30% (option hover), 35% (seek track).

### Named Rules
**The One Lit Thing Rule.** Kepam Fuchsia is a marker, not a material. It sits on the wordmark, the focus ring, the chosen option, and the glow around what is playing. It never fills a surface larger than an option tile at 25%.

**The Takeover Rule.** Past 80% the page changes state as one thing: both corner glows go red, the mascot's ambient light goes red, the gauge label goes red and pulses. No element goes Blood Alert alone.

**The Secondary Floor Rule.** Secondary text is white at 60 to 70% or zinc-400 (`text-secondary`) and never lower; every secondary line stays above 4.5:1 on the void.

## Typography

**Display Font:** Cherry Bomb One (single weight 400; falls back to Fredoka, then system-ui)
**Body Font:** Fredoka (300 to 700; system-ui, sans-serif fallback)

**Character:** Pick-me energy played straight. Cherry Bomb One is bubbly, Y2K-cute and never fake-bolded; it carries the wordmark, the percent and the diagnosis so the deadpan copy lands harder against it. Fredoka, rounded and friendly, does the reading and the asking: the question is semibold (600) and set snug; everything official is a small uppercase label with wide tracking. Numbers are always tabular so the score does not jitter while it springs.

### Hierarchy
- **Display** (Cherry Bomb One 400, 48px phone / 60px from `sm` / 72px from `lg` / 96px from `xl`, line-height 1, normal tracking): the "KepamMeter" wordmark, with "Meter" in Kepam Fuchsia, centred on phones and left-aligned from `lg`. The OG card sets it at 116px.
- **Headline** (Fredoka 600, 24px / 30px from `sm`, line-height 1.375): the question prompt. One per screen, receives focus on step change.
- **Title** (Cherry Bomb One 400, 30px / 36px from `sm`): the diagnosis name on the results screen. Also the gauge percent (30px / 48px inside a 220px-plus container, tabular).
- **Body** (400, 16px / 18px from `sm` in options, 16px elsewhere, line-height 1.5): option labels, the diagnosis blurb (max 28rem). Pills use 600.
- **Label** (400, 12px, uppercase, 0.25em): the gauge state line ("kepam level" / "getting kepam…" / "MAXIMUM KEPAM"). The step counter and "Official diagnosis" use the same size at 0.1em (`tracking-widest`). Music bar meta is 12px sentence-case in `text-secondary`; song title is 14px at 500.

### Named Rules
**The Tabular Score Rule.** Any number that animates (the gauge percent, the timestamps) is set `tabular-nums`. Digits must not reflow while moving.

**The Two Voices Rule.** Cherry Bomb One shouts (wordmark, diagnosis, percent) and is never synthesised bold or used for running text. Fredoka does the rest on a short ladder: 600 asks (the question) and acts (pills), 500 names (song title), 400 reads. Do not introduce weights between rungs.

## Layout

One page, two screens, phone-first. Screen 1 is the hero (wordmark, tagline, mascot, one action); screen 2 is the test (gauge and questionnaire), reached by the `#test` anchor with smooth scrolling under `prefers-reduced-motion: no-preference`. Each screen is at least `100dvh` minus the bar height (`--bar-h`: 68px, 78px from `md` 768px); the body carries matching bottom padding so nothing scrolls under the fixed bar. The root is a `max-w-7xl` container: a flex column on phones, two equal columns from `lg` (1024px).

**Phone hero:** wordmark (48px, 60px from `sm`) and tagline in flow at the top with 16px inset (32px from `sm`), the mascot filling the remaining height (`100dvh` minus bar minus 14.25rem, min 320px), and the white "Take the test" pill with its one-line sub-label at the bottom. The mascot stays draggable.

**Phone test screen:** a row of a compact mascot canvas (224px tall, 288px from `sm`, flexible width) beside a 46%-wide gauge (max 220px, 260px from `sm`), then the quiz card. 16px horizontal padding (32px from `sm`), 16px gaps (24px from `sm`).

**Desktop:** the left column stacks the hero copy (72px to 96px wordmark, vertically centred) and the test screen (260px gauge above the card, vertically centred); the mascot pane on the right is sticky at top 0 for the full viewport height, so the same mascot serves both screens and there is only one WebGL context.

**Spacing rhythm:** 10 / 12 / 16 / 24 / 32px. Options stack at 10px (12px from `sm`); card padding 16px (32px from `sm`); the bar row uses 12px gaps on phone, 16px on desktop; results actions sit 32px below the blurb.

**Now Playing bar:** fixed bottom, `z-50`, full width. Phone layout is a single row (40px art, title + time, 44px play) with the 4px seek line on the top edge; desktop is three regions (28% / flex / 28%): art + meta, transport + seek (max 32rem), waveform + volume.

## Elevation & Depth

Glow is the depth system. Light, not shadow, says what is important. The page has no tonal stack of greys: there is the void, the two corner glows, and two floating glass panes on top. Importance is signalled by an accent glow (the play button and art tile carry `.glow-accent` permanently; the playing state adds an expanding fuchsia ring), by the mascot's own lighting (key light from top-right, blue fill from behind-left, a pink point light behind that doubles in intensity during takeover), and by the mood gradient itself. Real drop shadows exist in exactly one place, under the glass quiz card, and are soft and black.

### Shadow Vocabulary
- **Accent glow** (`box-shadow: 0 0 20px color-mix(in oklab, var(--color-accent) 45%, transparent)`): the live-object marker. On the play button and the art tile. Nothing else.
- **Glass lift** (`box-shadow: 0 25px 50px -12px rgba(0,0,0,0.3)`): the quiz card only. Soft, low, black.
- **Contact shadow** (drei `ContactShadows`, opacity 0.5, blur 2.4): grounds the mascot in the scene. Not a UI shadow.

### Named Rules
**The Light Says Live Rule.** If something is playing, chosen, focused, or being lit, it glows in Kepam Fuchsia. If it is merely present, it does not.

**The Two Panes Rule.** Backdrop blur (`backdrop-blur-xl`, 24px) is a material for the quiz card and the music bar. It is not applied to buttons, tiles, headers, or decoration.

## Shapes

Round, soft, and consistent. Interactive pills are fully round (9999px): the primary and ghost actions, the Back button, the play button, the seek thumb, and the needle pivot. Option tiles are generously curved (16px). The two glass panes are the roundest large surfaces (24px on the card; the bar is edge-to-edge with a 1px top border instead). The art tile is the one tighter corner (6px) so it reads as a thumbnail, not a control. Borders are always ghost white (10 to 20%) and 1px; there are no hard or coloured borders except the chosen option's fuchsia at 70%. The gauge arc is a stroked semicircle with round caps, 14 units wide in a 200-unit viewBox, with a 3.5-unit white needle.

## Components

### Buttons
Tactile and confident: every control shrinks on press.
- **Shape:** fully round pill (9999px)
- **Primary ("Share to X"):** white on black text, 600 weight, 12px 24px padding. Hover fades to white at 90%; press scales to 0.95.
- **Ghost ("Try again"):** transparent with a 1px white-20% border, white text, same padding and weight. Hover fills white at 10%; press scales to 0.95.
- **Back:** text-only pill, 12px uppercase tracked, white-60%, 44px minimum hit height; hover fills white at 10% and lifts text to white.
- **Focus:** global `:focus-visible` ring, 2px solid Kepam Fuchsia, 3px offset.

### Chips (Options)
- **Style:** full-width rounded-2xl tile (16px), white at 5% with a 1px white-10% border, 16px body text left-aligned, 14px 16px padding (16px 20px and 18px text from `sm`).
- **Hover:** border to white-30%, fill to white-15%.
- **Chosen (`aria-pressed`):** border Kepam Fuchsia at 70%, fill Kepam Fuchsia at 25%.
- **Press:** scale to 0.98.

### Cards / Containers
The glass quiz card is the only card.
- **Corner Style:** 24px
- **Background:** white at 10% over a 24px backdrop blur
- **Shadow Strategy:** Glass lift (see Elevation)
- **Border:** 1px white at 15%
- **Internal Padding:** 16px, 32px from `sm`
- **Motion:** question steps slide 24px horizontally over 0.25s; results scale in from 0.95 over 0.3s.

### Inputs / Fields
Range inputs only (seek, volume).
- **Seek:** a drawn 4px track (white at 35%) with a white fill that turns Kepam Fuchsia on hover, and a transparent 24px-tall native range over it. The 12px white round thumb is invisible until hover or focus.
- **Volume:** native range, 24px tall by 96px wide, `accent-color` white, Kepam Fuchsia on hover.
- **Focus:** the global fuchsia ring; the seek input pulls it inward 2px and rounds it.

### Navigation
None. The page has no nav; the wordmark is a static h1.

### Now Playing Bar (signature)
Fixed bottom bar, zinc-950 at 90% over 24px blur, 1px white-10% top border, slides up from 100px over 0.5s on load. Contains the **Art tile** (rounded 6px, gradient from Kepam Fuchsia through Calm Violet to Deep Sky, a bold (700) "K", accent glow, a white-15% sheen sweeping down while playing, scale 1.1 while playing) and the **Play button** (44px white circle, zinc-950 glyph drawn with CSS, accent glow, hover scale 1.05, tap 0.92, and while playing an expanding fuchsia-30% ring). Title is 14px 500 zinc-100; meta is 12px zinc-400, or Kepam Fuchsia Soft when muted. Desktop adds a 10-bar waveform in fuchsia at 70% and a lucide SkipBack control.

### KepamMeter Gauge (signature)
A semicircular speedometer in a 200 by 108 SVG. Track is white at 12%; the sweep is the low-to-high gradient revealed by dash offset; a white needle rotates from -90 to +90 degrees. Below: the tabular percent (30px, 48px in containers 220px and wider) and the uppercase 0.25em state label. Past 80 the label goes Blood Alert and pulses (motion-safe). The value springs (stiffness 80, damping 14, mass 0.8) and jumps instantly under reduced motion. Two instances exist (phone hero overlay, desktop column); the gradient id is unique per instance.

### Kepamist Scene (signature)
The 3D mascot in a Float (speed 1.5, rotation 0.25, float 0.6), lit by a warm-white ambient (Scene Calm, 0.7 intensity, lerping to Blood Alert at 1.6 past 80%), a key directional at 2.8, a blue fill `#8ec5ff` at 0.9, and a pink point light `#ff4d6d` behind (12, 40 during takeover), grounded by a baked contact shadow. Under reduced motion the Float stops but drag remains.

### Motion
Reduced motion is honoured through `MotionConfig reducedMotion="user"`. The gauge jumps instead of springing, the mascot stops idling but still drags, the pulse and the sheen are `motion-safe` only. Mood cross-fade is a 1s opacity transition.

## Do's and Don'ts

### Do:
- **Do** keep the page on Void Ink with the two corner radial glows; the mood is the background, never a flat colour.
- **Do** switch every mood-bound element together when the score passes 80 (The Takeover Rule).
- **Do** use Kepam Fuchsia as a marker: wordmark, focus ring, chosen state, live glow. Keep fills at 25% or below.
- **Do** make every control a pill or a 16px tile with a press scale (0.92 to 0.98) and the global 2px fuchsia focus ring.
- **Do** set animated numbers in `tabular-nums` and reach for Cherry Bomb One when the copy shouts.
- **Do** keep secondary text at white 60 to 70% or zinc-400 and above 4.5:1.
- **Do** ship every animation behind reduced-motion (MotionConfig, `motion-safe:`, spring jump).

### Don't:
- **Don't** add backdrop blur to anything other than the quiz card and the music bar (The Two Panes Rule).
- **Don't** introduce hard, offset, or coloured drop shadows; the only real shadow is the soft black glass lift under the card.
- **Don't** add a second primary; the white pill is the one primary action on screen.
- **Don't** use Blood Alert, the gauge sweep colours, or the mood glows as text or fill colours outside their roles.
- **Don't** add a second typeface or a weight between the ladder rungs.
- **Don't** explain the slang in the UI (tooltips, glossaries, translations); this is a binding brand commitment.
- **Don't** replace the Kepamist or the Kepam Song with generic stand-ins.
