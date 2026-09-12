// ============================================================
// DOOM BUTTON — a small, unnecessary, extremely addictive toy
// ============================================================

const doomBtn = document.getElementById('doomBtn');
const buttonZone = document.getElementById('buttonZone');
const calmBtn = document.getElementById('calmBtn');
const meterFill = document.getElementById('meterFill');
const meterPercent = document.getElementById('meterPercent');
const quoteEl = document.getElementById('quote');
const clickCountEl = document.getElementById('clickCount');
const streakCountEl = document.getElementById('streakCount');
const bestStreakEl = document.getElementById('bestStreak');
const meltdown = document.getElementById('meltdown');
const meltdownClicksEl = document.getElementById('meltdownClicks');
const resetBtn = document.getElementById('resetBtn');
const confettiLayer = document.getElementById('confetti-layer');
const bgGlow = document.getElementById('bg-glow');

const STORAGE_KEY = 'doomButtonBestStreak';

let chaos = 0;
let clicks = 0;
let streak = 0;
let bestStreak = Number(localStorage.getItem(STORAGE_KEY) || 0);
let isEvasive = false;
let isMeltingDown = false;

bestStreakEl.textContent = bestStreak;

// ---------- Quotes, escalating by chaos level ----------

const QUOTES = {
  low: [
    "A perfectly ordinary, definitely-not-cursed button.",
    "Nothing bad has ever come from a red button.",
    "It's just sitting there. Innocently.",
    "Statistically, most buttons are fine.",
  ],
  mid: [
    "Okay, that's... a lot of clicking.",
    "The button is starting to sweat.",
    "We are legally required to say: please stop.",
    "This is fine. This is definitely fine.",
    "Somewhere, an engineer just felt a disturbance.",
  ],
  high: [
    "WE TOLD YOU NOT TO.",
    "The button no longer trusts you.",
    "It's actively evading you now. Good.",
    "This was not in the internship description.",
    "Alarms would be going off if we had a budget for alarms.",
  ],
  critical: [
    "ABANDON SHIP.",
    "THIS IS YOUR FAULT AND YOU KNOW IT.",
    "THE BUTTON HAS SEEN THINGS.",
    "WE ARE SO CLOSE TO THE END, I CAN FEEL IT.",
  ],
};

const REACTIONS = ['+1 CHAOS', 'WHY', 'AGAIN?!', 'STOP', 'CLASSIC', 'BOOP', 'no.', 'oh no', 'yikes', 'do it again'];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function quoteBand(level) {
  if (level >= 90) return QUOTES.critical;
  if (level >= 55) return QUOTES.high;
  if (level >= 25) return QUOTES.mid;
  return QUOTES.low;
}

// ---------- Core meter update ----------

function setChaos(value) {
  chaos = Math.max(0, Math.min(100, value));
  meterFill.style.width = chaos + '%';
  meterPercent.textContent = Math.round(chaos) + '%';

  // Background intensifies with chaos
  bgGlow.style.filter = `saturate(${1 + chaos / 60}) brightness(${1 + chaos / 250})`;
  document.body.style.background = chaos > 70
    ? `linear-gradient(180deg, #1c0e2e, #2a0a1a)`
    : '';

  calmBtn.classList.toggle('hidden', chaos < 45 || isMeltingDown);

  if (!isEvasive && chaos >= 40) {
    isEvasive = true;
    doomBtn.classList.add('evasive');
    positionButtonRandomly();
  } else if (isEvasive && chaos < 40) {
    isEvasive = false;
    doomBtn.classList.remove('evasive');
    doomBtn.style.left = '';
    doomBtn.style.top = '';
  }

  if (chaos >= 100 && !isMeltingDown) {
    triggerMeltdown();
  }
}

function positionButtonRandomly() {
  const zoneRect = buttonZone.getBoundingClientRect();
  const btnRect = doomBtn.getBoundingClientRect();
  const maxX = Math.max(0, zoneRect.width - btnRect.width);
  const maxY = Math.max(0, zoneRect.height - btnRect.height);
  doomBtn.style.left = Math.random() * maxX + 'px';
  doomBtn.style.top = Math.random() * maxY + 'px';
}

// Evasion: if the button is evasive, jump away when the cursor gets close
buttonZone.addEventListener('mousemove', (e) => {
  if (!isEvasive || isMeltingDown) return;
  const btnRect = doomBtn.getBoundingClientRect();
  const dx = e.clientX - (btnRect.left + btnRect.width / 2);
  const dy = e.clientY - (btnRect.top + btnRect.height / 2);
  const dist = Math.hypot(dx, dy);
  const dodgeRadius = 90 + (chaos - 40); // gets twitchier as chaos rises
  if (dist < dodgeRadius) {
    positionButtonRandomly();
  }
});

// ---------- Click handling ----------

doomBtn.addEventListener('click', (e) => {
  if (isMeltingDown) return;

  clicks += 1;
  streak += 1;
  clickCountEl.textContent = clicks;
  streakCountEl.textContent = streak;

  if (streak > bestStreak) {
    bestStreak = streak;
    bestStreakEl.textContent = bestStreak;
    localStorage.setItem(STORAGE_KEY, String(bestStreak));
  }

  const increment = 3 + Math.random() * 5; // 3-8% per click
  setChaos(chaos + increment);

  quoteEl.textContent = pick(quoteBand(chaos));

  spawnFloatie(pick(REACTIONS), e.clientX, e.clientY);

  if (chaos >= 25) {
    shakeScreen();
  }

  if (chaos >= 60 && Math.random() < 0.5) {
    burstConfetti(10);
  }
});

// ---------- Calm Down (risk/reward) ----------

calmBtn.addEventListener('click', () => {
  if (isMeltingDown) return;
  quoteEl.textContent = "Deep breaths. Your streak resets, but so does everyone's blood pressure.";
  streak = 0;
  streakCountEl.textContent = streak;
  setChaos(Math.max(0, chaos - 60));
});

// ---------- Effects ----------

function shakeScreen() {
  document.body.classList.remove('shake');
  // force reflow so the animation can restart
  void document.body.offsetWidth;
  document.body.classList.add('shake');
}

function spawnFloatie(text, x, y) {
  const el = document.createElement('div');
  el.className = 'floatie';
  el.textContent = text;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

const CONFETTI_COLORS = ['#ff2e88', '#f4ff3c', '#29e0ff', '#ff3b3b', '#f6f1ff'];

function burstConfetti(count) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetto';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = pick(CONFETTI_COLORS);
    piece.style.animationDuration = 1.4 + Math.random() * 1.4 + 's';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 3200);
  }
}

// ---------- Meltdown ----------

function triggerMeltdown() {
  isMeltingDown = true;
  meltdownClicksEl.textContent = clicks;
  meltdown.classList.remove('hidden');
  burstConfetti(40);
}

resetBtn.addEventListener('click', () => {
  meltdown.classList.add('hidden');
  isMeltingDown = false;
  clicks = 0;
  streak = 0;
  clickCountEl.textContent = 0;
  streakCountEl.textContent = 0;
  doomBtn.classList.remove('evasive');
  doomBtn.style.left = '';
  doomBtn.style.top = '';
  isEvasive = false;
  quoteEl.textContent = pick(QUOTES.low);
  setChaos(0);
});
