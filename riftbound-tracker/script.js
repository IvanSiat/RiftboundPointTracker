const MAX_SCORE = 8;
const MIN_SCORE = 0;

const state = {
    p1: 0,
    p2: 0
};

// Initialize crystals
function initCrystals() {
    ['p1', 'p2'].forEach(player => {
        const container = document.getElementById(`${player}-crystals`);
        container.innerHTML = '';
        for (let i = 0; i < MAX_SCORE; i++) {
            const crystal = document.createElement('div');
            crystal.className = 'crystal';
            container.appendChild(crystal);
        }
    });
}

function updateScore(player, change) {
    const currentScore = state[player];
    const newScore = currentScore + change;

    if (newScore >= MIN_SCORE && newScore <= MAX_SCORE) {
        state[player] = newScore;
        render(player);
        checkWinCondition(player);
    }
}

function render(player) {
    // Update number
    const scoreEl = document.getElementById(`${player}-score`);
    scoreEl.textContent = state[player];

    // Update crystals
    const crystals = document.querySelectorAll(`#${player}-crystals .crystal`);
    crystals.forEach((crystal, index) => {
        if (index < state[player]) {
            crystal.classList.add('active');
        } else {
            crystal.classList.remove('active');
        }
    });

    // Update messages
    const messageEl = document.getElementById(`${player}-message`);
    if (state[player] === 7) {
        messageEl.innerHTML = `To win by <span class="highlight">Conquering</span>, you must score from <span class="highlight">BOTH</span> battlefields this turn.`;
        messageEl.classList.add('visible');
    } else if (state[player] === 8) {
        messageEl.innerHTML = `<span class="highlight" style="font-size: 1.2em">VICTORY!</span>`;
        messageEl.classList.add('visible');
    } else {
        messageEl.classList.remove('visible');
    }

    // Toggle winner class
    const section = document.getElementById(`${player}-section`);
    if (state[player] === 8) {
        section.classList.add('winner');
    } else {
        section.classList.remove('winner');
    }
}

function checkWinCondition(player) {
    // Just visual effects handled in render for now
    // Could add sound effects here
}

function resetGame() {
    if (confirm('Reset the game?')) {
        state.p1 = 0;
        state.p2 = 0;
        render('p1');
        render('p2');

        // Clear winner classes
        document.getElementById('p1-section').classList.remove('winner');
        document.getElementById('p2-section').classList.remove('winner');
    }
}

// Initial setup
initCrystals();
render('p1');
render('p2');
