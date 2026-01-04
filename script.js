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
    CRATE: { name: 'Caisse', emoji: '📦', id: 'crate', destructible: true }
};

// LEVELS CONFIG
const LEVELS = [
    // Niveaux 1-5 (Intro)
    { id: 1, moves: 20, goals: { attieke: 10, poisson: 10 } },
    { id: 2, moves: 25, goals: { attieke: 10, poisson: 10, piment: 10 } },
    { id: 3, moves: 30, goals: { attieke: 15, poisson: 15, huile: 10 }, obstacles: { count: 3 } },
    { id: 4, moves: 30, goals: { attieke: 15, poisson: 15, piment: 15, tomate: 10 }, obstacles: { count: 5 } },
    { id: 5, moves: 35, goals: { attieke: 20, poisson: 20, piment: 20, oignon: 15, huile: 15 }, obstacles: { count: 6 } },

    // Niveaux 6-10 (Difficulté Moyenne - Plus d'obstacles)
    { id: 6, moves: 30, goals: { maggi: 15, huile: 15, tomate: 15 }, obstacles: { count: 8 } },
    { id: 7, moves: 30, goals: { attieke: 25, poisson: 25 }, obstacles: { count: 10 } },
    { id: 8, moves: 35, goals: { piment: 30, oignon: 30, maggi: 10 }, obstacles: { count: 12 } },
    { id: 9, moves: 35, goals: { attieke: 20, poisson: 20, huile: 20, tomate: 20 }, obstacles: { count: 10 } },
    { id: 10, moves: 40, goals: { maggi: 25, piment: 25, oignon: 25 }, obstacles: { count: 14 } },

    // Niveaux 11-15 (Difficile - Beaucoup de caisses)
    { id: 11, moves: 30, goals: { attieke: 50 }, obstacles: { count: 15 } },
    { id: 12, moves: 35, goals: { poisson: 30, huile: 30 }, obstacles: { count: 16 } },
    { id: 13, moves: 40, goals: { tomate: 20, oignon: 20, piment: 20, maggi: 20 }, obstacles: { count: 18 } },
    { id: 14, moves: 25, goals: { attieke: 15, poisson: 15 }, obstacles: { count: 20 } }, // Niveau "Sprint" (peu de moves, bcp d'obstacles)
    { id: 15, moves: 45, goals: { huile: 40, maggi: 40 }, obstacles: { count: 15 } },

    // Niveaux 16-20 (Expert - Le vrai Dabali)
    { id: 16, moves: 35, goals: { attieke: 30, poisson: 30, piment: 30 }, obstacles: { count: 20 } },
    { id: 17, moves: 40, goals: { tomate: 50 }, obstacles: { count: 22 } },
    { id: 18, moves: 30, goals: { maggi: 10, huile: 10, piment: 10, oignon: 10, tomate: 10, attieke: 10, poisson: 10 }, obstacles: { count: 10 } }, // "La Totale"
    { id: 19, moves: 50, goals: { attieke: 40, poisson: 40, huile: 40 }, obstacles: { count: 24 } },
    { id: 20, moves: 60, goals: { attieke: 100, poisson: 100 }, obstacles: { count: 5 } } // Niveau Final "Le Festin" (Score attack)
];

// RECETTES SPÉCIALES (DABALI)
// Si ces 3 ingrédients sont alignés (peu importe l'ordre), c'est un Dabali
const RECIPES = [
    ['attieke', 'poisson', 'piment'], // Garba
    ['maggi', 'huile', 'piment'] // Sauce Pimentée
];

// STATE
let grid = []; // 2D array [row][col]
let score = 0;
let moves = 20;
let level = 1;
let currentGoals = {}; // { id: count }
let goalProgress = {}; // { id: current }
let selectedTile = null;
let isProcessing = false;
let playerName = "Joueur"; // Default name

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
// Menu Elements
const btnMenu = document.getElementById('menu-btn');
const drawerMenu = document.getElementById('drawer-menu');
const drawerOverlay = document.getElementById('drawer-overlay');
const closeDrawerBtn = document.getElementById('close-drawer');
const darkModeToggle = document.getElementById('dark-mode-toggle');
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

    // Name Modal Logic
    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            const name = playerNameInput ? playerNameInput.value.trim() : '';
            if (name) {
                playerName = name;
            }
            if (nameModalOverlay) {
                nameModalOverlay.classList.add('hidden');
                nameModalOverlay.style.display = 'none';
            }
            soundManager.playWin(); // Welcome sound
            startLevel(1);
        });
    }

    // Menu Logic
    if (btnMenu) btnMenu.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
    
    // Dark Mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
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
}

async function checkSwapForMatch(r1, c1, r2, c2) {
    // Virtual swap
    const t1 = grid[r1][c1];
    const t2 = grid[r2][c2];
    
    if (t1.type.id === 'crate' || t2.type.id === 'crate') return false;

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
        document.getElementById('modal-title').innerText = "YAKO !";
        document.getElementById('modal-message').innerHTML = `<b>${playerName}</b>, le temps est écoulé !<br>Score : ${score}`;
        document.getElementById('modal-btn').innerText = "Recommencer";
        
        modalBtn.onclick = () => {
            startLevel(level);
        };
        modalOverlay.classList.remove('hidden');
    }, 500);
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
        if (grid[r][c].type.id !== 'crate') {
            grid[r][c].type = OBSTACLES.CRATE;
            grid[r][c].el.innerText = OBSTACLES.CRATE.emoji;
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
    if (type.image) {
        el.innerHTML = `<img src="${type.image}" alt="${type.name}" style="width:80%; height:80%; object-fit:contain; pointer-events:none;">`;
        el.style.fontSize = '';
    } else {
        el.innerText = type.emoji;
        el.innerHTML = type.emoji; // Use innerHTML to be safe
        el.style.fontSize = '';
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
        activeTile = getTileFromEl(e.target);
    } else {
        // Mouse click selection
        const tile = getTileFromEl(e.target);
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

    const checkRun = (run) => {
        if (run.length >= 3) {
            run.forEach(t => matches.add(t));
            if (run.length >= 4 && !superComboTriggered) {
                triggerSuperCombo();
                superComboTriggered = true; 
            }
        }
    };
    
    // 1. Standard Match-3 (Identical) with Run-Length Check
    // Horizontal
    for (let r = 0; r < GRID_SIZE; r++) {
        let run = [];
        for (let c = 0; c < GRID_SIZE; c++) {
            const t = grid[r][c];
            if (t.type.id === 'crate') {
                checkRun(run); run = []; continue;
            }
            if (run.length === 0 || run[run.length-1].type.id === t.type.id) {
                run.push(t);
            } else {
                checkRun(run); run = [t];
            }
        }
        checkRun(run);
    }

    // Vertical
    for (let c = 0; c < GRID_SIZE; c++) {
        let run = [];
        for (let r = 0; r < GRID_SIZE; r++) {
            const t = grid[r][c];
            if (t.type.id === 'crate') {
                checkRun(run); run = []; continue;
            }
            if (run.length === 0 || run[run.length-1].type.id === t.type.id) {
                run.push(t);
            } else {
                checkRun(run); run = [t];
            }
        }
        checkRun(run);
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
                if (neighborTile.type.id === 'crate' && !matches.has(neighborTile)) {
                    matches.add(neighborTile);
                    // Crates give points? Maybe small points.
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

function showBonDabali() {
    comboMsg.innerHTML = `<div style="font-size:0.8em">${playerName} !</div>BON DABALI !`;
    comboMsg.classList.remove('hidden');
    soundManager.playBonDabali();
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
                document.getElementById('modal-title').innerText = "Niveau Terminé !";
                document.getElementById('modal-message').innerText = `Bravo ${playerName} ! Score: ${score}`;
                document.getElementById('modal-btn').innerText = "Niveau Suivant";
                modalBtn.onclick = nextLevel; // Ensure correct handler
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

// Start
window.onload = initGame;
