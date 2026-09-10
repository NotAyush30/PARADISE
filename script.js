"use strict";

// Low-end device detection — hide expensive grain overlay
const isLowEnd =
  navigator.hardwareConcurrency <= 6 ||
  /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

const builtGrids = new Set();
const initializedFloats = new Set();
const worldFloatMap = {
  btd: "btd-float",
  "paradise-ep": "paradise-float",
  uv: "uv-float",
  honey: "honey-float",
  lfl: "lfl-float",
  nfr: "nfr-float",
  chemtrails: "chemtrails-float",
  tunnel: "tunnel-float",
  heaven: "heaven-float",
};

if (isLowEnd) {
  document
    .querySelectorAll(".grain, .vhs-overlay, .chroma-r, .chroma-b")
    .forEach((el) => {
      if (el) el.style.display = "none";
    });
}

/* ========================================
 ALBUM DATA
 ======================================== */
const albums = {
  "Born To Die": {
    tracks: [
      "Born To Die",
      "Video Games",
      "Summertime Sadness",
      "Diet Mountain Dew",
      "Radio",
      "Blue Jeans",
      "National Anthem",
      "Dark Paradise",
      "Carmen",
      "Million Dollar Man",
      "Lucky Ones",
    ],
    mood: "sad glamour",
    color: "#4a7ab5",
    accent: "rgba(212,165,116,0.3)",
  },
  Paradise: {
    tracks: [
      "Ride",
      "American",
      "Cola",
      "Body Electric",
      "Blue Velvet",
      "Gods & Monsters",
      "Yayo",
    ],
    mood: "highway dreams",
    color: "#f0b429",
    accent: "rgba(196,132,154,0.3)",
  },
  Ultraviolence: {
    tracks: [
      "Cruel World",
      "Ultraviolence",
      "Shades of Cool",
      "Brooklyn Baby",
      "West Coast",
      "Sad Girl",
      "Pretty When You Cry",
      "Money Power Glory",
      "Fucked My Way Up to the Top",
      "Old Money",
      "The Other Woman",
    ],
    mood: "dangerous lonely romance",
    color: "#e8e8e8",
    accent: "rgba(184,196,212,0.3)",
  },
  Honeymoon: {
    tracks: [
      "Honeymoon",
      "Music To Watch Boys To",
      "Terrence Loves You",
      "God Knows I Tried",
      "High By The Beach",
      "Salvatore",
      "The Blackest Day",
      "Art Deco",
      "Burnt Norton",
    ],
    mood: "slow emotional loneliness",
    color: "#c04060",
    accent: "rgba(143,184,212,0.3)",
  },
  "Lust For Life": {
    tracks: [
      "Lust For Life",
      "Love",
      "13 Beaches",
      "Cherry",
      "White Mustang",
      "Summer Bummer",
      "Groupie Love",
      "In My Feelings",
      "Coachella – Woodstock In My Mind",
      "Beautiful People Beautiful Problems",
      "Tomorrow Never Came",
    ],
    mood: "retro california freedom",
    color: "#2ab8a0",
    accent: "rgba(212,144,176,0.3)",
  },
  "Norman Fucking Rockwell": {
    tracks: [
      "Mariners Apartment Complex",
      "Venice Bitch",
      "Fuck It I Love You",
      "Doin' Time",
      "Norman Fucking Rockwell",
      "How To Disappear",
      "California",
      "The Greatest",
      "Happiness Is A Butterfly",
      "Hope",
    ],
    mood: "beautiful nostalgic sadness",
    color: "#c8c840",
    accent: "rgba(212,170,106,0.3)",
  },
  "Chemtrails Over The Country Club": {
    tracks: [
      "White Dress",
      "Chemtrails Over The Country Club",
      "Tulsa Jesus Freak",
      "Let Me Love You Like A Woman",
      "Wild At Heart",
      "Dark But Just A Game",
      "Not All Who Wander Are Lost",
      "Yosemite",
      "Breaking Up Slowly",
      "Dance Till We Die",
      "For Free",
    ],
    mood: "countryside wind",
    color: "#909090",
    accent: "rgba(160,196,176,0.3)",
  },
  "Did You Know There's A Tunnel Under Ocean Blvd": {
    tracks: [
      "The Grants",
      "Did You Know That There's A Tunnel Under Ocean Blvd",
      "Sweet",
      "A&W",
      "Judah Smith Interlude",
      "Candy Necklace",
      "Jon Batiste Interlude",
      "Kintsugi",
      "Fingertips",
      "Paris, Texas",
      "Grandfather please stand on the shoulders of my father while he's deep-sea fishing",
      "Margaret",
      "Fishtail",
      "Peppers",
      "Ocean Blvd",
    ],
    mood: "echoing tunnel",
    color: "#b8a830",
    accent: "rgba(144,144,192,0.3)",
  },
  Specials: {
    tracks: [
      "Young And Beautiful",
      "Say Yes To Heaven",
      "Summertime The Blue Nile",
      "Dark Paradise (Alt)",
      "Ride (Demo)",
      "Flipside",
      "Young and Beautiful (Orchestral)",
    ],
    mood: "heavenly dream-space",
    color: "#c8a830",
    accent: "rgba(232,224,200,0.3)",
  },
};

const moodTags = {
  "Born To Die": "sad glamour",
  "Video Games": "lonely night drive",
  "Summertime Sadness": "melancholic",
  Ride: "cinematic",
  Ultraviolence: "luxury sadness",
  Honeymoon: "dreamy",
  "Young And Beautiful": "romantic sadness",
  "Say Yes To Heaven": "nostalgic",
  "Venice Bitch": "cinematic",
  "Mariners Apartment Complex": "dreamy",
  "White Mustang": "lonely night drive",
  "Lust For Life": "nostalgic",
  Margaret: "melancholic",
  default: "dreamy",
};

const floatingPhrases = [
  "heaven is a place on earth with you",
  "blue hydrangea",
  "summer's in the air",
  "hot summer nights",
  "the road is long",
  "born to die",
  "diamond in the sky",
  "darling I'm a nightmare",
  "will you still love me",
  "swimming pool",
  "love is mean",
  "pretty when you cry",
  "california dreaming",
  "wild at heart",
  "the night is still young",
  "roses in the corner",
  "old money",
  "salvatore",
  "music to watch boys to",
  "driving in my car",
  "say yes to heaven",
  "young and beautiful",
  "shades of cool",
  "west coast",
  "golden boy",
  "venice bitch",
  "mariners apartment complex",
  "art deco",
  "blue jeans white shirt",
  "walk on the wild side",
  "got my red dress on tonight",
  "i'm your national anthem",
];

const sectionPhrases = {
  "btd-float": [
    "born to die",
    "roses in our hands",
    "summertime sadness",
    "dark paradise",
    "national anthem",
    "blue jeans",
    "will you still love me when I'm no longer young and beautiful",
  ],
  "paradise-float": [
    "born to ride",
    "highway dreaming",
    "gods & monsters",
    "body electric",
    "american",
  ],
  "uv-float": [
    "shades of cool",
    "west coast",
    "old money",
    "pretty when you cry",
    "cruel world",
    "ultraviolence",
  ],
  "honey-float": [
    "honeymoon",
    "music to watch boys to",
    "salvatore",
    "art deco",
    "high by the beach",
    "blue pools",
  ],
  "lfl-float": [
    "lust for life",
    "white mustang",
    "cherry",
    "love",
    "coachella",
  ],
  "nfr-float": [
    "venice bitch",
    "california",
    "the greatest",
    "doin' time",
    "norman fucking rockwell",
  ],
  "chemtrails-float": [
    "white dress",
    "chemtrails",
    "wild at heart",
    "dance till we die",
    "for free",
  ],
  "tunnel-float": [
    "tunnel under ocean blvd",
    "candy necklace",
    "margaret",
    "fingertips",
    "paris texas",
    "kintsugi",
  ],
  "heaven-float": [
    "say yes to heaven",
    "young and beautiful",
    "will you still love me",
    "glowing in the dark",
    "god only knows",
  ],
};

/* ========================================
 STATE
 ======================================== */
let audioCtx = null;
let crackleNode = null,
  crackleGain = null;
let ambientNodes = {};
let currentTrack = null;
let currentAlbum = null;
let isPlaying = false;
let playbackProgress = 0;
let playbackInterval = null;
let vinylRotation = 0;
let isDraggingVinyl = false;
let dragStartAngle = 0;
let dragStartRotation = 0;
let dragLastAngle = 0;
let dragVelocity = 0;
let playerOpen = false;
let currentVinylEl = null;
// Invalid or unavailable storage must not abort the entire engine.
function readStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    if (typeof fallback === "string") return raw;
    const value = JSON.parse(raw);
    if (Array.isArray(fallback))
      return Array.isArray(value) ? value.filter(v => typeof v === "string") : fallback;
    return value && typeof value === "object" && !Array.isArray(value) ? value : fallback;
  } catch (error) { return fallback; }
}
function writeStored(key, value) {
  try { localStorage.setItem(key, value); }
  catch (error) { console.warn("PARADISE: changes remain in memory; storage is unavailable."); }
}
let favorites = readStored("paradise_favorites", []);
let playCounts = readStored("paradise_playcounts", {});
let userNotes = readStored("paradise_notes", {});
let obsessedSong = readStored("paradise_obsessed", "");
let currentMood = readStored("paradise_mood", "melancholic");
let mouseX = 0.5,
  mouseY = 0.5;
let trackList = []; // flat list of all tracks for prev/next
let currentTrackIndex = 0;
let interactionStarted = false;

// YouTube state
let ytPlayer = null;
let ytReady = false;
let playbackRequested = false;
let playbackCounted = false;
let ytProgressTimer = null;
let ytLoadTimer = null;
let ytCurrentVideoId = null;
let playerVinylRafId = null;
// ytApiKey removed — YouTube IFrame API uses video IDs directly, no key needed

/* ========================================
 SONG → YOUTUBE VIDEO ID MAP
 Replace each placeholder with the real 11-character YouTube video ID.
 Find IDs from youtube.com/watch?v=XXXXXXXXXXX
 ======================================== */
const songVideoIds = {
  // Born To Die
  "Born To Die": "Bag1gUxuU0g", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Video Games": "cE6wxDqdOV0", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Summertime Sadness": "TdrL3QxjyVw", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Diet Mountain Dew": "sEetXo3R-aM", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Radio: "o7e4IfE0ScI", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Blue Jeans": "JRWox-i6aAk", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "National Anthem": "sxDdEPED0h8", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Dark Paradise": "dvSZQ4oMHGM", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Carmen: "L6K8Uq88BEQ", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Million Dollar Man": "YHmGVp6zRLw", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Lucky Ones": "c3JHH6Hc_io", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  // Paradise EP
  Ride: "nvb8wdBglpw", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  American: "D7agM5nWJJI", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Cola: "lBakG7KtVZE", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Body Electric": "thSPRS4oVp4", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Blue Velvet": "Do7u3zJ36iI", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Gods & Monsters": "ORw5Sv0Ch-0", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Yayo: "YMxjzP7zLBc", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  // Ultraviolence
  "Cruel World": "MgT4-cqq4c4", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Ultraviolence: "ZFWC4SiZBao", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Shades of Cool": "rJABBmAMXnY", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Brooklyn Baby": "T5xcnjAG8pE", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "West Coast": "oKxuiw3iMBE", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Sad Girl": "jvm6DpqqbLk", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Pretty When You Cry": "2CSWw2OVxio", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Money Power Glory": "BnfumBZQKyQ", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Fucked My Way Up to the Top": "0EEz_SXr0d8", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Old Money": "5TGULdbFzyc", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "The Other Woman": "7KzPh_x5w14", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  // Honeymoon
  Honeymoon: "oPU8XJcA__k", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Music To Watch Boys To": "5kYsxoWfjCg", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Terrence Loves You": "emDU4QvdwVk", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "God Knows I Tried": "BT2atmOqvPc", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "High By The Beach": "QnxpHIl5Ynw", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Salvatore: "GVQON-muEFc", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "The Blackest Day": "BiKYRNoyzZ0", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Art Deco": "QbLGjeR9bvI", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Burnt Norton": "QbajAoqIsQg", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  // Lust For Life
  "Lust For Life": "eP4eqhWc7sI", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Love: "3-NTv0CdFCk", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "13 Beaches": "Mcvz8DnuoGI", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Cherry: "uNuMH2i6wdI", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "White Mustang": "F4ELqraXx-U", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Summer Bummer": "AcVQJJoD45w", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Groupie Love": "tBwoRviPvVw", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "In My Feelings": "jDj6orud0n8", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Coachella – Woodstock In My Mind": "cjDfD_RtYiA", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Beautiful People Beautiful Problems": "Vs_sURGuYys", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Tomorrow Never Came": "3fR2qL7wy68", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  // Norman Fucking Rockwell
  "Mariners Apartment Complex": "1uFv9Ts7Sdw", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Venice Bitch": "Qg3DxELVPj4", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Fuck It I Love You": "LrSX_OcpeJg", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Doin' Time": "qolmz4FlnZ0", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Norman Fucking Rockwell": "wPt0dGg4BKA", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "How To Disappear": "WU_EGJOQ69o", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  California: "vK1YiArMDfg", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "The Greatest": "Ndo8r_Hg_lg", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Happiness Is A Butterfly": "nbcXvlEa7Wk", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Hope: "rY2LUmLw_DQ", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  // Chemtrails
  "White Dress": "yJuV8PDwvC8", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Chemtrails Over The Country Club": "vBHild0PiTE", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Tulsa Jesus Freak": "pLiCh9PXbwg", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Let Me Love You Like A Woman": "Nj9QqP-ce4E", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Wild At Heart": "vMZdbpeyHAc", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Dark But Just A Game": "_l0NeLJjL4I", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Not All Who Wander Are Lost": "aK_lWrowOwg", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Yosemite: "AEt5owHwVD0", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Breaking Up Slowly": "Mn2ZroMnvK0", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Dance Till We Die": "DOKZxWSczNg", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "For Free": "EqSvJU0xaqg", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  // Did You Know There's A Tunnel Under Ocean Blvd
  "The Grants": "ZegtK54DC4c", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Did You Know That There's A Tunnel Under Ocean Blvd": "IuY54A3bOmg", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Sweet: "-Fg-DcLJY4s", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "A&W": "pYqky795R1s", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Judah Smith Interlude": "8y-vMgLEXo4", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Candy Necklace": "zBZbFjl__Jk", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Jon Batiste Interlude": "C2e0H6MUWyU", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Kintsugi: "Yb2zNCG0s3I", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Fingertips: "EHbfrvonTLE", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Paris, Texas": "ZlZXHV0uTpI", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Grandfather please stand on the shoulders of my father while he's deep-sea fishing":
    "bNqF45LlJko", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Margaret: "2xtKhqbNBoY", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Fishtail: "cs8VlhUDna0", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Peppers: "hNFoCOKk7LE", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Ocean Blvd": "IuY54A3bOmg", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  // Specials
  "Young And Beautiful": "Te11UaHOHMQ", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Say Yes To Heaven": "MiAoetOXKcY", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Summertime The Blue Nile": "5HMBniu9Evg", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Dark Paradise (Alt)": "dvSZQ4oMHGM", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Ride (Demo)": "wi-xJMjhR_M", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  Flipside: "BBa4n3ndd7M", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
  "Young and Beautiful (Orchestral)": "o_1aF54DO60", // ← REPLACE WITH REAL YOUTUBE VIDEO ID
};

/* ========================================
 TIME OF DAY
 ======================================== */
function detectTimeMode() {
  const h = new Date().getHours();
  if (h >= 0 && h < 5) return "late-night";
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 18) return "afternoon";
  return "evening";
}

function applyTimeMode() {
  const mode = detectTimeMode();
  document.body.className = "time-" + mode;
  document.getElementById("header-time").textContent =
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
}

/* ========================================
 CURSOR
 ======================================== */
const cursor = document.getElementById("cursor");

const isTouch =
  window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
document.addEventListener("mousemove", (e) => {
  if (isTouch) return;
  cursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
  mouseX = e.clientX / window.innerWidth;
  mouseY = e.clientY / window.innerHeight;
  updateLightShaft(mouseX, mouseY);
});

// FIX #4: Event delegation for cursor hover — works on dynamically created vinyl cards
document.addEventListener(
  "mouseover",
  (e) => {
    if (isTouch) return;
    if (e.target.closest(".vinyl-card, button, a, .mood-tag"))
      cursor.classList.add("hovering");
  },
  true,
);
document.addEventListener(
  "mouseout",
  (e) => {
    if (isTouch) return;
    if (e.target.closest(".vinyl-card, button, a, .mood-tag"))
      cursor.classList.remove("hovering");
  },
  true,
);

/* ========================================
 LIGHT SHAFT
 ======================================== */
function updateLightShaft(mx, my) {
  const ls = document.getElementById("light-shaft");
  if (ls) {
    ls.style.background = `radial-gradient(ellipse 40% 60% at ${mx * 100}% ${my * 100}%, rgba(255,180,100,0.08), transparent)`;
  }
}

/* ========================================
 STARS GENERATION
 ======================================== */
function generateStars() {
  const container = document.getElementById("stars-layer");
  for (let i = 0; i < 180; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 65 + "%";
    const size = Math.random() * 2 + 0.5;
    star.style.width = star.style.height = size + "px";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = 2 + Math.random() * 3 + "s";
    star.style.opacity = Math.random() * 0.6 + 0.1;
    container.appendChild(star);
  }
}

/* ========================================
 CLOUDS GENERATION
 ======================================== */
function generateClouds() {
  const container = document.getElementById("clouds-layer");
  const colors = [
    "rgba(100,50,150,0.2)",
    "rgba(150,50,100,0.15)",
    "rgba(50,50,100,0.2)",
    "rgba(100,80,50,0.1)",
  ];
  for (let i = 0; i < 5; i++) {
    const cloud = document.createElement("div");
    cloud.className = "cloud";
    const size = 100 + Math.random() * 200;
    cloud.style.width = size + "px";
    cloud.style.height = size * 0.4 + "px";
    cloud.style.top = Math.random() * 50 + "%";
    cloud.style.left = "-200px";
    cloud.style.background = colors[Math.floor(Math.random() * colors.length)];
    cloud.style.animationDuration = 30 + Math.random() * 40 + "s";
    cloud.style.animationDelay = -Math.random() * 40 + "s";
    container.appendChild(cloud);
  }
}

/* ========================================
 ROAD DASHES
 ======================================== */
function generateRoadDashes() {
  const container = document.getElementById("road-lines");
  for (let i = 0; i < 20; i++) {
    const dash = document.createElement("div");
    dash.className = "road-dash";
    const h = 20 + i * 3;
    dash.style.height = h + "px";
    container.appendChild(dash);
  }
}

/* ========================================
 PARTICLE SYSTEM
 ======================================== */
const particleCanvas = document.getElementById("particles-canvas");
const pCtx = particleCanvas.getContext("2d");
let particles = [];

function resizeParticleCanvas() {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}
resizeParticleCanvas();
window.addEventListener("resize", resizeParticleCanvas);

function createParticle() {
  return {
    x: Math.random() * particleCanvas.width,
    y: Math.random() * particleCanvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -Math.random() * 0.4 - 0.1,
    life: 1,
    decay: Math.random() * 0.003 + 0.001,
    size: Math.random() * 2 + 0.5,
    color: Math.random() > 0.5 ? "rgba(255,200,150," : "rgba(255,150,180,",
  };
}

for (let i = 0; i < 40; i++) particles.push(createParticle());

function animateParticles() {
  if (document.hidden) {
    requestAnimationFrame(animateParticles);
    return;
  }
  pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx + (mouseX - 0.5) * 0.15;
    p.y += p.vy;
    p.life -= p.decay;
    if (p.life <= 0 || p.y < -10) {
      particles[i] = createParticle();
      particles[i].y = particleCanvas.height + 10;
      return;
    }
    pCtx.save();
    pCtx.globalAlpha = p.life * 0.4;
    pCtx.fillStyle = p.color + p.life * 0.4 + ")";
    pCtx.beginPath();
    pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    pCtx.fill();
    pCtx.restore();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ========================================
 RAIN (UV Section)
 ======================================== */
function initRain() {
  const canvas = document.getElementById("rain-canvas");
  if (!canvas) return;
  const rc = canvas.getContext("2d");
  let raindrops = [];

  function resizeRain() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resizeRain();

  for (let i = 0; i < 150; i++) {
    raindrops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 3 + Math.random() * 5,
      len: 10 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.3,
    });
  }

  function drawRain() {
    if (!document.hidden) {
      rc.clearRect(0, 0, canvas.width, canvas.height);
      rc.strokeStyle = "rgba(150,180,220,0.4)";
      raindrops.forEach((r) => {
        rc.globalAlpha = r.opacity;
        rc.lineWidth = 0.5;
        rc.beginPath();
        rc.moveTo(r.x, r.y);
        rc.lineTo(r.x - r.len * 0.2, r.y + r.len);
        rc.stroke();
        r.y += r.speed;
        r.x -= r.speed * 0.2;
        if (r.y > canvas.height) {
          r.y = -r.len;
          r.x = Math.random() * canvas.width;
        }
      });
    }
    setTimeout(() => requestAnimationFrame(drawRain), 50);
  }
  drawRain();
}

/* ========================================
 VHS GLITCH EFFECT
 ======================================== */
function scheduleGlitch() {
  const delay = 5000 + Math.random() * 15000;
  setTimeout(() => {
    const glitch = document.getElementById("vhs-glitch");
    glitch.style.opacity = "0.08";
    glitch.style.transform = `translateX(${(Math.random() - 0.5) * 10}px)`;
    setTimeout(
      () => {
        glitch.style.opacity = "0";
        glitch.style.transform = "none";
      },
      80 + Math.random() * 150,
    );
    scheduleGlitch();
  }, delay);
}
scheduleGlitch();

/* ========================================
 WEB AUDIO ENGINE
 ======================================== */
function initAudio() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx && AudioContextClass) audioCtx = new AudioContextClass();
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
  } catch (error) { /* YouTube playback does not require Web Audio. */ }
  interactionStarted = true;
}

/* createVinylCrackle and createAmbientDrone removed —
       never called anywhere; dead code eliminated.
       createSimpleReverb is kept below — still used by playToneForSong. */

function createSimpleReverb() {
  if (!audioCtx) return null;
  const convolver = audioCtx.createConvolver();
  const length = audioCtx.sampleRate * 2;
  const impulse = audioCtx.createBuffer(2, length, audioCtx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = impulse.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
    }
  }
  convolver.buffer = impulse;
  return convolver;
}

function playToneForSong(songName) {
  if (!audioCtx) return;

  // Stop existing melody
  if (ambientNodes.melody) {
    try {
      ambientNodes.melody.osc.stop();
      ambientNodes.melody2.osc.stop();
    } catch (e) {}
  }

  // Generate a simple melody note based on song name hash
  const notes = [
    220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25,
  ];
  const hash = songName.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const freq1 = notes[hash % notes.length];
  const freq2 = notes[(hash + 4) % notes.length];

  const osc = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  osc.type = "triangle";
  osc2.type = "triangle";
  osc.frequency.value = freq1 / 2;
  osc2.frequency.value = freq2 / 4;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.5);
  gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 2);

  const reverb = createSimpleReverb();
  if (!reverb) return;
  osc.connect(gain);
  osc2.connect(gain);
  gain.connect(reverb);
  reverb.connect(audioCtx.destination);
  osc.start();
  osc2.start();

  ambientNodes.melody = { osc, gain };
  ambientNodes.melody2 = { osc: osc2 };
}

/* ========================================
 AMBIENT VISUALIZER
 ======================================== */
const vizContainer = document.getElementById("ambient-viz");
const vizBars = [];
for (let i = 0; i < 60; i++) {
  const bar = document.createElement("div");
  bar.className = "viz-bar";
  bar.style.height = "4px";
  vizContainer.appendChild(bar);
  vizBars.push(bar);
}

let vizPhase = 0;
function animateViz() {
  vizPhase += 0.12;
  vizBars.forEach((bar, i) => {
    const wave = Math.sin(vizPhase + i * 0.3) * 0.5 + 0.5;
    const wave2 = Math.sin(vizPhase * 1.3 + i * 0.2) * 0.3;
    const h = isPlaying
      ? (wave + wave2) * 80 + 8
      : Math.sin(vizPhase * 0.3 + i * 0.5) * 4 + 4;
    bar.style.height = Math.max(2, h) + "px";
  });
  requestAnimationFrame(animateViz);
}
animateViz();

/* ========================================
 VINYL CANVAS RENDERER
 ======================================== */
/* ─── Seeded pseudo-random for per-song consistency ─── */
function seededRand(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function drawVinyl(canvas, color, playCount, isFavorite, rotation) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width,
    H = canvas.height;
  const cx = W / 2,
    cy = H / 2;
  const r = Math.min(W, H) / 2 - 2;
  const rot = ((rotation || 0) * Math.PI) / 180;

  // Per-song seeded randomness — same song always has same imperfections
  const seed = color.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rng = seededRand(seed + (playCount | 0));

  ctx.clearRect(0, 0, W, H);

  /* ── clip everything to disc circle ── */
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  /* ══════════════════════════════════════════════
         LAYER 1 — BASE: deep glossy black body
      ══════════════════════════════════════════════ */
  const base = ctx.createRadialGradient(cx, cy * 0.6, 0, cx, cy, r);
  base.addColorStop(0, "#242424");
  base.addColorStop(0.3, "#161616");
  base.addColorStop(0.7, "#0e0e0e");
  base.addColorStop(0.92, "#080808");
  base.addColorStop(1, "#1a1a1a");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  /* ══════════════════════════════════════════════
         LAYER 2 — GROOVES: 44 concentric bands
         Alternating micro-reflection & shadow stripes
      ══════════════════════════════════════════════ */
  const grooveStart = r * 0.33;
  const grooveEnd = r * 0.94;
  const numGrooves = 44;
  for (let i = 0; i < numGrooves; i++) {
    const t = i / numGrooves;
    const gr = grooveStart + (grooveEnd - grooveStart) * t;

    // Shadow valley between grooves
    ctx.beginPath();
    ctx.arc(cx, cy, gr, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0,0,0,${0.35 + (i % 2) * 0.1})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Groove ridge (specular catch)
    if (i % 2 === 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, gr + 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.025 + (i % 5 === 0 ? 0.018 : 0)})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }

    // Every 8th groove — deeper cut accent
    if (i % 8 === 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, gr, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }

  /* ══════════════════════════════════════════════
         LAYER 3 — GROOVE LIGHT SWEEP
         Rotates with vinyl — cinematic specular band
      ══════════════════════════════════════════════ */
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.translate(-cx, -cy);

  // Primary specular sweep — wide soft band
  const sweepGrad = ctx.createLinearGradient(
    cx - r,
    cy - r * 0.2,
    cx + r,
    cy + r * 0.2,
  );
  sweepGrad.addColorStop(0, "rgba(255,255,255,0)");
  sweepGrad.addColorStop(0.35, "rgba(255,255,255,0)");
  sweepGrad.addColorStop(0.48, "rgba(255,255,255,0.055)");
  sweepGrad.addColorStop(0.52, "rgba(255,255,255,0.028)");
  sweepGrad.addColorStop(0.65, "rgba(255,255,255,0)");
  sweepGrad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sweepGrad;
  ctx.fillRect(0, 0, W, H);

  // Neutral pressing sheen (restrained reflected light)
  const rainbowGrad = ctx.createLinearGradient(
    cx + r * Math.cos(rot - 0.3),
    cy + r * Math.sin(rot - 0.3),
    cx - r * Math.cos(rot - 0.3),
    cy - r * Math.sin(rot - 0.3),
  );
  rainbowGrad.addColorStop(0, "rgba(255,80,80,0)");
  rainbowGrad.addColorStop(0.2, "rgba(225,220,210,0.018)");
  rainbowGrad.addColorStop(0.38, "rgba(230,228,219,0.025)");
  rainbowGrad.addColorStop(0.52, "rgba(215,220,225,0.020)");
  rainbowGrad.addColorStop(0.7, "rgba(225,220,210,0.014)");
  rainbowGrad.addColorStop(1, "rgba(255,80,80,0)");
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = rainbowGrad;
  ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = "source-over";

  ctx.restore(); // unrotate

  /* ══════════════════════════════════════════════
         LAYER 4 — ALBUM COLOR TINT
         Subtle chromatic identity in the groove zone
      ══════════════════════════════════════════════ */
  const tintGrad = ctx.createRadialGradient(cx, cy, r * 0.16, cx, cy, r * 0.82);
  tintGrad.addColorStop(0, "rgba(0,0,0,0)");
  tintGrad.addColorStop(0.4, color + "18");
  tintGrad.addColorStop(0.75, color + "0e");
  tintGrad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = tintGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";

  /* ══════════════════════════════════════════════
         LAYER 5 — SCRATCHES
         Seeded so same record always looks the same
      ══════════════════════════════════════════════ */
  const scratchCount =
    3 + Math.floor(rng() * 5) + Math.min(Math.floor(playCount / 2), 6);
  for (let s = 0; s < scratchCount; s++) {
    const angle = rng() * Math.PI * 2;
    const rStart = grooveStart + rng() * (grooveEnd - grooveStart) * 0.5;
    const rEnd = rStart + rng() * r * 0.28 + r * 0.04;
    const wobble = (rng() - 0.5) * 0.06;
    const alpha = 0.03 + rng() * 0.045;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle + wobble);
    ctx.beginPath();
    ctx.moveTo(0, -rStart);
    ctx.lineTo(0, -rEnd);
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = 0.4 + rng() * 0.6;
    ctx.stroke();

    // Scratch shimmer — tiny bright glint at start
    ctx.beginPath();
    ctx.arc(0, -rStart - 2, 0.8, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha * 2})`;
    ctx.fill();
    ctx.restore();
  }

  /* ══════════════════════════════════════════════
         LAYER 6 — DUST PARTICLES
      ══════════════════════════════════════════════ */
  const dustCount = 18 + Math.floor(rng() * 22);
  for (let d = 0; d < dustCount; d++) {
    const angle = rng() * Math.PI * 2;
    const dr = grooveStart + rng() * (grooveEnd - grooveStart);
    const px = cx + Math.cos(angle) * dr;
    const py = cy + Math.sin(angle) * dr;
    const size = 0.3 + rng() * 0.9;
    const alpha = 0.06 + rng() * 0.14;
    ctx.beginPath();
    ctx.arc(px, py, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,245,220,${alpha})`;
    ctx.fill();
  }

  /* ══════════════════════════════════════════════
         LAYER 7 — FINGERPRINT SMUDGES
         Radial gradient blobs offset from center
      ══════════════════════════════════════════════ */
  const smudgeCount = 1 + Math.floor(playCount / 3);
  for (let f = 0; f < Math.min(smudgeCount, 4); f++) {
    const fx = cx + (rng() - 0.5) * r * 0.8;
    const fy = cy + (rng() - 0.5) * r * 0.8;
    const fRad = r * (0.12 + rng() * 0.18);
    const fp = ctx.createRadialGradient(fx, fy, 0, fx, fy, fRad);
    fp.addColorStop(0, `rgba(255,255,255,0.022)`);
    fp.addColorStop(0.5, `rgba(255,255,255,0.008)`);
    fp.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = fp;
    ctx.beginPath();
    ctx.arc(fx, fy, fRad, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }

  /* ══════════════════════════════════════════════
         LAYER 8 — CENTER LABEL
         Paper texture, aged look, inner ring lines
      ══════════════════════════════════════════════ */
  const labelR = r * 0.29;
  const labelGrd = ctx.createRadialGradient(
    cx - labelR * 0.25,
    cy - labelR * 0.25,
    0,
    cx,
    cy,
    labelR,
  );

  // Parse the hex color for a slightly lighter tint
  const cHex = color.replace("#", "");
  const cR = parseInt(cHex.slice(0, 2), 16);
  const cG = parseInt(cHex.slice(2, 4), 16);
  const cB = parseInt(cHex.slice(4, 6), 16);

  // Muted paper stock: album pigment blended with warm ivory, not a glossy dome.
  const paperR = Math.round(cR * 0.58 + 225 * 0.42);
  const paperG = Math.round(cG * 0.58 + 218 * 0.42);
  const paperB = Math.round(cB * 0.58 + 200 * 0.42);
  labelGrd.addColorStop(0, `rgb(${paperR},${paperG},${paperB})`);
  labelGrd.addColorStop(1, `rgb(${paperR - 12},${paperG - 12},${paperB - 12})`);

  ctx.beginPath();
  ctx.arc(cx, cy, labelR, 0, Math.PI * 2);
  ctx.fillStyle = labelGrd;
  ctx.fill();

  // Paper texture: concentric ring lines on label
  for (let lr = 0; lr < 2; lr++) {
    const lrr = labelR * (0.38 + lr * 0.48);
    ctx.beginPath();
    ctx.arc(cx, cy, lrr, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Label worn edge shadow
  const labelEdge = ctx.createRadialGradient(
    cx,
    cy,
    labelR * 0.75,
    cx,
    cy,
    labelR,
  );
  labelEdge.addColorStop(0, "rgba(0,0,0,0)");
  labelEdge.addColorStop(0.8, "rgba(0,0,0,0.1)");
  labelEdge.addColorStop(1, "rgba(0,0,0,0.16)");
  ctx.beginPath();
  ctx.arc(cx, cy, labelR, 0, Math.PI * 2);
  ctx.fillStyle = labelEdge;
  ctx.fill();

  // Label highlight spot (paper sheen)
  const labelShine = ctx.createRadialGradient(
    cx - labelR * 0.3,
    cy - labelR * 0.35,
    0,
    cx - labelR * 0.3,
    cy - labelR * 0.35,
    labelR * 0.55,
  );
  labelShine.addColorStop(0, "rgba(255,255,255,0.06)");
  labelShine.addColorStop(0.4, "rgba(255,255,255,0.04)");
  labelShine.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = labelShine;
  ctx.beginPath();
  ctx.arc(cx, cy, labelR, 0, Math.PI * 2);
  ctx.fill();

  // Printed label rotates with the existing record angle; no additional animation.
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.fillStyle = "rgba(25,25,23,0.85)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${Math.max(5, labelR * 0.20)}px Georgia, serif`;
  ctx.fillText("PARADISE", 0, -labelR * 0.48, labelR * 1.48);
  if (W >= 300) {
    ctx.font = `${labelR * 0.13}px Georgia, serif`;
    ctx.fillText("SIDE A · 33⅓ RPM", 0, labelR * 0.49, labelR * 1.45);
  }
  ctx.restore();

  /* ══════════════════════════════════════════════
         LAYER 9 — TRANSITION RING (label → groove)
         Slight pressed-vinyl ridge
      ══════════════════════════════════════════════ */
  ctx.beginPath();
  ctx.arc(cx, cy, labelR + 1.5, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0,0,0,0.6)";
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, labelR + 3, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  ctx.stroke();

  /* ══════════════════════════════════════════════
         LAYER 10 — SPECULAR HOTSPOT
         Main glossy reflection (upper-left, static)
      ══════════════════════════════════════════════ */
  const hotX = cx - r * 0.28;
  const hotY = cy - r * 0.32;
  const hot = ctx.createRadialGradient(hotX, hotY, 0, hotX, hotY, r * 0.55);
  hot.addColorStop(0, "rgba(255,255,255,0.09)");
  hot.addColorStop(0.25, "rgba(255,255,255,0.04)");
  hot.addColorStop(0.6, "rgba(255,255,255,0.01)");
  hot.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = hot;
  ctx.fillRect(0, 0, W, H);

  // Secondary smaller hotspot (bottom-right opposite)
  const hot2 = ctx.createRadialGradient(
    cx + r * 0.38,
    cy + r * 0.4,
    0,
    cx + r * 0.38,
    cy + r * 0.4,
    r * 0.28,
  );
  hot2.addColorStop(0, "rgba(255,255,255,0.03)");
  hot2.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = hot2;
  ctx.fillRect(0, 0, W, H);

  /* ══════════════════════════════════════════════
         LAYER 11 — EDGE BEVEL
         Thin bright rim + inner shadow for thickness
      ══════════════════════════════════════════════ */
  // Inner edge shadow (gives 3D depth)
  const rimIn = ctx.createRadialGradient(cx, cy, r * 0.88, cx, cy, r);
  rimIn.addColorStop(0, "rgba(0,0,0,0)");
  rimIn.addColorStop(0.7, "rgba(0,0,0,0.18)");
  rimIn.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = rimIn;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Bright bevel highlight (top-left arc)
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r - 0.8, -2.4, 0.2);
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 1.6;
  ctx.stroke();
  // Opposite dark rim
  ctx.beginPath();
  ctx.arc(cx, cy, r - 0.8, 0.2, -2.4);
  ctx.strokeStyle = "rgba(0,0,0,0.55)";
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.restore();

  /* ══════════════════════════════════════════════
         LAYER 12 — CENTER HOLE
      ══════════════════════════════════════════════ */
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.032, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();
  // Hole edge glint
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.032, -2.0, 0.5);
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 0.8;
  ctx.stroke();

  /* ══════════════════════════════════════════════
         LAYER 13 — FAVORITE STAR shimmer
      ══════════════════════════════════════════════ */
  if (isFavorite) {
    ctx.globalCompositeOperation = "screen";
    const favGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.5);
    favGlow.addColorStop(0, "rgba(255,220,100,0.10)");
    favGlow.addColorStop(0.5, "rgba(255,180,60,0.04)");
    favGlow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = favGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }

  ctx.restore(); // unclip
}

/* ========================================
 CREATE VINYL CARD
 ======================================== */
function createVinylCard(songName, albumName, albumData, targetEl) {
  const card = document.createElement("div");
  card.className = "vinyl-card";
  card.dataset.song = songName;
  card.dataset.album = albumName;

  const pc = playCounts[songName] || 0;
  const isFav = favorites.includes(songName);

  card.innerHTML = `
    <div class="vinyl-wrapper">
      <div class="drag-hint">drag to spin</div>
      <div class="vinyl-disc" id="vinyl-${sanitizeId(songName)}">
        <canvas class="vinyl-canvas" width="120" height="120"></canvas>
      </div>
    </div>
    <div class="vinyl-info">
      <div class="vinyl-song-name">${songName}</div>
      <div class="vinyl-play-count">${pc > 0 ? `played ${pc} time${pc > 1 ? "s" : ""}` : "untouched"}</div>
    </div>
  `;

  targetEl.appendChild(card);

  // Draw vinyl
  const canvas = card.querySelector(".vinyl-canvas");
  drawVinyl(canvas, albumData.color, pc, isFav, 0);

  // Vinyl interactions
  const disc = card.querySelector(".vinyl-disc");
  let localRot = Math.random() * 360;
  let animReq = null;
  let rotSpeed = 0;
  let isLocalDragging = false;
  let localDragStart = null;
  let localDragLastAngle = 0;
  let localDragVel = 0;
  let suppressClick = false;
  let lastTouchOpen = 0;
  card.addEventListener("mousedown", () => { suppressClick = false; localDragVel = 0; });

  // Hover spin preview
  card.addEventListener("mouseenter", () => {
    if (!isLocalDragging) {
      rotSpeed = 1.5;
      if (!animReq) animateDisc(performance.now());
    }
  });
  card.addEventListener("mouseleave", () => {
    if (!isLocalDragging) rotSpeed = 0;
  });

  // Event driven restart when card enters viewport
  card.addEventListener("cardVisible", () => {
    if (!animReq) animateDisc(performance.now());
  });

  // FIX #2: Attach-on-drag / remove-on-release — eliminates 300+ permanent document listeners
  disc.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isLocalDragging = true;
    const rect = disc.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    localDragStart =
      (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
    localDragLastAngle = localDragStart;
    disc.classList.add("dragging");
    if (!animReq) animateDisc(performance.now());

    const onMouseMove = (e) => {
      const rect = disc.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle =
        (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
      let delta = angle - localDragLastAngle;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      if (Math.abs(delta) > 1) suppressClick = true;
      localDragVel = delta;
      localRot += delta;
      localDragLastAngle = angle;
      drawVinyl(canvas, albumData.color, playCounts[songName] || 0, favorites.includes(songName), localRot);
    };
    const onMouseUp = () => {
      isLocalDragging = false;
      disc.classList.remove("dragging");
      rotSpeed = localDragVel * 0.5;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  // FIX #1 (Performance): offsetParent check + complete RAF cancellation when off-screen
  let lastDiscFrame = 0;
  function animateDisc(timestamp) {
    if (
      !isLocalDragging &&
      (!visibleCards.has(card) || card.offsetParent === null)
    ) {
      animReq = null; // completely pause RAF loop to save CPU
      return;
    }
    if (timestamp - lastDiscFrame > 33) {
      // cap at ~30fps
      lastDiscFrame = timestamp;
      localRot += rotSpeed;
      rotSpeed *= 0.98;
      if (Math.abs(rotSpeed) > 0.1) {
        drawVinyl(canvas, albumData.color, playCounts[songName] || 0, favorites.includes(songName), localRot);
      }
    }
    if (isLocalDragging || Math.abs(rotSpeed) > 0.1) {
      animReq = requestAnimationFrame(animateDisc);
    } else {
      animReq = null;
    }
  }
  animateDisc(performance.now());

  // Click to open player (mouse)
  card.addEventListener("click", (e) => {
    if (suppressClick || Date.now() - lastTouchOpen < 700) { suppressClick = false; return; }
    openPlayer(songName, albumName, albumData, canvas, localRot);
  });

  // ── TOUCH: tap to open player ─────────────────────────────────
  let localTouchStartX = 0;
  let localTouchStartY = 0;
  let localTouchDragDistance = 0;
  let localTouchCardStartX = 0;
  let localTouchCardStartY = 0;
  let localTouchCardTime = 0;

  card.addEventListener(
    "touchstart",
    (e) => {
      localTouchCardStartX = e.touches[0].clientX;
      localTouchCardStartY = e.touches[0].clientY;
      localTouchCardTime = Date.now();
      localTouchDragDistance = 0;
      localDragVel = 0;
      suppressClick = false;
    },
    { passive: true },
  );

  card.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - localTouchCardStartX;
      const dy = e.changedTouches[0].clientY - localTouchCardStartY;
      const moveDist = Math.sqrt(dx * dx + dy * dy);
      const duration = Date.now() - localTouchCardTime;
      if (moveDist > 10) return;
      if (duration > 400) return;
      if (localTouchDragDistance > 8) return;
      if (Math.abs(localDragVel) > 3) return;
      lastTouchOpen = Date.now();
      openPlayer(songName, albumName, albumData, canvas, localRot);
    },
    { passive: true },
  );

  // ── TOUCH: spin the vinyl ─────────────────────────────────────
  disc.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      isLocalDragging = true;
      localDragVel = 0;
      localTouchDragDistance = 0;
      const touch = e.touches[0];
      localTouchStartX = touch.clientX;
      localTouchStartY = touch.clientY;
      const rect = disc.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      localDragStart =
        (Math.atan2(touch.clientY - cy, touch.clientX - cx) * 180) / Math.PI;
      localDragLastAngle = localDragStart;
      disc.classList.add("dragging");
      if (!animReq) animateDisc(performance.now());

      // FIX #2 (touch): same attach-on-drag pattern for touch
      const onTouchMove = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const dx = touch.clientX - localTouchStartX;
        const dy = touch.clientY - localTouchStartY;
        localTouchDragDistance = Math.sqrt(dx * dx + dy * dy);
        const rect = disc.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle =
          (Math.atan2(touch.clientY - cy, touch.clientX - cx) * 180) / Math.PI;
        let delta = angle - localDragLastAngle;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      if (Math.abs(delta) > 1) suppressClick = true;
        localDragVel = delta;
        localRot += delta;
        localDragLastAngle = angle;
        drawVinyl(canvas, albumData.color, playCounts[songName] || 0, favorites.includes(songName), localRot);
      };
      const onTouchEnd = () => {
        if (!isLocalDragging) return;
        isLocalDragging = false;
        disc.classList.remove("dragging");
        rotSpeed = localDragVel * 0.5;
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
        document.removeEventListener("touchcancel", onTouchEnd);
      };
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd, { passive: true });
      document.addEventListener("touchcancel", onTouchEnd, { passive: true });
    },
    { passive: false },
  );

  // Playback queue is owned by navigation/openPlayer, not lazy DOM creation.

  // Register with visibility observer
  cardObserver.observe(card);
}

function sanitizeId(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "_");
}

/* ========================================
 POPULATE WORLD SECTIONS
 ======================================== */

// IntersectionObserver — only animate vinyl cards in the viewport
const visibleCards = new Set();
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        visibleCards.add(e.target);
        e.target.dispatchEvent(new Event("cardVisible"));
      } else {
        visibleCards.delete(e.target);
      }
    });
  },
  { threshold: 0.1 },
);

function populateWorlds(targetAlbum = null) {
  const mapping = {
    "Born To Die": { grid: "btd-grid", floatId: "btd-float" },
    Paradise: { grid: "paradise-grid", floatId: "paradise-float" },
    Ultraviolence: { grid: "uv-grid", floatId: "uv-float" },
    Honeymoon: { grid: "honey-grid", floatId: "honey-float" },
    "Lust For Life": { grid: "lfl-grid", floatId: "lfl-float" },
    "Norman Fucking Rockwell": { grid: "nfr-grid", floatId: "nfr-float" },
    "Chemtrails Over The Country Club": {
      grid: "chemtrails-grid",
      floatId: "chemtrails-float",
    },
    "Did You Know There's A Tunnel Under Ocean Blvd": {
      grid: "tunnel-grid",
      floatId: "tunnel-float",
    },
    Specials: { grid: "heaven-grid", floatId: "heaven-float" },
  };

  Object.entries(albums).forEach(([albumName, albumData]) => {
    if (targetAlbum && targetAlbum !== albumName) return;
    const map = mapping[albumName];
    if (!map) return;

    if (builtGrids.has(albumName)) return;
    builtGrids.add(albumName);

    const gridEl = document.getElementById(map.grid);
    if (!gridEl) return;

    albumData.tracks.forEach((track) => {
      createVinylCard(track, albumName, albumData, gridEl);
    });
  });
}

/* ========================================
 FLOATING TEXT SYSTEM
 ======================================== */
function initFloatingPhrases(containerId, albumName) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const phrases = sectionPhrases[containerId] || floatingPhrases;

  function spawnPhrase() {
    const phrase = document.createElement("div");
    phrase.className = "floating-phrase";
    const p = phrases[Math.floor(Math.random() * phrases.length)];
    phrase.textContent = p;
    phrase.style.left = Math.random() * 90 + 5 + "%";
    phrase.style.fontSize = 0.7 + Math.random() * 0.8 + "rem";
    phrase.style.opacity = 0.05 + Math.random() * 0.12;
    const duration = 15 + Math.random() * 20;
    phrase.style.animationDuration = duration + "s";
    phrase.style.animationDelay = "0s";
    container.appendChild(phrase);
    setTimeout(() => phrase.remove(), duration * 1000);
  }

  // Scale down float word density on mobile/low-end
  const spawnRateMultiplier = isLowEnd ? 3 : window.innerWidth < 768 ? 2 : 1;

  // Initial phrases
  const initialPhrases = Math.ceil(3 / spawnRateMultiplier);
  for (let i = 0; i < initialPhrases; i++)
    setTimeout(spawnPhrase, i * 2000 * spawnRateMultiplier);
  setInterval(spawnPhrase, (6000 + Math.random() * 4000) * spawnRateMultiplier);
}

/* ========================================
 HEAVEN ROSES
 ======================================== */
function initHeavenRoses() {
  const container = document.getElementById("heaven-roses");
  if (!container) return;

  function spawnRose() {
    const rose = document.createElement("div");
    rose.className = "heaven-rose";
    rose.textContent = "✿";
    rose.style.left = Math.random() * 100 + "%";
    rose.style.bottom = "-20px";
    const dur = 10 + Math.random() * 15;
    rose.style.animationDuration = dur + "s";
    rose.style.animationDelay = "0s";
    container.appendChild(rose);
    setTimeout(() => rose.remove(), dur * 1000);
  }

  for (let i = 0; i < 5; i++) setTimeout(spawnRose, i * 2000);
  setInterval(spawnRose, 3000);
}

/* ========================================
 BTD ROSES
 ======================================== */
function initBtdRoses() {
  const container = document.getElementById("btd-roses");
  if (!container) return;
  const roseEmojis = ["🌹", "🌸", "🥀"];
  for (let i = 0; i < 8; i++) {
    const rose = document.createElement("div");
    rose.className = "btd-rose";
    rose.textContent = roseEmojis[i % roseEmojis.length];
    rose.style.left = 5 + Math.random() * 90 + "%";
    rose.style.top = 10 + Math.random() * 80 + "%";
    rose.style.animationDelay = Math.random() * 4 + "s";
    rose.style.animationDuration = 4 + Math.random() * 4 + "s";
    container.appendChild(rose);
  }
}

/* ========================================
 LFL CARNIVAL LIGHTS
 ======================================== */
function initCarnivalLights() {
  const container = document.getElementById("lfl-carnival");
  if (!container) return;
  const colors = ["#ff6b9d", "#ffd700", "#ff8c42", "#9b59b6", "#3498db"];
  for (let i = 0; i < 15; i++) {
    const light = document.createElement("div");
    light.className = "carnival-light";
    const size = 4 + Math.random() * 12;
    light.style.width = light.style.height = size + "px";
    light.style.left = Math.random() * 100 + "%";
    light.style.top = Math.random() * 100 + "%";
    const c = colors[Math.floor(Math.random() * colors.length)];
    light.style.background = c;
    light.style.boxShadow = `0 0 ${size * 2}px ${c}, 0 0 ${size * 4}px ${c}44`;
    light.style.animationDelay = Math.random() * 2 + "s";
    light.style.animationDuration = 1 + Math.random() * 2 + "s";
    container.appendChild(light);
  }
}

/* ========================================
 OPEN PLAYER
 ======================================== */
function openPlayer(songName, albumName, albumData, sourceCanvas, startRot) {
  if (!albums[albumName]?.tracks.includes(songName)) return;
  saveCurrentNote();
  const changed = currentTrack !== songName || currentAlbum !== albumName;
  const reopening = !changed && ytCurrentVideoId !== null;
  if (changed) {
    stopPlayback();
    ytCurrentVideoId = null;
    playbackCounted = false;
    updatePlayerProgress(0);
    document.getElementById("player-time-total").textContent = "0:00";
  }
  // Browsing a different world must not replace the playing song's queue.
  trackList = albums[albumName].tracks.map(song => ({ song, album: albumName, albumData: albums[albumName] }));
  currentTrack = songName;
  currentAlbum = albumName;
  playerOpen = true;
  vinylRotation = startRot || 0;

  // Update UI
  document.getElementById("player-song-name").textContent = songName;
  document.getElementById("player-album-name").textContent =
    albumName.toUpperCase();
  document.getElementById("player-note").value = userNotes[songName] || "";

  // Find in track list
  const idx = trackList.findIndex(
    (t) => t.song === songName && t.album === albumName,
  );
  if (idx !== -1) currentTrackIndex = idx;

  // Draw large vinyl
  const pvCanvas = document.getElementById("player-vinyl-canvas");
  pvCanvas.width = 280;
  pvCanvas.height = 280;

  if (playerVinylRafId) cancelAnimationFrame(playerVinylRafId);
  function drawPlayerVinyl() {
    if (!playerOpen) return;
    if (isPlaying && !isDraggingVinyl) vinylRotation += 0.5;
    drawVinyl(
      pvCanvas,
      albumData.color,
      playCounts[songName] || 0,
      favorites.includes(songName),
      vinylRotation,
    );
    if (playerOpen) playerVinylRafId = requestAnimationFrame(drawPlayerVinyl);
  }
  drawPlayerVinyl();

  // Setup drag on large vinyl
  setupPlayerVinylDrag(pvCanvas, albumData);

  // Update fav button
  updateFavBtn();

  // Show player
  const playerEl = document.getElementById("vinyl-player");
  playerEl.classList.add("open");

  // Update now playing
  document.getElementById("np-title").textContent = songName;
  document.getElementById("np-album").textContent = albumName;

  // Start playback
  if (!interactionStarted) initAudio();
  if (!reopening) startPlayback();
}

function closePlayer() {
  playerOpen = false;
  isDraggingVinyl = false;
  document.getElementById("vinyl-player").classList.remove("open");

  saveCurrentNote();
}

function saveCurrentNote() {
  if (currentTrack) {
    const note = document.getElementById("player-note").value;
    if (note) userNotes[currentTrack] = note;
    else delete userNotes[currentTrack];
    writeStored("paradise_notes", JSON.stringify(userNotes));
  }
}

/* ========================================
 PLAYER VINYL DRAG (SCRUBBING)
 ======================================== */
function setupPlayerVinylDrag(canvas, albumData) {
  // FIX #3: Guard against re-setup on the same canvas element across track changes.
  // We store a single set of shared drag state on the canvas element itself,
  // then wire listeners only once (checked via dataset flag).
  if (canvas.dataset.dragSetup === "1") return;
  canvas.dataset.dragSetup = "1";

  let isDrag = false;
  let startAng = 0,
    lastAng = 0,
    dragVel = 0;

  const scrub = (delta) => {
    vinylRotation += delta;
    if (ytPlayer && ytReady && ytCurrentVideoId) {
      try {
        const duration = ytPlayer.getDuration();
        if (duration > 0) {
          const currentTime = ytPlayer.getCurrentTime();
          ytPlayer.seekTo(
            Math.max(0, Math.min(duration, currentTime + delta * 0.5)),
            true,
          );
        }
      } catch (e) {}
      syncYTProgress();
    }
  };

  // ── MOUSE ─────────────────────────────────────────────────────
  canvas.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDrag = true;
    isDraggingVinyl = true;
    const r = canvas.getBoundingClientRect();
    startAng = Math.atan2(
      e.clientY - (r.top + r.height / 2),
      e.clientX - (r.left + r.width / 2),
    );
    lastAng = startAng;

    const onMouseMove = (e) => {
      if (!isDrag) return;
      const r = canvas.getBoundingClientRect();
      const ang = Math.atan2(
        e.clientY - (r.top + r.height / 2),
        e.clientX - (r.left + r.width / 2),
      );
      let delta = ((ang - lastAng) * 180) / Math.PI;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      dragVel = delta;
      lastAng = ang;
      scrub(delta);
    };
    const onMouseUp = () => {
      isDrag = false;
      isDraggingVinyl = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  // ── TOUCH ─────────────────────────────────────────────────────
  canvas.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      isDrag = true;
    isDraggingVinyl = true;
      const touch = e.touches[0];
      const r = canvas.getBoundingClientRect();
      startAng = Math.atan2(
        touch.clientY - (r.top + r.height / 2),
        touch.clientX - (r.left + r.width / 2),
      );
      lastAng = startAng;

      const onTouchMove = (e) => {
        if (!isDrag) return;
        e.preventDefault();
        const touch = e.touches[0];
        const r = canvas.getBoundingClientRect();
        const ang = Math.atan2(
          touch.clientY - (r.top + r.height / 2),
          touch.clientX - (r.left + r.width / 2),
        );
        let delta = ((ang - lastAng) * 180) / Math.PI;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;
        dragVel = delta;
        lastAng = ang;
        scrub(delta);
      };
      const onTouchEnd = () => {
        isDrag = false;
        isDraggingVinyl = false;
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
        document.removeEventListener("touchcancel", onTouchEnd);
      };
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onTouchEnd, { passive: true });
      document.addEventListener("touchcancel", onTouchEnd, { passive: true });
    },
    { passive: false },
  );
}

/* ========================================
 PLAYBACK
 ======================================== */

// Required global callback name for YouTube IFrame API
window.onYouTubeIframeAPIReady = function () {
  if (ytPlayer) return;
  ytPlayer = new YT.Player("yt-player", {
    height: "200",
    width: "200",
    playerVars: {
      autoplay: 0,
      origin: window.location.origin,
      controls: 0,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      fs: 0,
    },
    events: {
      onReady: function (e) {
        ytReady = true;
        console.log("YT Ready");
        if (currentTrack && playbackRequested) startPlayback();
      },
      onStateChange: function (event) {
        if (!ytCurrentVideoId) return;
        const video = event.target.getVideoData?.();
        if (video?.video_id && video.video_id !== ytCurrentVideoId) return;
        if (event.data === YT.PlayerState.ENDED) {
          if (playbackRequested) nextTrack();
          return;
        }
        if (event.data === YT.PlayerState.PLAYING) {
          clearTimeout(ytLoadTimer);
          if (!playbackRequested) { event.target.pauseVideo(); return; }
          setPlaybackUI(true);
          if (!playbackCounted && currentTrack) {
            playbackCounted = true;
            playCounts[currentTrack] = (Number(playCounts[currentTrack]) || 0) + 1;
            writeStored("paradise_playcounts", JSON.stringify(playCounts));
            updateObsessedSong();
            refreshCurrentVinylCard();
          }
          syncYTProgress();
        } else if (event.data === YT.PlayerState.PAUSED) {
          playbackRequested = false;
          setPlaybackUI(false);
          syncYTProgress();
        } else if (event.data === YT.PlayerState.BUFFERING) {
          setPlaybackUI(false);
        }
      },
      onError: function () {
        stopPlayback();
        ytCurrentVideoId = null;
        document.getElementById("player-play-btn").title = "This YouTube track could not be played. Try again or select another track.";
      },
      onAutoplayBlocked: function () {
        stopPlayback();
        document.getElementById("player-play-btn").title = "Press play to start this track.";
      },
    },
  });
};

function syncYTProgress() {
  clearTimeout(ytProgressTimer);
  if (!ytPlayer || !ytReady || !ytCurrentVideoId) return;
  try {
    const currentTime = ytPlayer.getCurrentTime();
    const duration = ytPlayer.getDuration();
    if (duration > 0) {
      const pct = (currentTime / duration) * 100;
      updatePlayerProgress(pct);

      // Real time display
      const fmtTime = (sec) => {
        const s = Math.floor(sec);
        return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
      };
      const curEl = document.getElementById("player-time-current");
      const totalEl = document.getElementById("player-time-total");
      if (curEl) curEl.textContent = fmtTime(currentTime);
      if (totalEl) totalEl.textContent = fmtTime(duration);
    }
  } catch (e) {}
  if (playbackRequested) ytProgressTimer = setTimeout(syncYTProgress, 500);
}

function setPlaybackUI(playing) {
  isPlaying = playing;
  document.getElementById("np-play-btn").textContent = playing ? "⏸" : "▶";
  document.getElementById("player-play-btn").textContent = playing ? "⏸" : "▶";
  document.getElementById("np-vinyl-mini").classList.toggle("playing", playing);
}

function startPlayback() {
  if (!currentTrack) {
    const first = trackList[0];
    if (first) openPlayer(first.song, first.album, first.albumData, null, 0);
    return;
  }
  initAudio();
  playbackRequested = true;
  clearTimeout(ytLoadTimer);
  const button = document.getElementById("player-play-btn");
  button.title = "";
  const videoId = songVideoIds[currentTrack];
  if (!videoId) {
    stopPlayback();
    button.title = "No YouTube video is assigned to this track.";
    return;
  }
  // Queue only the latest request. API readiness never retries/counts a play.
  ytLoadTimer = setTimeout(() => {
    if (!isPlaying) {
      stopPlayback();
      button.title = "YouTube did not start. Check your connection and press play to retry.";
    }
  }, 15000);
  if (!ytPlayer || !ytReady) return;
  if (videoId !== ytCurrentVideoId) {
    ytCurrentVideoId = videoId;
    ytPlayer.loadVideoById(videoId);
  } else {
    ytPlayer.playVideo();
  }
}

function stopPlayback() {
  playbackRequested = false;
  setPlaybackUI(false);
  clearTimeout(ytLoadTimer);
  clearTimeout(ytProgressTimer);
  clearInterval(playbackInterval);
  if (ytPlayer && ytReady) {
    try { ytPlayer.pauseVideo(); } catch (error) {}
  }
  // Stop any legacy ambient fallback that was already active.
  for (const key of ["melody", "melody2"]) {
    try { ambientNodes[key]?.osc.stop(); } catch (error) {}
    delete ambientNodes[key];
  }
}

function togglePlayback() {
  if (!interactionStarted) initAudio();
  if (isPlaying || playbackRequested) stopPlayback();
  else startPlayback();
}

function updatePlayerProgress(pct) {
  pct = Math.max(0, Math.min(100, Number(pct) || 0));
  playbackProgress = pct;
  const fill = document.getElementById("player-progress-fill");
  const dot = document.getElementById("player-progress-dot");
  const npBar = document.getElementById("np-progress-bar");
  if (fill) fill.style.width = pct + "%";
  if (dot) dot.style.left = pct + "%";
  if (npBar) npBar.style.width = pct + "%";

  // Time display
  const totalSec = ytReady && ytCurrentVideoId ? ytPlayer.getDuration() || 0 : 0;
  const currentSec = Math.floor((totalSec * pct) / 100);
  const m = Math.floor(currentSec / 60);
  const s = currentSec % 60;
  const cur = document.getElementById("player-time-current");
  if (cur) cur.textContent = `${m}:${s.toString().padStart(2, "0")}`;
}

function prevTrack() {
  if (!trackList.length) return;
  currentTrackIndex =
    (currentTrackIndex - 1 + trackList.length) % trackList.length;
  const t = trackList[currentTrackIndex];
  playbackProgress = 0;
  openPlayer(t.song, t.album, t.albumData, null, 0);
}

function nextTrack() {
  if (!trackList.length) return;
  currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
  const t = trackList[currentTrackIndex];
  playbackProgress = 0;
  openPlayer(t.song, t.album, t.albumData, null, 0);
}

/* ========================================
 FAVORITES
 ======================================== */
function toggleFavorite() {
  if (!currentTrack) return;
  const idx = favorites.indexOf(currentTrack);
  if (idx === -1) favorites.push(currentTrack);
  else favorites.splice(idx, 1);
  writeStored("paradise_favorites", JSON.stringify(favorites));
  updateFavBtn();
  refreshCurrentVinylCard();
}

function quickFavorite(songName, btn) {
  const idx = favorites.indexOf(songName);
  if (idx === -1) {
    favorites.push(songName);
    btn.textContent = "♥";
    btn.classList.add("active");
  } else {
    favorites.splice(idx, 1);
    btn.textContent = "♡";
    btn.classList.remove("active");
  }
  writeStored("paradise_favorites", JSON.stringify(favorites));
}

function updateFavBtn() {
  const btn = document.getElementById("fav-btn");
  if (!btn || !currentTrack) return;
  btn.textContent = favorites.includes(currentTrack) ? "♥" : "♡";
  btn.style.color = favorites.includes(currentTrack)
    ? "rgba(255,100,150,0.9)"
    : "rgba(255,100,150,0.4)";
}

function refreshCurrentVinylCard() {
  // Redraw the small vinyl card
  if (!currentTrack) return;
  const id = "vinyl-" + sanitizeId(currentTrack);
  const disc = document.getElementById(id);
  if (disc) {
    const count = Number(playCounts[currentTrack]) || 0;
    const label = disc.closest(".vinyl-card").querySelector(".vinyl-play-count");
    if (label) label.textContent = count ? `played ${count} time${count === 1 ? "" : "s"}` : "untouched";
    const canvas = disc.querySelector(".vinyl-canvas");
    const albumData = albums[currentAlbum];
    if (canvas && albumData) {
      drawVinyl(
        canvas,
        albumData.color,
        playCounts[currentTrack] || 0,
        favorites.includes(currentTrack),
        0,
      );
    }
  }
}

/* ========================================
 OBSESSED SONG
 ======================================== */
function updateObsessedSong() {
  let maxCount = 0,
    maxSong = "";
  Object.entries(playCounts).forEach(([song, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxSong = song;
    }
  });
  if (maxSong) {
    obsessedSong = maxSong;
    writeStored("paradise_obsessed", maxSong);
    const el = document.getElementById("obsessed-song");
    if (el) el.textContent = maxSong;
  }
}

/* ========================================
 MOOD SYSTEM
 ======================================== */
function setMood(el) {
  document
    .querySelectorAll(".mood-tag")
    .forEach((t) => t.classList.remove("active"));
  el.classList.add("active");
  currentMood = el.dataset.mood;
  writeStored("paradise_mood", currentMood);
  applyMoodAtmosphere(currentMood);
}

function applyMoodAtmosphere(mood) {
  const moodColors = {
    dreamy: "#b090d0",
    "lonely-night": "#4060a0",
    melancholic: "#8080b0",
    cinematic: "#d0a060",
    nostalgic: "#c08060",
    "luxury-sadness": "#d080a0",
    "romantic-sadness": "#e07090",
  };
  const color = moodColors[mood] || "#ff6b9d";
  document.documentElement.style.setProperty("--mood-accent", color);
  document.documentElement.style.setProperty("--neon-pink", color);
}

/* ========================================
 NOTES PANEL
 ======================================== */
function toggleNotes() {
  // Simple notes mode - open player note if track selected
  if (currentTrack && playerOpen) {
    document.getElementById("player-note").focus();
  }
}

/* ========================================
 MOBILE MOOD OVERLAY
 ======================================== */
function toggleMoodOverlay() {
  const overlay = document.getElementById("mood-overlay");
  if (overlay) overlay.classList.toggle("open");
}

/* ========================================
 NOTES SMOKE STYLE - CSS
 ======================================== */
const smokeStyle = document.createElement("style");
smokeStyle.textContent = `
@keyframes smokeRise {
  0%   { opacity: 0; transform: translateY(0) scaleX(0.5); }
  20%  { opacity: 0.4; }
  80%  { opacity: 0.2; }
  100% { opacity: 0; transform: translateY(-150px) scaleX(2); }
}
@keyframes tunnelRing {
  from { width: 50px; height: 50px; opacity: 0.3; }
  to   { width: 400px; height: 400px; opacity: 0; transform: translate(-50%,-50%); }
}
`;
document.head.appendChild(smokeStyle);

/* ========================================
 INTRO → MAIN TRANSITION
 ======================================== */
function enterDream() {
  const enterButton = document.getElementById("enter-btn");
  if (enterButton.disabled) return;
  enterButton.disabled = true;
  initAudio();

  const intro = document.getElementById("intro-scene");
  const selectScreen = document.getElementById("album-select-screen");

  gsap
    .timeline()
    .to("#enter-btn", { opacity: 0, duration: 0.5 })
    .to(".intro-sub", { opacity: 0, duration: 0.5 }, "-=0.3")
    .to(
      ".intro-title",
      {
        scale: 1.2,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power2.inOut",
      },
      "-=0.2",
    )
    .to(
      "#cadillac",
      { x: "60vw", opacity: 0, duration: 2, ease: "power2.in" },
      "-=1",
    )
    .to(
      ".highway-scene",
      { opacity: 0, duration: 1.5, ease: "power2.in" },
      "-=1.5",
    )
    .to(
      intro,
      {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          intro.style.display = "none";
          selectScreen.scrollTop = 0;
          selectScreen.classList.add("visible");
          gsap.from("#album-select-screen .as-card", {
            clearProps: "opacity,transform",
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          });
          gsap.from(".as-header", {
            opacity: 0,
            y: -20,
            duration: 0.8,
            ease: "power2.out",
          });
        },
      },
      "-=0.8",
    );
}

/* ========================================
 ALBUM SELECTION SCREEN
 ======================================== */
const albumCardData = [
  {
    key: "Born To Die",
    title: "Born To Die",
    year: "2012",
    sectionId: "btd",
    image: "https://i.scdn.co/image/ab67616d0000b2731546efd1f4b5ef81d1a15bcb",
  },
  {
    key: "Paradise",
    title: "Paradise",
    year: "2012",
    sectionId: "paradise-ep",
    image: "https://i.scdn.co/image/ab67616d0000b273b1f5b0c49db4c81b7b7a8c4d",
  },
  {
    key: "Ultraviolence",
    title: "Ultraviolence",
    year: "2014",
    sectionId: "uv",
    image: "https://i.scdn.co/image/ab67616d0000b273fe0fd55e77f8b2b9b2b7c4e66",
  },
  {
    key: "Honeymoon",
    title: "Honeymoon",
    year: "2015",
    sectionId: "honey",
    image: "https://i.scdn.co/image/ab67616d0000b273d2a09c64a35e3d6f51d70c1e",
  },
  {
    key: "Lust For Life",
    title: "Lust For Life",
    year: "2017",
    sectionId: "lfl",
    image: "https://i.scdn.co/image/ab67616d0000b273b53b69b47e44a64ca9eb66b0",
  },
  {
    key: "Norman Fucking Rockwell",
    title: "Norman Fucking Rockwell",
    year: "2019",
    sectionId: "nfr",
    image: "https://i.scdn.co/image/ab67616d0000b27381b8e44e3e2cf3ddb3f7a1e4",
  },
  {
    key: "Chemtrails Over The Country Club",
    title: "Chemtrails Over The Country Club",
    year: "2021",
    sectionId: "chemtrails",
    image: "https://i.scdn.co/image/ab67616d0000b2737a4c890e38b5d3f6d3d0c5e2",
  },
  {
    key: "Did You Know There's A Tunnel Under Ocean Blvd",
    title: "Ocean Blvd",
    year: "2023",
    sectionId: "tunnel",
    image: "https://i.scdn.co/image/ab67616d0000b273a6c4fa6e0a9e3f3f3f3f3f3f",
  },
  {
    key: "Specials",
    title: "Specials",
    label: "UNRELEASED",
    year: "rarities",
    sectionId: "heaven",
    image: null,
  },
];

function buildAlbumSelectionScreen() {
  const grid = document.getElementById("as-grid");
  if (!grid) return;
  grid.innerHTML = "";

  albumCardData.forEach((card, i) => {
    const albumData = albums[card.key];
    if (!albumData) return;
    const color = albumData.color || "#d4a574";

    const el = document.createElement("div");
    el.className = "as-card";
    el.style.setProperty("--as-color", color);
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");

    el.innerHTML = `
      <div class="as-card-info">
        <h2 class="as-card-title">${card.title || card.key}</h2>
        <div class="as-card-year">${card.year}</div>
        <div class="as-card-tracks">${albumData ? albumData.tracks.length : ""} tracks</div>
      </div>
    `;

    el.addEventListener("click", () =>
      enterAlbumWorld(card.key, card.sectionId),
    );
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        enterAlbumWorld(card.key, card.sectionId);
      }
    });
    let cardTouchStartX = 0,
      cardTouchStartY = 0,
      cardTouchMoved = false;

    el.addEventListener(
      "touchstart",
      (e) => {
        const t = e.touches[0];
        cardTouchStartX = t.clientX;
        cardTouchStartY = t.clientY;
        cardTouchMoved = false;
      },
      { passive: true },
    );

    el.addEventListener(
      "touchmove",
      (e) => {
        const t = e.touches[0];
        const dx = t.clientX - cardTouchStartX;
        const dy = t.clientY - cardTouchStartY;
        if (Math.sqrt(dx * dx + dy * dy) > 10) cardTouchMoved = true;
      },
      { passive: true },
    );

    el.addEventListener(
      "touchend",
      (e) => {
        if (cardTouchMoved) return; // was a scroll, not a tap
        enterAlbumWorld(card.key, card.sectionId);
      },
      { passive: true },
    );

    grid.appendChild(el);
  });

  // Drifting text particles for album selection
  const asParticleContainer = document.getElementById("as-particle-container");
  if (asParticleContainer && !asParticleContainer._init) {
    asParticleContainer._init = true;
    const driftWords = [
      "SUMMERTIME",
      "MIDNIGHT",
      "CINEMA",
      "PARADISE",
      "DREAM",
      "LANA",
      "VELVET",
      "NOSTALGIA",
    ];
    function createDriftWord() {
      const el = document.createElement("div");
      el.style.cssText = `
        position: absolute;
        font-family: Inter, sans-serif;
        font-size: 11px;
        letter-spacing: 0.2em;
        color: rgba(228,226,228,0.06);
        text-transform: uppercase;
        white-space: nowrap;
        pointer-events: none;
        top: ${Math.random() * 100}vh;
        animation: asDrift ${40 + Math.random() * 40}s linear ${Math.random() * -60}s infinite;
      `;
      el.textContent =
        driftWords[Math.floor(Math.random() * driftWords.length)];
      asParticleContainer.appendChild(el);
    }
    for (let i = 0; i < 8; i++) createDriftWord();
  }

  const existingThumb = document.getElementById("as-scroll-thumb");
  if (existingThumb) existingThumb.remove();

  // Custom golden scrollbar indicator
  const scrollTrack = document.createElement("div");
  scrollTrack.id = "as-scroll-thumb";
  scrollTrack.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 3px;
    background: linear-gradient(to bottom, rgba(255,200,80,0.6), rgba(255,150,50,0.3));
    border-radius: 2px;
    z-index: 201;
    pointer-events: none;
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.getElementById("album-select-screen").appendChild(scrollTrack);

  const asGrid = document.getElementById("album-select-screen");
  asGrid.addEventListener("scroll", () => {
    const scrollTop = asGrid.scrollTop;
    const scrollHeight = asGrid.scrollHeight - asGrid.clientHeight;
    const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    const thumbHeight = Math.max(
      40,
      (asGrid.clientHeight / asGrid.scrollHeight) * window.innerHeight,
    );
    const thumbTop = scrollPercent * (window.innerHeight - thumbHeight);
    scrollTrack.style.height = thumbHeight + "px";
    scrollTrack.style.top = thumbTop + "px";
    scrollTrack.style.opacity = "1";
    clearTimeout(scrollTrack._hideTimer);
    scrollTrack._hideTimer = setTimeout(() => {
      scrollTrack.style.opacity = "0";
    }, 1200);
  });
}

/* ========================================
 WORLD NAVIGATION
 ======================================== */
let activeAlbumWorld = null;

function enterAlbumWorld(albumKey, sectionId) {
  if (activeAlbumWorld === albumKey || !albums[albumKey] ||
      document.getElementById(sectionId)?.dataset.album !== albumKey) return;
  cinematicTransition(albumKey, "in", () => {
    document.getElementById("album-select-screen").classList.remove("visible");

    const aData = albums[albumKey];
    if (aData && aData.color) {
      document.documentElement.style.setProperty("--album-accent", aData.color);
    }
    const albumBgColors = {
      btd: "#1a0a00",
      "paradise-ep": "#1a1200",
      uv: "#111111",
      honey: "#1a0010",
      lfl: "#001a18",
      nfr: "#1a1a00",
      chemtrails: "#1e1e1e",
      tunnel: "#1a1400",
      heaven: "#141a08",
    };
    document.documentElement.style.setProperty(
      "--album-bg",
      albumBgColors[sectionId] || "#0a0a0a",
    );

    const world = document.getElementById("main-world");
    world.style.opacity = "1";

    // Show only the target section; hide all others + dividers
    document.querySelectorAll(".world-section").forEach((s) => {
      s.style.display = "none";
    });
    document.querySelectorAll(".world-divider").forEach((d) => {
      d.style.display = "none";
    });

    populateWorlds(albumKey);
    const floatId = worldFloatMap[sectionId];

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.style.display = "";

      if (sectionId === "paradise-ep") {
        const dustCanvas = document.getElementById("paradise-dust-canvas");
        if (dustCanvas && !dustCanvas._init) {
          dustCanvas._init = true;
          const dc = dustCanvas.getContext("2d");
          dustCanvas.width = dustCanvas.offsetWidth;
          dustCanvas.height = dustCanvas.offsetHeight;
          const dustParticles = Array.from({ length: 60 }, () => ({
            x: Math.random() * dustCanvas.width,
            y: Math.random() * dustCanvas.height,
            r: Math.random() * 1.5 + 0.3,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -Math.random() * 0.2 - 0.1,
            o: Math.random() * 0.4 + 0.1,
          }));
          function drawDesertDust() {
            if (dustCanvas.offsetParent === null) {
              setTimeout(drawDesertDust, 500);
              return;
            }
            dc.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
            dustParticles.forEach((p) => {
              dc.beginPath();
              dc.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              dc.fillStyle = `rgba(200,160,60,${p.o})`;
              dc.fill();
              p.x += p.vx;
              p.y += p.vy;
              if (p.y < 0) {
                p.y = dustCanvas.height;
                p.x = Math.random() * dustCanvas.width;
              }
              if (p.x < 0 || p.x > dustCanvas.width) p.vx *= -1;
            });
            requestAnimationFrame(drawDesertDust);
          }
          drawDesertDust();
        }
      }

      if (sectionId === "tunnel") {
        const causticCanvas = document.getElementById("ocean-caustic-canvas");
        const bubbleCanvas = document.getElementById("ocean-bubble-canvas");
        if (causticCanvas && !causticCanvas._init) {
          causticCanvas._init = true;
          const cc = causticCanvas.getContext("2d");
          causticCanvas.width = causticCanvas.offsetWidth;
          causticCanvas.height = causticCanvas.offsetHeight;
          let causticTime = 0;
          const causticPoints = Array.from({ length: 12 }, () => ({
            x: Math.random() * causticCanvas.width,
            y: Math.random() * causticCanvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 80 + 40,
          }));
          function drawCaustics() {
            if (causticCanvas.offsetParent === null) {
              setTimeout(drawCaustics, 500);
              return;
            }
            cc.clearRect(0, 0, causticCanvas.width, causticCanvas.height);
            causticTime += 0.008;
            causticPoints.forEach((p) => {
              p.x += p.vx;
              p.y += p.vy;
              if (p.x < 0 || p.x > causticCanvas.width) p.vx *= -1;
              if (p.y < 0 || p.y > causticCanvas.height) p.vy *= -1;
              const grad = cc.createRadialGradient(
                p.x,
                p.y,
                0,
                p.x,
                p.y,
                p.r + Math.sin(causticTime) * 20,
              );
              grad.addColorStop(0, "rgba(100,120,200,0.08)");
              grad.addColorStop(1, "transparent");
              cc.beginPath();
              cc.arc(
                p.x,
                p.y,
                p.r + Math.sin(causticTime) * 20,
                0,
                Math.PI * 2,
              );
              cc.fillStyle = grad;
              cc.fill();
            });
            requestAnimationFrame(drawCaustics);
          }
          drawCaustics();
        }
        if (bubbleCanvas && !bubbleCanvas._init) {
          bubbleCanvas._init = true;
          const bc = bubbleCanvas.getContext("2d");
          bubbleCanvas.width = bubbleCanvas.offsetWidth;
          bubbleCanvas.height = bubbleCanvas.offsetHeight;
          const bubbles = Array.from({ length: 25 }, () => ({
            x: Math.random() * bubbleCanvas.width,
            y: bubbleCanvas.height + Math.random() * 200,
            r: Math.random() * 3 + 1,
            vy: -(Math.random() * 0.4 + 0.2),
            o: Math.random() * 0.3 + 0.1,
          }));
          function drawBubbles() {
            if (bubbleCanvas.offsetParent === null) {
              setTimeout(drawBubbles, 500);
              return;
            }
            bc.clearRect(0, 0, bubbleCanvas.width, bubbleCanvas.height);
            bubbles.forEach((b) => {
              bc.beginPath();
              bc.arc(b.x, b.y, b.r, 0, Math.PI * 2);
              bc.strokeStyle = `rgba(144,144,220,${b.o})`;
              bc.lineWidth = 0.5;
              bc.stroke();
              b.y += b.vy;
              if (b.y < -10) {
                b.y = bubbleCanvas.height + 10;
                b.x = Math.random() * bubbleCanvas.width;
              }
            });
            requestAnimationFrame(drawBubbles);
          }
          drawBubbles();
        }
      }

      if (sectionId === "heaven") {
        const raysCanvas = document.getElementById("heaven-rays-canvas");
        const sparkleCanvas = document.getElementById("heaven-sparkle-canvas");
        if (raysCanvas && !raysCanvas._init) {
          raysCanvas._init = true;
          const rc = raysCanvas.getContext("2d");
          raysCanvas.width = raysCanvas.offsetWidth;
          raysCanvas.height = raysCanvas.offsetHeight;
          const rays = Array.from({ length: 6 }, (_, i) => ({
            angle:
              (i / 6) * Math.PI * 0.5 - Math.PI * 0.25 + Math.random() * 0.2,
            width: Math.random() * 60 + 20,
            speed: (Math.random() - 0.5) * 0.002,
            o: Math.random() * 0.06 + 0.02,
          }));
          let rayTime = 0;
          function drawRays() {
            if (raysCanvas.offsetParent === null) {
              setTimeout(drawRays, 500);
              return;
            }
            rc.clearRect(0, 0, raysCanvas.width, raysCanvas.height);
            rayTime += 0.005;
            rays.forEach((ray) => {
              ray.angle += ray.speed;
              const cx = raysCanvas.width * 0.5;
              const len = raysCanvas.height * 1.5;
              const x1 = cx - Math.cos(ray.angle) * ray.width * 0.5;
              const x2 = cx + Math.cos(ray.angle) * ray.width * 0.5;
              const x3 = cx + Math.sin(ray.angle + 0.5) * len;
              const x4 = cx - Math.sin(ray.angle - 0.5) * len;
              rc.beginPath();
              rc.moveTo(x1, 0);
              rc.lineTo(x2, 0);
              rc.lineTo(x3, raysCanvas.height);
              rc.lineTo(x4, raysCanvas.height);
              rc.closePath();
              const grad = rc.createLinearGradient(
                cx,
                0,
                cx,
                raysCanvas.height,
              );
              grad.addColorStop(
                0,
                `rgba(220,180,80,${ray.o + Math.sin(rayTime) * 0.02})`,
              );
              grad.addColorStop(1, "transparent");
              rc.fillStyle = grad;
              rc.fill();
            });
            requestAnimationFrame(drawRays);
          }
          drawRays();
        }
        if (sparkleCanvas && !sparkleCanvas._init) {
          sparkleCanvas._init = true;
          const sc = sparkleCanvas.getContext("2d");
          sparkleCanvas.width = sparkleCanvas.offsetWidth;
          sparkleCanvas.height = sparkleCanvas.offsetHeight;
          const sparkles = Array.from({ length: 50 }, () => ({
            x: Math.random() * sparkleCanvas.width,
            y: Math.random() * sparkleCanvas.height,
            r: Math.random() * 1.5 + 0.3,
            o: Math.random(),
            speed: Math.random() * 0.02 + 0.005,
            phase: Math.random() * Math.PI * 2,
          }));
          function drawSparkles() {
            if (sparkleCanvas.offsetParent === null) {
              setTimeout(drawSparkles, 500);
              return;
            }
            sc.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
            sparkles.forEach((s) => {
              s.phase += s.speed;
              const alpha = (Math.sin(s.phase) * 0.5 + 0.5) * 0.6;
              sc.beginPath();
              sc.arc(s.x, s.y, s.r, 0, Math.PI * 2);
              sc.fillStyle = `rgba(220,200,120,${alpha})`;
              sc.fill();
            });
            requestAnimationFrame(drawSparkles);
          }
          drawSparkles();
        }
      }
      world.scrollTop = 0;
      const titleEl = targetSection.querySelector(".world-title");
      const subEl = targetSection.querySelector(".world-subtitle");
      const cards = targetSection.querySelectorAll(".vinyl-card");
      if (titleEl)
        gsap.from(titleEl, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: "power2.out",
          delay: 0.2,
        });
      if (subEl)
        gsap.from(subEl, {
          opacity: 0,
          y: 20,
          duration: 1.0,
          ease: "power2.out",
          delay: 0.5,
        });
      if (cards.length)
        gsap.from(cards, {
          opacity: 0,
          y: 60,
          scale: 0.88,
          duration: 0.9,
          stagger: 0.06,
          ease: "back.out(1.1)",
          delay: 0.4,
        });
    }

    // Show back button
    const backBtn = document.getElementById("world-back-btn");
    if (backBtn) backBtn.classList.add("visible");

    // Scope tracklist to this album
    activeAlbumWorld = albumKey;
    if (!currentTrack) {
    trackList = [];
    if (aData) {
      aData.tracks.forEach((song) =>
        trackList.push({ song, album: albumKey, albumData: aData }),
      );
    }
    currentTrackIndex = 0;
    }
  });
}

function backToAlbums() {
  cinematicTransition(activeAlbumWorld, "out", () => {
    document.querySelectorAll(".world-section").forEach((s) => {
      s.style.display = "none";
    });
    const backBtn = document.getElementById("world-back-btn");
    if (backBtn) backBtn.classList.remove("visible");

    document.getElementById("main-world").style.opacity = "0";

    const selectScreen = document.getElementById("album-select-screen");
    selectScreen.classList.add("visible");
    gsap.from("#album-select-screen .as-card", {
            clearProps: "opacity,transform",
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.05,
      ease: "power3.out",
    });

    activeAlbumWorld = null;

    // Preserve the playing queue and its index across archive navigation.
    if (!currentTrack) { trackList = []; currentTrackIndex = 0; }
  });
}

/* ========================================
 CINEMATIC TRANSITIONS
 ======================================== */
function cinematicTransition(albumKey, direction, callback) {
  const overlay = document.getElementById("cinematic-overlay");
  if (!overlay) {
    callback();
    return;
  }
  if (overlay.classList.contains("active")) return;
  overlay.classList.add("active");

  const configs = {
    "Born To Die": {
      el: ".co-bloom",
      inDur: 0.6,
      extra: () =>
        gsap.from(".btd-roses", {
          opacity: 0,
          scale: 0.5,
          duration: 1.5,
          stagger: 0.1,
          ease: "power2.out",
        }),
    },
    Paradise: { el: ".co-bloom", inDur: 0.5 },
    Ultraviolence: { el: ".co-rain", inDur: 0.3 },
    Honeymoon: { el: ".co-sun", inDur: 0.7 },
    "Lust For Life": { el: ".co-cosmic", inDur: 0.5 },
    "Norman Fucking Rockwell": { el: ".co-sunset", inDur: 0.8 },
    "Chemtrails Over The Country Club": { el: ".co-haze", inDur: 0.7 },
    "Did You Know There's A Tunnel Under Ocean Blvd": {
      el: ".co-tunnel",
      inDur: 0.9,
      inExtra: (el) =>
        gsap.fromTo(
          el,
          { scale: 0.3 },
          { scale: 8, opacity: 1, duration: 0.9, ease: "power4.in" },
        ),
    },
    Specials: { el: ".co-sun", inDur: 1.0 },
  };
  const cfg = configs[albumKey] || { el: ".co-bloom", inDur: 0.5 };
  const effectEl = overlay.querySelector(cfg.el);

  if (direction === "in") {
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.25,
      ease: "none",
      onComplete: () => {
        if (cfg.inExtra) {
          cfg.inExtra(effectEl);
        } else {
          gsap.to(effectEl, {
            opacity: 0.9,
            duration: cfg.inDur,
            ease: "power2.in",
          });
        }
        setTimeout(() => {
          try {
            callback();
            if (cfg.extra) cfg.extra();
          } finally {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.7,
            delay: 0.05,
            ease: "power2.out",
            onComplete: () => {
              overlay.classList.remove("active");
              gsap.set(effectEl, { opacity: 0, scale: 1 });
            },
          });
          }
        }, cfg.inDur * 800);
      },
    });
  } else {
    gsap.to(overlay, {
      opacity: 0.85,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        try { callback(); } finally {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
          onComplete: () => overlay.classList.remove("active"),
        });
        }
      },
    });
  }
}

/* ========================================
 GSAP SCROLL ANIMATIONS
 ======================================== */
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // World titles entrance
  gsap.utils.toArray(".world-title").forEach((title) => {
    gsap.from(title, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  // World subtitles
  gsap.utils.toArray(".world-subtitle").forEach((sub) => {
    gsap.from(sub, {
      opacity: 0,
      y: 30,
      duration: 1.2,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sub,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  // Vinyl cards staggered
  gsap.utils.toArray(".vinyl-grid").forEach((grid) => {
    const cards = grid.querySelectorAll(".vinyl-card");
    gsap.from(cards, {
      opacity: 0,
      y: 60,
      scale: 0.85,
      duration: 1,
      stagger: 0.08,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: grid,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });
  });

  // Parallax backgrounds
  gsap.utils.toArray(".world-section").forEach((section) => {
    gsap.to(section.querySelector(".section-atmosphere"), {
      y: -80,
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

/* ========================================
 CLOCK UPDATE
 ======================================== */
function updateClock() {
  const el = document.getElementById("header-time");
  if (el) {
    el.textContent = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

/* ========================================
 LOADING SEQUENCE
 ======================================== */
function runLoadingSequence() {
  const fill = document.getElementById("loading-fill");
  const veil = document.getElementById("loading-veil");
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;
    fill.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        gsap.to(veil, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            veil.style.display = "none";
          },
        });
      }, 400);
    }
  }, 120);
}

/* ========================================
 INIT
 ======================================== */
function init() {
  // The album viewport owns scrolling; reserve its fixed transport's real height.
  const transport = document.getElementById("now-playing");
  const measureTransport = () => {
    document.getElementById("main-world").style.setProperty(
      "--transport-height", transport.getBoundingClientRect().height + "px",
    );
  };
  measureTransport();
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(measureTransport).observe(transport);
  } else {
    window.addEventListener("resize", measureTransport);
  }

  // Time mode
  applyTimeMode();
  setInterval(updateClock, 30000);

  // Initial mood
  applyMoodAtmosphere(currentMood);
  document.querySelectorAll(".mood-tag").forEach((t) => {
    if (t.dataset.mood === currentMood) t.classList.add("active");
    else t.classList.remove("active");
  });

  // Generate intro scene elements
  generateStars();
  generateClouds();
  generateRoadDashes();

  // Populate music worlds is now deferred until enterAlbumWorld

  // Build album selection screen cards
  buildAlbumSelectionScreen();

  // Init rain
  initRain();

  // Init decorations
  initHeavenRoses();
  initBtdRoses();
  initCarnivalLights();

  // Load obsessed song
  const el = document.getElementById("obsessed-song");
  if (el) el.textContent = obsessedSong || "yet to be discovered...";

  // Scroll animations (deferred)
  // enterAlbumWorld owns entrance animations; hidden worlds must not receive
  // competing ScrollTrigger opacity/transform tweens during initialization.

  // Loading sequence
  runLoadingSequence();

  document.getElementById("player-note").addEventListener("input", saveCurrentNote);
  window.addEventListener("pagehide", saveCurrentNote);
  document.getElementById("player-progress-wrap").addEventListener("click", (event) => {
    if (!ytReady || !ytCurrentVideoId) return;
    const duration = ytPlayer.getDuration();
    const rect = event.currentTarget.getBoundingClientRect();
    if (!duration || !rect.width) return;
    const fraction = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    ytPlayer.seekTo(duration * fraction, true);
    updatePlayerProgress(fraction * 100);
  });

  // Escape to close player
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && playerOpen) closePlayer();
  });

  // Prevent context menu
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // Time updater
  applyTimeMode();
  setInterval(applyTimeMode, 60000);

  console.log(
    "%c PARADISE.EXE ",
    "background: linear-gradient(135deg, #ff6b9d, #ffd700); color: #000; font-size: 20px; padding: 10px 20px; font-family: serif; font-style: italic;",
  );
  console.log(
    '%c "I was always an unusual girl..." ',
    "color: rgba(255,200,150,0.8); font-style: italic; font-size: 12px;",
  );
}

// Run after DOM ready
document.addEventListener("DOMContentLoaded", init);
