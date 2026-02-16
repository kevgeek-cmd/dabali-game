// CONFIGURATION
const GRID_SIZE = 8;
const INGREDIENTS = [
    { name: 'Attiéké', emoji: '🍚', id: 'attieke' },
    { name: 'Poisson', emoji: '🐟', id: 'poisson' },
    { name: 'Piment', emoji: '🌶️', id: 'piment' },
    { name: 'Oignon', emoji: '🧅', id: 'oignon' },
    { name: 'Tomate', emoji: '🍅', id: 'tomate' },
    { name: 'Cube Maggi', emoji: '🟨', id: 'maggi', image: 'assets/maggi.png' },
    { name: 'Huile', emoji: '🍾', id: 'huile' }
];

const OBSTACLES = {
    CRATE: { name: 'Caisse', emoji: '📦', id: 'crate', destructible: true, immovable: true },
    FROZEN: { name: 'Bloc glacé', emoji: '🧊', id: 'frozen', destructible: true, immovable: true },
    ROCK: { name: 'Roche', emoji: '🪨', id: 'rock', destructible: false, immovable: true }
};

const STORAGE_KEYS = {
    sound: 'dabali_sound',
    vibration: 'dabali_vibration',
    theme: 'dabali_theme',
    playerName: 'dabali_player_name',
    currentLevel: 'dabali_current_level',
    maxUnlockedLevel: 'dabali_max_unlocked_level',
    bestScores: 'dabali_best_scores',
    bestStars: 'dabali_best_stars',
    freeSuperCombos: 'dabali_free_super_combos'
};

const LEVELS = [
    { id: 1, moves: 20, goals: { attieke: 10, poisson: 10 } },
    { id: 2, moves: 25, goals: { attieke: 10, poisson: 10, piment: 10 } },
    { id: 3, moves: 30, goals: { attieke: 15, poisson: 15, huile: 10 }, obstacles: { count: 3 } },
    { id: 4, moves: 30, goals: { attieke: 15, poisson: 15, piment: 15, tomate: 10 }, obstacles: { count: 5 } },
    { id: 5, moves: 35, goals: { attieke: 20, poisson: 20, piment: 20, oignon: 15, huile: 15 }, obstacles: { count: 6 } },

    { id: 6, moves: 30, goals: { maggi: 15, huile: 15, tomate: 15 }, obstacles: { count: 8 } },
    { id: 7, moves: 30, goals: { attieke: 25, poisson: 25 }, obstacles: { count: 10 } },
    { id: 8, moves: 35, goals: { piment: 30, oignon: 30, maggi: 10 }, obstacles: { count: 12 } },
    { id: 9, moves: 35, goals: { attieke: 20, poisson: 20, huile: 20, tomate: 20 }, obstacles: { count: 10 } },
    { id: 10, moves: 40, goals: { maggi: 25, piment: 25, oignon: 25 }, obstacles: { count: 14 } },

    { id: 11, moves: 30, goals: { attieke: 50 }, obstacles: { count: 15 } },
    { id: 12, moves: 35, goals: { poisson: 30, huile: 30 }, obstacles: { count: 16 } },
    { id: 13, moves: 40, goals: { tomate: 20, oignon: 20, piment: 20, maggi: 20 }, obstacles: { count: 18 } },
    { id: 14, moves: 25, goals: { attieke: 15, poisson: 15 }, obstacles: { count: 20 } },
    { id: 15, moves: 45, goals: { huile: 40, maggi: 40 }, obstacles: { count: 15 } },

    { id: 16, moves: 35, goals: { attieke: 30, poisson: 30, piment: 30 }, obstacles: { count: 20 } },
    { id: 17, moves: 40, goals: { tomate: 50 }, obstacles: { count: 22 } },
    { id: 18, moves: 30, goals: { maggi: 10, huile: 10, piment: 10, oignon: 10, tomate: 10, attieke: 10, poisson: 10 }, obstacles: { count: 10 } },
    { id: 19, moves: 50, goals: { attieke: 40, poisson: 40, huile: 40 }, obstacles: { count: 24 } },
    { id: 20, moves: 60, goals: { attieke: 100, poisson: 100 }, obstacles: { count: 5 } },

    { id: 21, moves: 30, goals: { attieke: 25, poisson: 25, maggi: 15 }, obstacles: { count: 10 } },
    { id: 22, moves: 32, goals: { piment: 30, huile: 20, tomate: 20 }, obstacles: { count: 12 } },
    { id: 23, moves: 34, goals: { attieke: 30, poisson: 20, oignon: 20 }, obstacles: { count: 14 } },
    { id: 24, moves: 36, goals: { tomate: 30, maggi: 20, huile: 20 }, obstacles: { count: 14 } },
    { id: 25, moves: 38, goals: { attieke: 40, poisson: 40, piment: 25 }, obstacles: { count: 16 } },
    { id: 26, moves: 32, goals: { oignon: 30, tomate: 30 }, obstacles: { count: 18 } },
    { id: 27, moves: 35, goals: { attieke: 35, poisson: 35, huile: 25 }, obstacles: { count: 18 } },
    { id: 28, moves: 37, goals: { maggi: 30, piment: 30, oignon: 20 }, obstacles: { count: 20 } },
    { id: 29, moves: 40, goals: { attieke: 45, poisson: 45 }, obstacles: { count: 20 } },
    { id: 30, moves: 42, goals: { huile: 35, maggi: 35, tomate: 30 }, obstacles: { count: 22 } },

    { id: 31, moves: 34, goals: { attieke: 40, poisson: 30, piment: 30 }, obstacles: { count: 22 } },
    { id: 32, moves: 36, goals: { tomate: 35, oignon: 35 }, obstacles: { count: 22 } },
    { id: 33, moves: 38, goals: { maggi: 30, huile: 30, piment: 30 }, obstacles: { count: 24 } },
    { id: 34, moves: 40, goals: { attieke: 50, poisson: 50 }, obstacles: { count: 24 } },
    { id: 35, moves: 42, goals: { attieke: 40, poisson: 40, oignon: 30, tomate: 30 }, obstacles: { count: 26 } },
    { id: 36, moves: 44, goals: { maggi: 40, huile: 40 }, obstacles: { count: 26 } },
    { id: 37, moves: 34, goals: { piment: 45, tomate: 35 }, obstacles: { count: 28 } },
    { id: 38, moves: 36, goals: { attieke: 45, poisson: 45, maggi: 25 }, obstacles: { count: 28 } },
    { id: 39, moves: 38, goals: { huile: 40, oignon: 40 }, obstacles: { count: 30 } },
    { id: 40, moves: 40, goals: { attieke: 60, poisson: 60 }, obstacles: { count: 30 } },

    { id: 41, moves: 36, goals: { attieke: 50, poisson: 50, piment: 40 }, obstacles: { count: 30 } },
    { id: 42, moves: 38, goals: { tomate: 50, oignon: 50 }, obstacles: { count: 30 } },
    { id: 43, moves: 40, goals: { maggi: 45, huile: 45 }, obstacles: { count: 32 } },
    { id: 44, moves: 42, goals: { attieke: 55, poisson: 55, tomate: 40 }, obstacles: { count: 32 } },
    { id: 45, moves: 44, goals: { piment: 50, oignon: 50, maggi: 35 }, obstacles: { count: 34 } },
    { id: 46, moves: 46, goals: { attieke: 60, poisson: 60, huile: 40 }, obstacles: { count: 34 } },
    { id: 47, moves: 38, goals: { tomate: 55, maggi: 45 }, obstacles: { count: 36 } },
    { id: 48, moves: 40, goals: { attieke: 65, poisson: 65 }, obstacles: { count: 36 } },
    { id: 49, moves: 42, goals: { huile: 55, oignon: 55, piment: 45 }, obstacles: { count: 36 } },
    { id: 50, moves: 45, goals: { attieke: 70, poisson: 70, maggi: 50 }, obstacles: { count: 38 } },

    { id: 51, moves: 40, goals: { attieke: 80, poisson: 80 }, obstacles: { count: 38 } },
    { id: 52, moves: 42, goals: { piment: 70, tomate: 70 }, obstacles: { count: 38 } },
    { id: 53, moves: 44, goals: { maggi: 60, huile: 60, oignon: 50 }, obstacles: { count: 40 } },
    { id: 54, moves: 46, goals: { attieke: 75, poisson: 75, piment: 60 }, obstacles: { count: 40 } },
    { id: 55, moves: 48, goals: { tomate: 70, oignon: 70, maggi: 55 }, obstacles: { count: 40 } },
    { id: 56, moves: 50, goals: { attieke: 90, poisson: 90 }, obstacles: { count: 40 } },
    { id: 57, moves: 42, goals: { huile: 65, piment: 65 }, obstacles: { count: 42 } },
    { id: 58, moves: 44, goals: { attieke: 80, poisson: 80, tomate: 60 }, obstacles: { count: 42 } },
    { id: 59, moves: 46, goals: { maggi: 70, oignon: 70 }, obstacles: { count: 42 } },
    { id: 60, moves: 50, goals: { attieke: 100, poisson: 100, huile: 80 }, obstacles: { count: 44 } },

    { id: 61, moves: 42, goals: { attieke: 90, poisson: 90, piment: 70 }, obstacles: { count: 44 } },
    { id: 62, moves: 44, goals: { tomate: 80, oignon: 80, maggi: 60 }, obstacles: { count: 44 } },
    { id: 63, moves: 46, goals: { huile: 75, piment: 75 }, obstacles: { count: 46 } },
    { id: 64, moves: 48, goals: { attieke: 95, poisson: 95, tomate: 70 }, obstacles: { count: 46 } },
    { id: 65, moves: 50, goals: { maggi: 80, huile: 80, oignon: 70 }, obstacles: { count: 46 } },
    { id: 66, moves: 52, goals: { attieke: 110, poisson: 110 }, obstacles: { count: 48 } },
    { id: 67, moves: 44, goals: { piment: 85, tomate: 85 }, obstacles: { count: 48 } },
    { id: 68, moves: 46, goals: { attieke: 100, poisson: 100, maggi: 80 }, obstacles: { count: 48 } },
    { id: 69, moves: 48, goals: { huile: 90, oignon: 90 }, obstacles: { count: 50 } },
    { id: 70, moves: 52, goals: { attieke: 120, poisson: 120, piment: 90 }, obstacles: { count: 50 } },

    { id: 71, moves: 46, goals: { attieke: 110, poisson: 110, tomate: 90 }, obstacles: { count: 50 } },
    { id: 72, moves: 48, goals: { maggi: 90, huile: 90, oignon: 80 }, obstacles: { count: 52 } },
    { id: 73, moves: 50, goals: { attieke: 115, poisson: 115, piment: 95 }, obstacles: { count: 52 } },
    { id: 74, moves: 52, goals: { tomate: 100, oignon: 100, maggi: 85 }, obstacles: { count: 52 } },
    { id: 75, moves: 54, goals: { huile: 100, piment: 100 }, obstacles: { count: 54 } },
    { id: 76, moves: 56, goals: { attieke: 130, poisson: 130 }, obstacles: { count: 54 } },
    { id: 77, moves: 48, goals: { tomate: 110, maggi: 95 }, obstacles: { count: 54 } },
    { id: 78, moves: 50, goals: { attieke: 125, poisson: 125, huile: 100 }, obstacles: { count: 56 } },
    { id: 79, moves: 52, goals: { piment: 110, oignon: 110 }, obstacles: { count: 56 } },
    { id: 80, moves: 56, goals: { attieke: 140, poisson: 140, maggi: 110 }, obstacles: { count: 56 } },

    { id: 81, moves: 50, goals: { attieke: 130, poisson: 130, piment: 110 }, obstacles: { count: 58 } },
    { id: 82, moves: 52, goals: { tomate: 120, oignon: 120, maggi: 100 }, obstacles: { count: 58 } },
    { id: 83, moves: 54, goals: { huile: 110, piment: 120 }, obstacles: { count: 58 } },
    { id: 84, moves: 56, goals: { attieke: 145, poisson: 145, tomate: 120 }, obstacles: { count: 60 } },
    { id: 85, moves: 58, goals: { maggi: 120, huile: 120, oignon: 110 }, obstacles: { count: 60 } },
    { id: 86, moves: 60, goals: { attieke: 150, poisson: 150, piment: 130 }, obstacles: { count: 60 } },
    { id: 87, moves: 52, goals: { tomate: 130, maggi: 115 }, obstacles: { count: 62 } },
    { id: 88, moves: 54, goals: { attieke: 155, poisson: 155, huile: 130 }, obstacles: { count: 62 } },
    { id: 89, moves: 56, goals: { piment: 135, oignon: 130 }, obstacles: { count: 62 } },
    { id: 90, moves: 60, goals: { attieke: 160, poisson: 160, maggi: 130 }, obstacles: { count: 64 } },

    { id: 91, moves: 55, goals: { attieke: 160, poisson: 160, piment: 140 }, obstacles: { count: 64 } },
    { id: 92, moves: 57, goals: { tomate: 140, oignon: 140, maggi: 130 }, obstacles: { count: 64 } },
    { id: 93, moves: 59, goals: { huile: 130, piment: 145 }, obstacles: { count: 66 } },
    { id: 94, moves: 61, goals: { attieke: 170, poisson: 170, tomate: 140 }, obstacles: { count: 66 } },
    { id: 95, moves: 63, goals: { maggi: 140, huile: 140, oignon: 135 }, obstacles: { count: 66 } },
    { id: 96, moves: 65, goals: { attieke: 180, poisson: 180, piment: 150 }, obstacles: { count: 68 } },
    { id: 97, moves: 60, goals: { tomate: 150, maggi: 140 }, obstacles: { count: 68 } },
    { id: 98, moves: 62, goals: { attieke: 190, poisson: 190, huile: 150 }, obstacles: { count: 68 } },
    { id: 99, moves: 64, goals: { piment: 160, oignon: 150 }, obstacles: { count: 70 } },
    { id: 100, moves: 70, goals: { attieke: 200, poisson: 200, maggi: 160, huile: 160 }, obstacles: { count: 70 } }
];

const RECIPES = [
    ['attieke', 'poisson', 'piment'],
    ['maggi', 'huile', 'piment']
];

const PROMO_CODES = {
    'GARBA2025': { type: 'unlock_level', level: 30, message: 'Tu as débloqué les niveaux jusqu\'au 30.' },
    'DABALI50': { type: 'unlock_level', level: 50, message: 'Tu as débloqué les niveaux jusqu\'au 50.' },
    'SUPERDABALI': { type: 'free_super', count: 3, message: 'Tu as gagné 3 super combos.' }
};

function getLevelGroupName(levelId) {
    if (levelId <= 10) return "Garba du quartier";
    if (levelId <= 20) return "Dabali de Yopougon";
    if (levelId <= 40) return "Dabali de Cocody";
    if (levelId <= 60) return "Dabali de Treichville";
    if (levelId <= 80) return "Dabali du marché";
    return "Dabali de Côte d'Ivoire";
}

// STATE
let grid = [];
let score = 0;
let moves = 20;
let level = 1;
let currentGoals = {};
let goalProgress = {};
let selectedTile = null;
let isProcessing = false;
let playerName = "Joueur";
let isSoundOn = true;
let isVibrationOn = true;
let freeSuperCombos = 0;

let timerInterval = null;
let timeRemaining = 90; // 1m30s
let isPaused = false;
let hintTimeout = null;
let currentHint = null;

// SOUND SYSTEM
const AudioContext = window.AudioContext || window.webkitAudioContext;
const soundCtx = new AudioContext();

const soundManager = {
    playTone: (freq, type, duration) => {
        if (!isSoundOn) return;
        if (soundCtx.state === 'suspended') soundCtx.resume();
        const osc = soundCtx.createOscillator();
        const gain = soundCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, soundCtx.currentTime);
        gain.gain.setValueAtTime(0.1, soundCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, soundCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(soundCtx.destination);
        osc.start();
        osc.stop(soundCtx.currentTime + duration);
    },
    playClick: () => soundManager.playTone(400, 'sine', 0.1),
    playMatch: () => {
        soundManager.playTone(600, 'sine', 0.1);
        setTimeout(() => soundManager.playTone(800, 'sine', 0.2), 100);
    },
    playBonDabali: () => {
        soundManager.playTone(400, 'square', 0.1);
        setTimeout(() => soundManager.playTone(600, 'square', 0.1), 100);
        setTimeout(() => soundManager.playTone(800, 'square', 0.1), 200);
        setTimeout(() => soundManager.playTone(1000, 'square', 0.4), 300);
    },
    playWin: () => {
        [300, 400, 500, 600, 800].forEach((f, i) => setTimeout(() => soundManager.playTone(f, 'triangle', 0.2), i * 100));
    }
};

function vibrate(pattern) {
    if (!isVibrationOn) return;
    if (navigator.vibrate) navigator.vibrate(pattern);
}

function updateFreeSuperDisplay() {
    const badge = document.getElementById('free-super-badge');
    if (!badge) return;
    badge.innerText = String(freeSuperCombos);
    badge.style.display = freeSuperCombos > 0 ? 'inline-flex' : 'none';
}

function redeemPromoCode() {
    if (!promoCodeInput || !promoMessageEl) return;
    const raw = promoCodeInput.value.trim().toUpperCase();
    if (!raw) {
        promoMessageEl.innerText = 'Code invalide.';
        return;
    }
    const config = PROMO_CODES[raw];
    if (!config) {
        promoMessageEl.innerText = 'Code inconnu.';
        return;
    }
    if (config.type === 'unlock_level') {
        const current = parseInt(localStorage.getItem(STORAGE_KEYS.maxUnlockedLevel), 10);
        const maxUnlocked = Number.isFinite(current) ? current : 1;
        const target = config.level;
        if (target > maxUnlocked) {
            localStorage.setItem(STORAGE_KEYS.maxUnlockedLevel, String(target));
        }
    }
    if (config.type === 'free_super') {
        freeSuperCombos += config.count;
        localStorage.setItem(STORAGE_KEYS.freeSuperCombos, String(freeSuperCombos));
        updateFreeSuperDisplay();
    }
    promoMessageEl.innerText = config.message;
}

function shouldShowAdAfterLevel(completedLevel, previousMax, newMax) {
    if (newMax <= previousMax) return false;
    if (completedLevel <= 0) return false;
    return completedLevel % 3 === 0;
}

function showAdForLevel(completedLevel) {
    if (!adModalOverlay || !adPartnerNameEl || !adCodeHintEl || !adCountdownEl || !adContinueBtn) {
        nextLevel();
        return;
    }
    const fakeAds = [
        { partner: 'Garba Palace', code: 'GARBA2025', text: 'Code GARBA2025 pour débloquer des niveaux.' },
        { partner: 'Dabali Street', code: 'DABALI50', text: 'Code DABALI50 pour avancer plus vite.' },
        { partner: 'Super Sauce Piment', code: 'SUPERDABALI', text: 'Code SUPERDABALI pour des super combos.' }
    ];
    const ad = fakeAds[Math.floor(Math.random() * fakeAds.length)];
    adPartnerNameEl.innerText = `${ad.partner}`;
    adCodeHintEl.innerText = `Retient bien le code : ${ad.code}`;
    let remaining = 10;
    adCountdownEl.innerText = String(remaining);
    adContinueBtn.disabled = true;
    adModalOverlay.classList.remove('hidden');
    adModalOverlay.style.display = 'flex';
    const interval = setInterval(() => {
        remaining -= 1;
        adCountdownEl.innerText = String(remaining);
        if (remaining <= 0) {
            clearInterval(interval);
            adContinueBtn.disabled = false;
        }
    }, 1000);
    adContinueBtn.onclick = () => {
        adModalOverlay.classList.add('hidden');
        adModalOverlay.style.display = 'none';
        nextLevel();
    };
}

// DOM Elements
const gridEl = document.getElementById('grid');
const scoreEl = document.getElementById('score-display');
const movesEl = document.getElementById('moves-display');
const comboMsg = document.getElementById('combo-message');
const modalOverlay = document.getElementById('modal-overlay');
const modalBtn = document.getElementById('modal-btn');
const footerGoalsEl = document.getElementById('footer-goals');
const timerEl = document.getElementById('timer-display');
const nameModalOverlay = document.getElementById('name-modal-overlay');
const playerNameInput = document.getElementById('player-name-input');
const startGameBtn = document.getElementById('start-game-btn');
const tutorialOverlay = document.getElementById('tutorial-overlay');
const tutorialOkBtn = document.getElementById('tutorial-ok-btn');
const levelGroupEl = document.getElementById('level-group-display');
const promoModalOverlay = document.getElementById('promo-modal-overlay');
const promoCodeInput = document.getElementById('promo-code-input');
const promoSubmitBtn = document.getElementById('promo-submit-btn');
const promoMessageEl = document.getElementById('promo-message');
const adModalOverlay = document.getElementById('ad-modal-overlay');
const adPartnerNameEl = document.getElementById('ad-partner-name');
const adCodeHintEl = document.getElementById('ad-code-hint');
const adCountdownEl = document.getElementById('ad-countdown');
const adContinueBtn = document.getElementById('ad-continue-btn');
const levelSelectOverlay = document.getElementById('level-select-overlay');
const levelGridEl = document.getElementById('level-grid');
const levelSelectCloseBtn = document.getElementById('level-select-close');
// Menu Elements
const btnMenu = document.getElementById('menu-btn');
const drawerMenu = document.getElementById('drawer-menu');
const drawerOverlay = document.getElementById('drawer-overlay');
const closeDrawerBtn = document.getElementById('close-drawer');
const openLevelMapBtn = document.getElementById('open-level-map');
const promoCodeBtn = document.getElementById('promo-code-btn');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const soundToggle = document.getElementById('sound-toggle');
const vibrationToggle = document.getElementById('vibration-toggle');
// Splash
const splashScreen = document.getElementById('splash-screen');
const startBtn = document.getElementById('start-btn');
const progress = document.querySelector('.progress');

// INIT
function initGame() {
    // Splash Logic
    if (progress) {
        setTimeout(() => {
            progress.style.width = '100%';
        }, 100);
    }

    if (startBtn) {
        setTimeout(() => {
            startBtn.classList.remove('hidden');
        }, 2000);

        startBtn.addEventListener('click', () => {
            if (splashScreen) {
                splashScreen.style.opacity = '0';
                setTimeout(() => {
                    splashScreen.classList.add('hidden');
                    // Show Name Modal after Splash
                    if (nameModalOverlay) {
                        nameModalOverlay.classList.remove('hidden');
                        nameModalOverlay.style.display = 'flex'; // Ensure flex for centering
                        if (playerNameInput) playerNameInput.focus();
                    }
                }, 500);
            }
        });
    }

    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    const savedSound = localStorage.getItem(STORAGE_KEYS.sound);
    if (savedSound) {
        isSoundOn = savedSound === 'on';
        if (soundToggle) soundToggle.checked = isSoundOn;
    }

    const savedVibration = localStorage.getItem(STORAGE_KEYS.vibration);
    if (savedVibration) {
        isVibrationOn = savedVibration === 'on';
        if (vibrationToggle) vibrationToggle.checked = isVibrationOn;
    }

    const savedName = localStorage.getItem(STORAGE_KEYS.playerName);
    if (savedName) {
        playerName = savedName;
        if (playerNameInput) playerNameInput.value = savedName;
    }

    // Name Modal Logic
    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            const name = playerNameInput ? playerNameInput.value.trim() : '';
            if (name) {
                playerName = name;
                localStorage.setItem(STORAGE_KEYS.playerName, playerName);
            }
            if (nameModalOverlay) {
                nameModalOverlay.classList.add('hidden');
                nameModalOverlay.style.display = 'none';
            }
            soundManager.playWin(); // Welcome sound
            const savedLevel = parseInt(localStorage.getItem(STORAGE_KEYS.currentLevel), 10);
            const initialLevel = Number.isFinite(savedLevel) && savedLevel >= 1 ? savedLevel : 1;
            level = initialLevel;
            const maxUnlockedRaw = parseInt(localStorage.getItem(STORAGE_KEYS.maxUnlockedLevel), 10);
            const maxUnlocked = Number.isFinite(maxUnlockedRaw) ? maxUnlockedRaw : 1;
            if (maxUnlocked <= 1 && level === 1 && tutorialOverlay) {
                tutorialOverlay.classList.remove('hidden');
                tutorialOverlay.style.display = 'flex';
            } else {
                openLevelSelect();
            }
        });
    }

    // Menu Logic
    if (btnMenu) btnMenu.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
    if (openLevelMapBtn) {
        openLevelMapBtn.addEventListener('click', () => {
            closeDrawer();
            openLevelSelect();
        });
    }
    
    // Dark Mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem(
                STORAGE_KEYS.theme,
                document.body.classList.contains('dark-mode') ? 'dark' : 'light'
            );
        });
    }

    if (soundToggle) {
        soundToggle.addEventListener('change', () => {
            isSoundOn = soundToggle.checked;
            localStorage.setItem(STORAGE_KEYS.sound, isSoundOn ? 'on' : 'off');
        });
    }

    if (vibrationToggle) {
        vibrationToggle.addEventListener('change', () => {
            isVibrationOn = vibrationToggle.checked;
            localStorage.setItem(STORAGE_KEYS.vibration, isVibrationOn ? 'on' : 'off');
        });
    }

    const savedFreeSuper = parseInt(localStorage.getItem(STORAGE_KEYS.freeSuperCombos), 10);
    if (Number.isFinite(savedFreeSuper) && savedFreeSuper > 0) {
        freeSuperCombos = savedFreeSuper;
    }

    if (modalBtn) {
        // Remove existing listeners to avoid duplicates if initGame is called multiple times
        // actually initGame is window.onload so it's fine.
        // We do NOT add a default listener here anymore.
    }
    // startLevel(1) is called after name input
    
    const pauseBtn = document.getElementById('pause-btn');
    if (pauseBtn) pauseBtn.addEventListener('click', togglePause);

    const quitBtn = document.getElementById('quit-btn');
    if (quitBtn) quitBtn.addEventListener('click', quitGame);

    if (promoCodeBtn && promoModalOverlay && promoCodeInput && promoSubmitBtn) {
        promoCodeBtn.addEventListener('click', () => {
            promoMessageEl.innerText = '';
            promoCodeInput.value = '';
            promoModalOverlay.classList.remove('hidden');
            promoModalOverlay.style.display = 'flex';
            promoCodeInput.focus();
        });
        promoSubmitBtn.addEventListener('click', () => {
            redeemPromoCode();
        });
        promoCodeInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                redeemPromoCode();
            }
        });
    }

    if (levelSelectCloseBtn) {
        levelSelectCloseBtn.addEventListener('click', () => {
            if (levelSelectOverlay) levelSelectOverlay.classList.add('hidden');
        });
    }

    if (tutorialOkBtn) {
        tutorialOkBtn.addEventListener('click', () => {
            if (tutorialOverlay) {
                tutorialOverlay.classList.add('hidden');
                tutorialOverlay.style.display = 'none';
            }
            openLevelSelect();
        });
    }
}

function openLevelSelect() {
    if (!levelGridEl || !levelSelectOverlay) return;
    levelGridEl.innerHTML = '';
    const maxUnlockedRaw = parseInt(localStorage.getItem(STORAGE_KEYS.maxUnlockedLevel), 10);
    const maxUnlocked = Number.isFinite(maxUnlockedRaw) ? maxUnlockedRaw : 1;
    const rawStars = localStorage.getItem(STORAGE_KEYS.bestStars);
    const starsMap = rawStars ? JSON.parse(rawStars) : {};
    LEVELS.forEach(cfg => {
        const btn = document.createElement('button');
        btn.className = 'level-button';
        const stars = starsMap[String(cfg.id)] || 0;
        btn.innerText = stars > 0 ? `${cfg.id} (${stars}⭐)` : String(cfg.id);
        btn.title = getLevelGroupName(cfg.id);
        if (cfg.id > maxUnlocked) {
            btn.disabled = true;
            btn.classList.add('locked');
        } else {
            btn.addEventListener('click', () => {
                levelSelectOverlay.classList.add('hidden');
                startLevel(cfg.id);
            });
        }
        if (cfg.id === level) btn.classList.add('current');
        levelGridEl.appendChild(btn);
    });
    levelSelectOverlay.classList.remove('hidden');
}

function openDrawer() {
    drawerMenu.classList.add('open');
    drawerOverlay.classList.remove('hidden');
}

function closeDrawer() {
    drawerMenu.classList.remove('open');
    drawerOverlay.classList.add('hidden');
}

function togglePause() {
    isPaused = !isPaused;
    const pauseBtn = document.getElementById('pause-btn');
    
    if (isPaused) {
        clearInterval(timerInterval);
        isProcessing = true; // Block game
        if (pauseBtn) pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        // Show Overlay
        const overlay = document.createElement('div');
        overlay.id = 'pause-overlay';
        overlay.innerHTML = `
            <div>PAUSE</div>
            <div style="font-size:1rem; margin:20px 0">Touche le bouton Play pour reprendre</div>
            <button id="resume-btn" class="modal-btn" style="background:#FFD700; color:#8B4513; margin-top:20px;">
                <i class="fas fa-play"></i> Reprendre
            </button>
        `;
        document.body.appendChild(overlay);

        document.getElementById('resume-btn').addEventListener('click', togglePause);
    } else {
        startTimer();
        isProcessing = false;
        if (pauseBtn) pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        const overlay = document.getElementById('pause-overlay');
        if (overlay) overlay.remove();
    }
}

function quitGame() {
    if (confirm("Veux-tu vraiment quitter la partie ?")) {
        window.location.reload();
    }
}

function startLevel(lvl) {
    // Loop back to level 1 if max reached (or handle end game)
    const levelConfig = LEVELS.find(l => l.id === lvl) || LEVELS[0]; 
    level = levelConfig.id;
    localStorage.setItem(STORAGE_KEYS.currentLevel, String(level));
    score = 0;
    moves = levelConfig.moves;
    isProcessing = false; // Reset processing flag
    isPaused = false; // Reset pause flag
    
    // Timer Init
    clearInterval(timerInterval);
    timeRemaining = 90; // 90 seconds
    startTimer();

    // Init Goals
    currentGoals = { ...levelConfig.goals };
    goalProgress = {};
    for (let k in currentGoals) goalProgress[k] = 0;

    updateUI();
    renderGoals(); // Initial Render
    modalOverlay.classList.add('hidden');
    
    // Create Grid
    createGrid(levelConfig.obstacles ? levelConfig.obstacles.count : 0);
    resetHintTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    updateTimerUI();
    timerInterval = setInterval(() => {
        if (isPaused) return;
        timeRemaining--;
        updateTimerUI();
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            handleGameOver();
        }
    }, 1000);
}

function resetHintTimer() {
    clearTimeout(hintTimeout);
    clearHints();
    
    if (moves > 0 && !isPaused && !isProcessing) {
        hintTimeout = setTimeout(showHint, 10000);
    }
}

function clearHints() {
    if (currentHint) {
        currentHint.forEach(el => el.classList.remove('hint-anim'));
        currentHint = null;
    }
}

async function showHint() {
    // Brute force find a move
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            // Check Right
            if (c < GRID_SIZE - 1) {
                if (await checkSwapForMatch(r, c, r, c + 1)) {
                    applyHint(r, c, r, c + 1);
                    return;
                }
            }
            // Check Down
            if (r < GRID_SIZE - 1) {
                if (await checkSwapForMatch(r, c, r + 1, c)) {
                    applyHint(r, c, r + 1, c);
                    return;
                }
            }
        }
    }
    handleNoMovesAvailable();
}

async function checkSwapForMatch(r1, c1, r2, c2) {
    // Virtual swap
    const t1 = grid[r1][c1];
    const t2 = grid[r2][c2];
    
    if (isObstacleId(t1.type.id) || isObstacleId(t2.type.id)) return false;

    // Swap types temporarily
    const temp = t1.type;
    t1.type = t2.type;
    t2.type = temp;
    
    // Check local matches (simplified)
    const hasMatch = checkMatchAt(r1, c1) || checkMatchAt(r2, c2);
    
    // Swap back
    t2.type = t1.type;
    t1.type = temp;
    
    return hasMatch;
}

function checkMatchAt(r, c) {
    const typeId = grid[r][c].type.id;
    
    // Horiz
    let hCount = 1;
    let i = c - 1; while(i>=0 && grid[r][i].type.id === typeId) { hCount++; i--; }
    i = c + 1; while(i<GRID_SIZE && grid[r][i].type.id === typeId) { hCount++; i++; }
    if (hCount >= 3) return true;
    
    // Vert
    let vCount = 1;
    i = r - 1; while(i>=0 && grid[i][c].type.id === typeId) { vCount++; i--; }
    i = r + 1; while(i<GRID_SIZE && grid[i][c].type.id === typeId) { vCount++; i++; }
    if (vCount >= 3) return true;
    
    // Check Recipe (Simplified - just check if it's part of a 3-set that matches recipe ingredients)
    // This is complex to check virtually without full findMatches logic.
    // For hints, finding standard matches is usually enough.
    
    return false;
}

function applyHint(r1, c1, r2, c2) {
    const el1 = grid[r1][c1].el;
    const el2 = grid[r2][c2].el;
    el1.classList.add('hint-anim');
    el2.classList.add('hint-anim');
    currentHint = [el1, el2];
}

function updateTimerUI() {
    if (!timerEl) return;
    const m = Math.floor(timeRemaining / 60);
    const s = timeRemaining % 60;
    timerEl.innerText = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
    
    if (timeRemaining < 10) {
        timerEl.parentElement.style.backgroundColor = 'red';
        timerEl.parentElement.style.animation = 'pulse 0.5s infinite';
    } else {
        timerEl.parentElement.style.backgroundColor = 'black';
        timerEl.parentElement.style.animation = '';
    }
}

function handleGameOver() {
    isProcessing = true; // Block inputs
    setTimeout(() => {
        vibrate([200, 100, 200]);
        document.getElementById('modal-title').innerText = "YAKO !";
        document.getElementById('modal-message').innerHTML = `<b>${playerName}</b>, le temps est écoulé !<br>Score : ${score}`;
        document.getElementById('modal-btn').innerText = "Recommencer";
        
        modalBtn.onclick = () => {
            startLevel(level);
        };
        modalOverlay.classList.remove('hidden');
    }, 500);
}

function handleNoMovesAvailable() {
    if (isProcessing || isPaused) return;
    vibrate([100, 80, 100]);
    const msg = document.createElement('div');
    msg.id = 'nomove-msg';
    msg.innerHTML = `${playerName}, y'a plus de coups là...<br><strong>On mélange le Dabali !</strong>`;
    msg.style.position = 'fixed';
    msg.style.top = '50%';
    msg.style.left = '50%';
    msg.style.transform = 'translate(-50%, -50%)';
    msg.style.background = 'rgba(0,0,0,0.8)';
    msg.style.color = 'white';
    msg.style.padding = '15px 20px';
    msg.style.borderRadius = '15px';
    msg.style.zIndex = '2200';
    msg.style.textAlign = 'center';
    document.body.appendChild(msg);
    reshuffleGrid();
    setTimeout(() => {
        if (msg.parentNode) msg.parentNode.removeChild(msg);
        resetHintTimer();
    }, 1500);
}

function reshuffleGrid() {
    const types = [];
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const tile = grid[r][c];
            if (!isObstacleId(tile.type.id)) {
                types.push(tile.type);
            }
        }
    }
    for (let i = types.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = types[i];
        types[i] = types[j];
        types[j] = tmp;
    }
    let index = 0;
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const tile = grid[r][c];
            if (!isObstacleId(tile.type.id)) {
                tile.type = types[index++];
                renderTileContent(tile.el, tile.type);
            }
        }
    }
}

function createGrid(obstacleCount = 0) {
    gridEl.innerHTML = '';
    grid = [];
    
    // 1. Fill with random ingredients ensuring no matches
    for (let r = 0; r < GRID_SIZE; r++) {
        let row = [];
        for (let c = 0; c < GRID_SIZE; c++) {
            let tile;
            let attempts = 0;
            do {
                tile = createRandomTile(r, c);
                attempts++;
            } while (causesMatch(r, c, tile.type.id, row) && attempts < 50);
            
            row.push(tile);
            gridEl.appendChild(tile.el);
        }
        grid.push(row);
    }

    // 2. Place Obstacles
    let placed = 0;
    while (placed < obstacleCount) {
        const r = Math.floor(Math.random() * GRID_SIZE);
        const c = Math.floor(Math.random() * GRID_SIZE);
        if (!isObstacleId(grid[r][c].type.id)) {
            const obstacleType = getRandomObstacleForLevel(level);
            grid[r][c].type = obstacleType;
            renderTileContent(grid[r][c].el, grid[r][c].type);
            grid[r][c].el.classList.add('obstacle');
            placed++;
        }
    }
    
    // Resolve initial matches without score
    // REMOVED to prevent initial scoring
    // setTimeout(resolveMatchesLoop, 100);
}

function renderGoals() {
    footerGoalsEl.innerHTML = '';
    for (let id in currentGoals) {
        const target = currentGoals[id];
        const current = goalProgress[id];
        const ing = INGREDIENTS.find(i => i.id === id);
        
        if (!ing) continue;

        const el = document.createElement('div');
        el.className = 'goal-item';
        el.id = `goal-item-${id}`;
        
        const iconContent = ing.image ? 
            `<img src="${ing.image}" style="width:30px; height:30px; object-fit:contain;">` : 
            ing.emoji;

        el.innerHTML = `
            <div class="goal-icon">${iconContent}</div>
            <div class="goal-count" id="goal-count-${id}">${current}/${target}</div>
        `;
        
        // Initial check
        if (current >= target) {
            el.classList.add('completed');
        }
        
        footerGoalsEl.appendChild(el);
    }
}

function createRandomTile(r, c) {
    const type = INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)];
    const el = document.createElement('div');
    el.className = 'tile';
    renderTileContent(el, type);
    el.dataset.r = r;
    el.dataset.c = c;
    
    // Events
    el.addEventListener('mousedown', handleInputStart);
    el.addEventListener('touchstart', handleInputStart, {passive: false});
    
    return { r, c, type, el };
}

function renderTileContent(el, type) {
    el.classList.remove(
        'tile-attieke',
        'tile-poisson',
        'tile-piment',
        'tile-oignon',
        'tile-tomate',
        'tile-maggi',
        'tile-huile'
    );
    if (type.image) {
        el.innerHTML = `<img src="${type.image}" alt="${type.name}" style="width:80%; height:80%; object-fit:contain; pointer-events:none;">`;
        el.style.fontSize = '';
    } else {
        el.innerText = type.emoji;
        el.innerHTML = type.emoji; // Use innerHTML to be safe
        el.style.fontSize = '';
    }
    if (type.id) {
        el.classList.add(`tile-${type.id}`);
    }
}

// INPUT HANDLING (Swipe & Click)
let touchStartX = 0;
let touchStartY = 0;
let activeTile = null;

function handleInputStart(e) {
    if (isProcessing || moves <= 0 || isPaused) return; // Added isPaused check
    
    resetHintTimer(); // Reset hint timer on interaction
    
    // Sound
    soundManager.playClick();

    if (e.type === 'touchstart') {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        const tile = getTileFromEl(e.target);
        if (!tile || isImmovable(tile)) return;
        activeTile = tile;
    } else {
        // Mouse click selection
        const tile = getTileFromEl(e.target);
        if (!tile || isImmovable(tile)) return;
        if (selectedTile) {
            // Second click -> Try swap
            attemptSwap(selectedTile, tile);
            selectedTile.el.classList.remove('selected');
            selectedTile = null;
        } else {
            // First click -> Select
            selectedTile = tile;
            tile.el.classList.add('selected');
        }
    }
}

// Add global listeners for swipe end
document.addEventListener('touchend', handleTouchEnd);

function handleTouchEnd(e) {
    if (!activeTile || isProcessing) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    
    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal
        if (Math.abs(dx) > 30) { // Threshold
            const targetC = activeTile.c + (dx > 0 ? 1 : -1);
            if (targetC >= 0 && targetC < GRID_SIZE) {
                attemptSwap(activeTile, grid[activeTile.r][targetC]);
            }
        }
    } else {
        // Vertical
        if (Math.abs(dy) > 30) {
            const targetR = activeTile.r + (dy > 0 ? 1 : -1);
            if (targetR >= 0 && targetR < GRID_SIZE) {
                attemptSwap(activeTile, grid[targetR][activeTile.c]);
            }
        }
    }
    activeTile = null;
}

function getTileFromEl(el) {
    const r = parseInt(el.dataset.r);
    const c = parseInt(el.dataset.c);
    if (grid[r] && grid[r][c]) return grid[r][c];
    return null;
}

async function attemptSwap(tile1, tile2) {
    if (tile1 === tile2) return;
    if (!tile1 || !tile2) return;
    if (isImmovable(tile1) || isImmovable(tile2)) {
        if (selectedTile) {
            selectedTile.el.classList.remove('selected');
            selectedTile = null;
        }
        return;
    }
    
    // Check adjacency
    const isAdjacent = Math.abs(tile1.r - tile2.r) + Math.abs(tile1.c - tile2.c) === 1;
    if (!isAdjacent) {
        // Reset selection if clicked far away
        if (selectedTile) {
            selectedTile.el.classList.remove('selected');
            selectedTile = tile2;
            tile2.el.classList.add('selected');
        }
        return;
    }
    
    isProcessing = true;
    
    // Visual Swap
    await swapTilesVisual(tile1, tile2);
    
    // Logic Swap
    swapTilesData(tile1, tile2);
    
    // Check Matches
    const matches = findMatches();
    
    if (matches.length > 0) {
        // Valid move
        moves--;
        updateUI();
        await processMatches(matches);
    } else {
        // Invalid -> Swap back
        await swapTilesVisual(tile1, tile2);
        swapTilesData(tile1, tile2);
        isProcessing = false;
    }
}

function swapTilesData(t1, t2) {
    // Swap types
    const tempType = t1.type;
    t1.type = t2.type;
    t2.type = tempType;
    
    // Update visuals
    renderTileContent(t1.el, t1.type);
    renderTileContent(t2.el, t2.type);
}

function swapTilesVisual(t1, t2) {
    return new Promise(resolve => {
        const x1 = t1.el.offsetLeft;
        const y1 = t1.el.offsetTop;
        const x2 = t2.el.offsetLeft;
        const y2 = t2.el.offsetTop;

        const dx = x2 - x1;
        const dy = y2 - y1;

        t1.el.style.transform = `translate(${dx}px, ${dy}px)`;
        t2.el.style.transform = `translate(${-dx}px, ${-dy}px)`;

        setTimeout(() => {
            t1.el.style.transform = '';
            t2.el.style.transform = '';
            resolve();
        }, 200);
    });
}

function triggerSuperCombo() {
    const msg = document.createElement('div');
    msg.id = 'super-combo-msg';
    msg.innerHTML = "Y'a jahin moument<br>tu es Fort(e) même tchié !<br><span>+1 min</span>";
    document.body.appendChild(msg);
    
    timeRemaining += 60;
    updateTimerUI();
    vibrate([100, 50, 100, 50, 200]);
    
    // Force restart timer if not paused to ensure it continues
    if (!isPaused) {
        startTimer();
    }
    
    setTimeout(() => {
        if (msg.parentNode) msg.parentNode.removeChild(msg);
    }, 3000);
}

function findMatches() {
    let matches = new Set();
    let superComboTriggered = false;

    const applyExplosionAroundRun = (run) => {
        run.forEach(t => {
            const positions = [
                { r: t.r - 1, c: t.c },
                { r: t.r + 1, c: t.c },
                { r: t.r, c: t.c - 1 },
                { r: t.r, c: t.c + 1 }
            ];
            positions.forEach(pos => {
                if (pos.r >= 0 && pos.r < GRID_SIZE && pos.c >= 0 && pos.c < GRID_SIZE) {
                    matches.add(grid[pos.r][pos.c]);
                }
            });
        });
    };

    const applyLineClear = (run, orientation, cross = false) => {
        if (run.length === 0) return;
        const center = run[Math.floor(run.length / 2)];
        if (orientation === 'row' || cross) {
            for (let c = 0; c < GRID_SIZE; c++) {
                matches.add(grid[center.r][c]);
            }
        }
        if (orientation === 'col' || cross) {
            for (let r = 0; r < GRID_SIZE; r++) {
                matches.add(grid[r][center.c]);
            }
        }
    };

    const checkRun = (run, orientation) => {
        if (run.length >= 3) {
            run.forEach(t => matches.add(t));
            if (run.length === 3 && freeSuperCombos > 0 && !superComboTriggered) {
                freeSuperCombos -= 1;
                localStorage.setItem(STORAGE_KEYS.freeSuperCombos, String(freeSuperCombos));
                triggerSuperCombo();
                superComboTriggered = true;
                applyLineClear(run, orientation, false);
                return;
            }
            if (run.length >= 4 && !superComboTriggered) {
                triggerSuperCombo();
                superComboTriggered = true; 
            }
            if (run.length === 4) {
                applyLineClear(run, orientation, false);
            }
            if (run.length >= 5) {
                applyExplosionAroundRun(run);
                applyLineClear(run, orientation, true);
            }
        }
    };
    
    // 1. Standard Match-3 (Identical) with Run-Length Check
    // Horizontal
    for (let r = 0; r < GRID_SIZE; r++) {
        let run = [];
        for (let c = 0; c < GRID_SIZE; c++) {
            const t = grid[r][c];
            if (isObstacleId(t.type.id)) {
                checkRun(run, 'row'); run = []; continue;
            }
            if (run.length === 0 || run[run.length-1].type.id === t.type.id) {
                run.push(t);
            } else {
                checkRun(run, 'row'); run = [t];
            }
        }
        checkRun(run, 'row');
    }

    // Vertical
    for (let c = 0; c < GRID_SIZE; c++) {
        let run = [];
        for (let r = 0; r < GRID_SIZE; r++) {
            const t = grid[r][c];
            if (isObstacleId(t.type.id)) {
                checkRun(run, 'col'); run = []; continue;
            }
            if (run.length === 0 || run[run.length-1].type.id === t.type.id) {
                run.push(t);
            } else {
                checkRun(run, 'col'); run = [t];
            }
        }
        checkRun(run, 'col');
    }
    
    // 2. Special Recipe Matches (Heterogeneous)
    // Horizontal
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE - 2; c++) {
            const tilesToCheck = [grid[r][c], grid[r][c+1], grid[r][c+2]];
            if (checkRecipe(tilesToCheck)) {
                tilesToCheck.forEach(t => matches.add(t));
                showBonDabali(); // Recipe always triggers Bon Dabali
            }
        }
    }
    // Vertical
    for (let c = 0; c < GRID_SIZE; c++) {
        for (let r = 0; r < GRID_SIZE - 2; r++) {
            const tilesToCheck = [grid[r][c], grid[r+1][c], grid[r+2][c]];
            if (checkRecipe(tilesToCheck)) {
                tilesToCheck.forEach(t => matches.add(t));
                showBonDabali();
            }
        }
    }
    
    // 3. Handle Obstacle Destruction (Adjacent to matches)
    // We do this by iterating current matches and checking neighbors
    const currentMatches = Array.from(matches);
    currentMatches.forEach(t => {
        const neighbors = [
            {r: t.r-1, c: t.c}, {r: t.r+1, c: t.c},
            {r: t.r, c: t.c-1}, {r: t.r, c: t.c+1}
        ];
        
        neighbors.forEach(n => {
            if (n.r >= 0 && n.r < GRID_SIZE && n.c >= 0 && n.c < GRID_SIZE) {
                const neighborTile = grid[n.r][n.c];
                if (isObstacleId(neighborTile.type.id) && !matches.has(neighborTile)) {
                    if (neighborTile.type.id === 'rock') return;
                    matches.add(neighborTile);
                    score += 20;
                }
            }
        });
    });
    
    return Array.from(matches);
}

function checkRecipe(tilesArr) {
    const ids = tilesArr.map(t => t.type.id);
    for (let recipe of RECIPES) {
        // Check if ids contains all ingredients of recipe
        // (Assuming recipe is length 3)
        if (recipe.every(ing => ids.includes(ing)) && new Set(ids).size === 3) {
            return true;
        }
    }
    return false;
}

function causesMatch(r, c, typeId, currentRow) {
    // Check Horizontal (Left)
    if (c >= 2) {
        const t1 = currentRow[c-1];
        const t2 = currentRow[c-2];
        if (t1.type.id === typeId && t2.type.id === typeId) return true;
        
        // Check Recipe Horizontal (potential)
        // t2, t1, current
        if (checkRecipe([{type:{id:t2.type.id}}, {type:{id:t1.type.id}}, {type:{id:typeId}}])) return true;
    }
    // Check Vertical (Up)
    if (r >= 2) {
        const t1 = grid[r-1][c];
        const t2 = grid[r-2][c];
        if (t1.type.id === typeId && t2.type.id === typeId) return true;
        
        // Check Recipe Vertical
        if (checkRecipe([{type:{id:t2.type.id}}, {type:{id:t1.type.id}}, {type:{id:typeId}}])) return true;
    }
    return false;
}

function isObstacleId(id) {
    return id === 'crate' || id === 'frozen' || id === 'rock';
}

function isImmovable(tile) {
    if (!tile || !tile.type) return false;
    return isObstacleId(tile.type.id);
}

function getRandomObstacleForLevel(levelId) {
    const pool = [OBSTACLES.CRATE];
    if (levelId >= 6) pool.push(OBSTACLES.FROZEN);
    if (levelId >= 11) pool.push(OBSTACLES.ROCK);
    const index = Math.floor(Math.random() * pool.length);
    return pool[index];
}

function showBonDabali() {
    comboMsg.innerHTML = `<div style="font-size:0.8em">${playerName} !</div>BON DABALI !`;
    comboMsg.classList.remove('hidden');
    soundManager.playBonDabali();
    vibrate([80, 40, 80]);
    setTimeout(() => comboMsg.classList.add('hidden'), 2000);
    score += 500; // Bonus
}

async function processMatches(matches) {
    // 1. Logic & Scoring
    let typeCounts = {};
    
    matches.forEach(t => {
        t.el.classList.add('match-anim');
        if (!typeCounts[t.type.id]) typeCounts[t.type.id] = 0;
        typeCounts[t.type.id]++;
    });

    soundManager.playMatch();

    let goalCompletedThisTurn = false;
    let allGoalsCompleted = false;

    const levelConfig = LEVELS.find(l => l.id === level) || LEVELS[0];

    // Apply logic per type
    for (let id in typeCounts) {
        const count = typeCounts[id];
        // 1 Combo = group of 3+. Approx by count/3.
        const combos = Math.floor(count / 3) || 1; 
        
        // Score: 50 per combo ONLY if it is a goal ingredient
        if (currentGoals[id]) {
            score += combos * 50;
        }

        // Goals: +1 per combo
        if (currentGoals[id] && goalProgress[id] < currentGoals[id]) {
            const wasComplete = goalProgress[id] >= currentGoals[id];
            goalProgress[id] += combos; // Increment by combo count
            
            // Cap at max (optional, strictly speaking user said "jusqu'arriver à 10/10")
            // But if we have 11/10 it's fine visually.
            
            const isComplete = goalProgress[id] >= currentGoals[id];
            if (!wasComplete && isComplete) {
                goalCompletedThisTurn = true;
            }
        }
    }

    // Check Global Completion
    const allMet = Object.keys(currentGoals).every(id => goalProgress[id] >= currentGoals[id]);
    
    // Trigger Bon Dabali if a goal was just finished OR all are finished
    if (goalCompletedThisTurn || (allMet && goalCompletedThisTurn)) {
        showBonDabali();
    }

    updateUI();
    
    await new Promise(r => setTimeout(r, 300));
    
    // 2. Refill (Gravity)
    // For each column, move tiles down
    for (let c = 0; c < GRID_SIZE; c++) {
        let emptySlots = 0;
        // Identify matches in this column
        let colMatches = [];
        for (let r = 0; r < GRID_SIZE; r++) {
             if (matches.includes(grid[r][c])) {
                 colMatches.push(r);
             }
        }
        
        if (colMatches.length === 0) continue;

        // Bubble down logic:
        // Create a new array for this column with non-matched tiles
        let newColTypes = [];
        for (let r = 0; r < GRID_SIZE; r++) {
            if (!matches.includes(grid[r][c])) {
                newColTypes.push(grid[r][c].type);
            }
        }

        // Add new randoms at start
        let addedCount = GRID_SIZE - newColTypes.length;
        for (let i = 0; i < addedCount; i++) {
            newColTypes.unshift(INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)]);
        }

        // Apply back
        for (let r = 0; r < GRID_SIZE; r++) {
            // If the type changed, it means it's a new tile or moved tile
            // For animation, we should ideally know if it fell or spawned.
            // Simplified: If it's in the top 'addedCount' rows, it's a spawn/drop.
            
            grid[r][c].type = newColTypes[r];
            renderTileContent(grid[r][c].el, grid[r][c].type);
            grid[r][c].el.className = 'tile'; // Reset classes (remove match-anim, obstacle)
            if (grid[r][c].type.id === 'crate') grid[r][c].el.classList.add('obstacle');
            
            // Add drop animation if it was updated
            if (r < addedCount) {
                 grid[r][c].el.classList.remove('drop-anim'); // reset
                 void grid[r][c].el.offsetWidth; // trigger reflow
                 grid[r][c].el.classList.add('drop-anim');
            }
        }
    }
    
    await new Promise(r => setTimeout(r, 200));
    
    // 3. Check for new matches (Chain reaction)
    resolveMatchesLoop();
}

async function resolveMatchesLoop() {
    const newMatches = findMatches();
    if (newMatches.length > 0) {
        await processMatches(newMatches);
    } else {
        isProcessing = false;
        checkGameEnd();
    }
}

function checkGameEnd() {
    // Win Condition
    let allGoalsCompleted = true;
    for (let id in currentGoals) {
        if ((goalProgress[id] || 0) < currentGoals[id]) {
            allGoalsCompleted = false;
            break;
        }
    }

    if (allGoalsCompleted) {
        clearInterval(timerInterval); // Stop Timer
        setTimeout(() => {
            showBonDabali(); // Extra celebration
            setTimeout(() => {
                vibrate([150, 80, 150, 80, 300]);
                const levelConfig = LEVELS.find(l => l.id === level) || LEVELS[0];
                const stars = computeStars(score, levelConfig);
                saveBestScoreAndStars(level, score, stars);
                updateModalStars(stars);
                const maxUnlocked = parseInt(localStorage.getItem(STORAGE_KEYS.maxUnlockedLevel), 10);
                const previousMax = Number.isFinite(maxUnlocked) ? maxUnlocked : 1;
                const newMax = Math.max(previousMax, level + 1);
                localStorage.setItem(STORAGE_KEYS.maxUnlockedLevel, String(newMax));
                document.getElementById('modal-title').innerText = "Niveau Terminé !";
                document.getElementById('modal-message').innerText = `Bravo ${playerName} ! Score: ${score}`;
                document.getElementById('modal-btn').innerText = "Niveau Suivant";
                modalBtn.onclick = () => {
                    modalOverlay.classList.add('hidden');
                    if (shouldShowAdAfterLevel(level, previousMax, newMax)) {
                        showAdForLevel(level);
                    } else {
                        nextLevel();
                    }
                };
                modalOverlay.classList.remove('hidden');
            }, 2000);
        }, 500);
        return;
    }

    // Loss Condition (Moves)
    if (moves <= 0) {
        clearInterval(timerInterval); // Stop Timer
        setTimeout(() => {
            document.getElementById('modal-title').innerText = "Plus de mouvements !";
            document.getElementById('modal-message').innerText = `Dommage ${playerName}, tu n'as plus de mouvements.`;
            document.getElementById('modal-btn').innerText = "Réessayer";
            
            modalBtn.onclick = () => {
                startLevel(level);
            };
            modalOverlay.classList.remove('hidden');
        }, 500);
    }
}

function nextLevel() {
    startLevel(level + 1);
}

function updateUI() {
    scoreEl.innerText = score;
    movesEl.innerText = moves;
    document.getElementById('level-display').innerText = level;
    if (levelGroupEl) {
        levelGroupEl.innerText = getLevelGroupName(level);
    }
    updateFreeSuperDisplay();
    
    // Goals Update
    for (let id in currentGoals) {
        const el = document.getElementById(`goal-count-${id}`);
        const item = document.getElementById(`goal-item-${id}`);
        if (el && item) {
            const current = Math.min(goalProgress[id], currentGoals[id]);
            el.innerText = `${current}/${currentGoals[id]}`;
            
            if (goalProgress[id] >= currentGoals[id]) {
                item.classList.add('completed');
            }
        }
    }
}

function computeStars(currentScore, levelConfig) {
    const base = levelConfig.moves || 1;
    const oneStar = base * 10;
    const twoStars = base * 20;
    const threeStars = base * 30;
    if (currentScore >= threeStars) return 3;
    if (currentScore >= twoStars) return 2;
    if (currentScore >= oneStar) return 1;
    return 0;
}

function saveBestScoreAndStars(levelId, currentScore, stars) {
    const rawScores = localStorage.getItem(STORAGE_KEYS.bestScores);
    const rawStars = localStorage.getItem(STORAGE_KEYS.bestStars);
    const scores = rawScores ? JSON.parse(rawScores) : {};
    const starsMap = rawStars ? JSON.parse(rawStars) : {};
    const key = String(levelId);
    const previousScore = scores[key] || 0;
    const previousStars = starsMap[key] || 0;
    if (currentScore > previousScore) {
        scores[key] = currentScore;
    }
    if (stars > previousStars) {
        starsMap[key] = stars;
    }
    localStorage.setItem(STORAGE_KEYS.bestScores, JSON.stringify(scores));
    localStorage.setItem(STORAGE_KEYS.bestStars, JSON.stringify(starsMap));
}

function updateModalStars(stars) {
    const container = document.getElementById('modal-stars');
    if (!container) return;
    const icons = container.querySelectorAll('i');
    icons.forEach((icon, index) => {
        if (index < stars) {
            icon.style.opacity = '1';
        } else {
            icon.style.opacity = '0.2';
        }
    });
}

// Start
class DabaliGame {
    init() {
        initGame();
    }
}

window.onload = () => {
    const game = new DabaliGame();
    game.init();
};
