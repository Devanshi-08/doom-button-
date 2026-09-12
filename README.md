# ☣️ DOOM BUTTON

**A pointless, colorful, weirdly addictive button that you were told not to press.**

Built for the "Build a Web Toy" challenge — a blank-canvas web toy with no real purpose except to be fun, chaotic, and hard to stop clicking.

![tech](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-ff2e88) ![deps](https://img.shields.io/badge/dependencies-zero-29e0ff)

---

## What it is

A single glowing button labeled **"DO NOT PRESS."** You will press it. Every press:

- Pushes up a **Chaos Meter** (0–100%)
- Triggers screen shake, confetti bursts, and sarcastic escalating warning messages
- Eventually makes the button **flee from your cursor** — you have to hunt it down
- Ends, if you truly refuse to stop, in a **full-screen meltdown**

You can also hit **"Calm Down"** once things get dicey — it defuses the chaos, but wipes your current click streak. Risk vs. reward, in button form.

## Core interactions (3+, as required)

1. **Click the button** → chaos increases, click/streak counters update, a random floating reaction pops up near your cursor, and the screen may shake or shower confetti.
2. **Chase the button** → once chaos passes 40%, the button becomes evasive and jumps away whenever your cursor gets close, using live `mousemove` tracking.
3. **Calm Down button** → appears once chaos is high; clicking it trades your click streak for a chaos reduction — a real risk/reward decision, not just a reset.
4. **Meltdown & rebuild** → hitting 100% chaos triggers a full-screen meltdown screen with your final click count, and a "Rebuild Civilization" button that resets the whole game.

## Bonus features included

- 🎉 Pure CSS/JS confetti bursts (no libraries)
- 💾 Persistent **best streak** saved via `localStorage`
- 📈 Animated, color-shifting chaos meter
- 🗯️ A rotating pool of escalating sarcastic quotes, banded by chaos level
- 🌈 Reactive background glow that intensifies as chaos rises
- ♿ Respects `prefers-reduced-motion` and has visible keyboard focus states

## Tech stack

Plain **HTML, CSS, and JavaScript** — no frameworks, no build step, no dependencies (aside from a Google Fonts import for `Baloo 2` / `JetBrains Mono`, which degrades gracefully to system fonts if it can't load).

## Running it locally

No build tools needed. Either:

**Option A — just open it**
```bash
git clone https://github.com/<your-username>/doom-button.git
cd doom-button
open index.html   # or double-click the file
```

**Option B — serve it locally** (recommended for consistent behavior across browsers)
```bash
git clone https://github.com/<your-username>/doom-button.git
cd doom-button
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploying a live demo

This is a static site, so any static host works out of the box — no config needed:

- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / root.
- **Netlify** or **Vercel**: import the repo, leave build settings blank (no build command, publish directory `/`), deploy.

## File structure

```
doom-button/
├── index.html   # structure & markup
├── style.css    # theme, layout, animations
├── script.js    # game logic (chaos meter, evasion, confetti, meltdown)
└── README.md    # this file
```

## Why a doom button?

The brief asked for something "useless, fun, and surprisingly addictive" — hard to think of anything more on-brief than a button whose entire job is to dare you to press it, then punish you with escalating absurdity for doing exactly that.

---

Made with HTML, CSS, JavaScript, and a healthy disregard for the button's warnings.
