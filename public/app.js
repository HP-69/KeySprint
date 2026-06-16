// Application State
const state = {
    mode: 'words',
    modeValue: 25,
    testActive: false,
    testComplete: false,
    startTime: null,
    endTime: null,
    currentWordIndex: 0,
    currentLetterIndex: 0,
    words: [],
    inputHistory: [],
    correctChars: 0,
    incorrectChars: 0,
    extraChars: 0,
    missedChars: 0,
    wpmHistory: [],
    theme: 'dark',
    settings: {
        punctuation: false,
        numbers: false,
        sound: true
    }
};

// DOM Elements
const elements = {
    typingArea: document.getElementById('typingArea'),
    wordsContainer: document.getElementById('words'),
    typingInput: document.getElementById('typingInput'),
    testConfig: document.getElementById('testConfig'),
    results: document.getElementById('results'),
    liveStats: document.getElementById('liveStats'),
    timer: document.getElementById('timer'),
    settingsPanel: document.getElementById('settingsPanel'),
    settingsBtn: document.getElementById('settingsBtn'),
    restartBtn: document.getElementById('restartBtn')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    initTheme();
    generateTest();
    focusInput();
});

// Event Listeners
function initEventListeners() {
    // Mode selection
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            state.mode = e.target.dataset.mode;
            updateConfigOptions();
            resetTest();
        });
    });

    // Config selection
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('config-btn')) {
            document.querySelectorAll('.config-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            state.modeValue = parseInt(e.target.dataset.value);
            resetTest();
        }
    });

    // Settings toggle
    elements.settingsBtn.addEventListener('click', () => {
        elements.settingsPanel.classList.toggle('active');
    });

    // Theme selection
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            setTheme(e.target.dataset.theme);
        });
    });

    // Settings toggles
    document.getElementById('punctuationToggle').addEventListener('change', (e) => {
        state.settings.punctuation = e.target.checked;
        resetTest();
    });

    document.getElementById('numbersToggle').addEventListener('change', (e) => {
        state.settings.numbers = e.target.checked;
        resetTest();
    });

    document.getElementById('soundToggle').addEventListener('change', (e) => {
        state.settings.sound = e.target.checked;
    });

    // Typing input
    elements.typingInput.addEventListener('input', handleInput);
    elements.typingInput.addEventListener('keydown', handleKeydown);

    // Focus management
    elements.typingArea.addEventListener('click', focusInput);
    elements.typingInput.addEventListener('focus', () => {
        elements.typingArea.classList.add('focused');
    });
    elements.typingInput.addEventListener('blur', () => {
        elements.typingArea.classList.remove('focused');
    });

    // Restart button
    elements.restartBtn.addEventListener('click', resetTest);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Tab + Enter to restart
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            resetTest();
        }
        // Escape to unfocus
        if (e.key === 'Escape') {
            elements.typingInput.blur();
        }
    });
}

// Update config options based on mode
function updateConfigOptions() {
    const configOptions = document.getElementById('configOptions');
    configOptions.innerHTML = '';

    if (state.mode === 'time') {
        const timeValues = [15, 30, 60, 120];
        timeValues.forEach((val, idx) => {
            const btn = document.createElement('button');
            btn.className = `config-btn ${idx === 1 ? 'active' : ''}`;
            btn.dataset.value = val;
            btn.textContent = val;
            configOptions.appendChild(btn);
        });
        state.modeValue = 30;
    } else {
        const wordValues = [10, 25, 50, 100];
        wordValues.forEach((val, idx) => {
            const btn = document.createElement('button');
            btn.className = `config-btn ${idx === 1 ? 'active' : ''}`;
            btn.dataset.value = val;
            btn.textContent = val;
            configOptions.appendChild(btn);
        });
        state.modeValue = 25;
    }
}

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

function setTheme(theme) {
    state.theme = theme;
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
}

// Generate test words
function generateTest() {
    const wordCount = state.mode === 'words' ? state.modeValue : 100;
    state.words = [];

    for (let i = 0; i < wordCount; i++) {
        let word = WORDS[Math.floor(Math.random() * WORDS.length)];
        
        // Add punctuation
        if (state.settings.punctuation && Math.random() < 0.2) {
            word += PUNCTUATION[Math.floor(Math.random() * PUNCTUATION.length)];
        }
        
        // Add numbers
        if (state.settings.numbers && Math.random() < 0.1) {
            word = NUMBERS[Math.floor(Math.random() * NUMBERS.length)] + word;
        }
        
        state.words.push(word);
    }

    renderWords();
}

// Render words to DOM
function renderWords() {
    elements.wordsContainer.innerHTML = '';
    
    state.words.forEach((word, wordIndex) => {
        const wordElement = document.createElement('div');
        wordElement.className = 'word';
        if (wordIndex === 0) wordElement.classList.add('active');
        
        word.split('').forEach((char, charIndex) => {
            const letterElement = document.createElement('span');
            letterElement.className = 'letter';
            letterElement.textContent = char;
            if (wordIndex === 0 && charIndex === 0) {
                letterElement.classList.add('current');
            }
            wordElement.appendChild(letterElement);
        });
        
        elements.wordsContainer.appendChild(wordElement);
    });
}

// Handle input
function handleInput(e) {
    if (state.testComplete) return;

    // Start test on first input
    if (!state.testActive) {
        startTest();
    }

    const inputValue = e.target.value;
    const currentWord = state.words[state.currentWordIndex];
    
    // Update word display
    updateWordDisplay(inputValue);
    
    // Update live stats
    updateLiveStats();
}

// Handle keydown events
function handleKeydown(e) {
    if (state.testComplete) return;

    // Space key - move to next word
    if (e.key === ' ') {
        e.preventDefault();
        
        if (elements.typingInput.value.trim() === '') return;
        
        const inputValue = elements.typingInput.value;
        const currentWord = state.words[state.currentWordIndex];
        
        // Record input history
        state.inputHistory.push({
            word: currentWord,
            input: inputValue,
            correct: inputValue === currentWord
        });
        
        // Calculate character stats
        calculateCharStats(inputValue, currentWord);
        
        // Move to next word
        state.currentWordIndex++;
        state.currentLetterIndex = 0;
        elements.typingInput.value = '';
        
        // Check if test is complete
        if (state.mode === 'words' && state.currentWordIndex >= state.modeValue) {
            endTest();
            return;
        }
        
        // Update display for next word
        updateActiveWord();
    }
}

// Calculate character statistics
function calculateCharStats(input, expected) {
    const inputChars = input.split('');
    const expectedChars = expected.split('');
    
    for (let i = 0; i < Math.max(inputChars.length, expectedChars.length); i++) {
        if (i >= expectedChars.length) {
            state.extraChars++;
        } else if (i >= inputChars.length) {
            state.missedChars++;
        } else if (inputChars[i] === expectedChars[i]) {
            state.correctChars++;
        } else {
            state.incorrectChars++;
        }
    }
}

// Update word display
function updateWordDisplay(inputValue) {
    const currentWord = state.words[state.currentWordIndex];
    const wordElement = elements.wordsContainer.children[state.currentWordIndex];
    const letters = wordElement.querySelectorAll('.letter');
    
    // Clear all letter classes
    letters.forEach((letter, index) => {
        letter.classList.remove('correct', 'incorrect', 'current');
        
        if (index < inputValue.length) {
            if (inputValue[index] === currentWord[index]) {
                letter.classList.add('correct');
            } else {
                letter.classList.add('incorrect');
            }
        }
        
        if (index === inputValue.length) {
            letter.classList.add('current');
        }
    });
    
    // Handle extra characters
    if (inputValue.length > currentWord.length) {
        const extraCount = inputValue.length - currentWord.length;
        for (let i = 0; i < extraCount; i++) {
            const existingExtra = wordElement.querySelector(`.letter.extra:nth-of-type(${currentWord.length + i + 1})`);
            if (!existingExtra) {
                const extraLetter = document.createElement('span');
                extraLetter.className = 'letter extra';
                extraLetter.textContent = inputValue[currentWord.length + i];
                wordElement.appendChild(extraLetter);
            }
        }
    } else {
        // Remove extra letters if user backspaced
        const extraLetters = wordElement.querySelectorAll('.letter.extra');
        extraLetters.forEach(letter => letter.remove());
    }
}

// Update active word
function updateActiveWord() {
    document.querySelectorAll('.word').forEach((word, index) => {
        word.classList.remove('active');
        if (index === state.currentWordIndex) {
            word.classList.add('active');
            // Scroll into view if needed
            word.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
    
    // Set current letter
    if (state.currentWordIndex < state.words.length) {
        const currentWordElement = elements.wordsContainer.children[state.currentWordIndex];
        const firstLetter = currentWordElement.querySelector('.letter');
        if (firstLetter) {
            firstLetter.classList.add('current');
        }
    }
}

// Start test
function startTest() {
    state.testActive = true;
    state.startTime = Date.now();
    elements.liveStats.classList.add('active');
    
    if (state.mode === 'time') {
        startTimer();
    }
}

// Timer for time-based tests
function startTimer() {
    const updateTimer = () => {
        if (!state.testActive || state.testComplete) return;
        
        const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
        const remaining = state.modeValue - elapsed;
        
        elements.timer.textContent = remaining;
        
        if (remaining <= 0) {
            endTest();
            return;
        }
        
        requestAnimationFrame(updateTimer);
    };
    
    requestAnimationFrame(updateTimer);
}

// Update live statistics
function updateLiveStats() {
    if (!state.testActive) return;
    
    const timeElapsed = (Date.now() - state.startTime) / 1000 / 60; // in minutes
    
    // Calculate total characters typed
    const totalCharsTyped = state.inputHistory.reduce((sum, entry) => sum + entry.input.length, 0) 
                          + elements.typingInput.value.length;
    
    // Calculate WPM (1 word = 5 characters)
    const wpm = Math.round((totalCharsTyped / 5) / timeElapsed) || 0;
    
    // Calculate accuracy
    const totalCorrect = state.correctChars;
    const totalTyped = state.correctChars + state.incorrectChars + state.extraChars;
    const accuracy = totalTyped > 0 ? Math.round((totalCorrect / totalTyped) * 100) : 100;
    
    // Raw WPM (including incorrect)
    const rawWpm = Math.round((totalTyped / 5) / timeElapsed) || 0;
    
    // Update display
    document.getElementById('liveWpm').textContent = wpm;
    document.getElementById('liveAccuracy').textContent = accuracy + '%';
    document.getElementById('liveRaw').textContent = rawWpm;
    
    // Store WPM for consistency calculation
    state.wpmHistory.push(wpm);
}

// End test
function endTest() {
    state.testActive = false;
    state.testComplete = true;
    state.endTime = Date.now();
    
    // Hide typing area and show results
    elements.typingArea.classList.add('hidden');
    elements.testConfig.classList.add('hidden');
    elements.liveStats.classList.add('hidden');
    elements.results.classList.remove('hidden');
    
    // Calculate final stats
    calculateFinalStats();
}

// Calculate final statistics
function calculateFinalStats() {
    const timeElapsed = (state.endTime - state.startTime) / 1000 / 60; // in minutes
    
    // Total characters
    const totalCorrect = state.correctChars;
    const totalIncorrect = state.incorrectChars;
    const totalExtra = state.extraChars;
    const totalMissed = state.missedChars;
    const totalTyped = totalCorrect + totalIncorrect + totalExtra;
    
    // WPM calculation
    const wpm = Math.round((totalCorrect / 5) / timeElapsed);
    
    // Raw WPM
    const rawWpm = Math.round((totalTyped / 5) / timeElapsed);
    
    // Accuracy
    const accuracy = totalTyped > 0 ? Math.round((totalCorrect / totalTyped) * 100) : 100;
    
    // Consistency (standard deviation of WPM)
    const consistency = calculateConsistency();
    
    // Update results display
    document.getElementById('finalWpm').textContent = wpm;
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    document.getElementById('finalRaw').textContent = rawWpm;
    document.getElementById('finalConsistency').textContent = consistency + '%';
    document.getElementById('correctChars').textContent = totalCorrect;
    document.getElementById('incorrectChars').textContent = totalIncorrect;
    document.getElementById('extraChars').textContent = totalExtra;
    document.getElementById('missedChars').textContent = totalMissed;
}

// Calculate consistency
function calculateConsistency() {
    if (state.wpmHistory.length < 2) return 100;
    
    const mean = state.wpmHistory.reduce((a, b) => a + b, 0) / state.wpmHistory.length;
    const variance = state.wpmHistory.reduce((sum, wpm) => sum + Math.pow(wpm - mean, 2), 0) / state.wpmHistory.length;
    const stdDev = Math.sqrt(variance);
    
    // Consistency as percentage (lower std dev = higher consistency)
    const consistency = Math.max(0, 100 - (stdDev / mean * 100));
    return Math.round(consistency);
}

// Reset test
function resetTest() {
    // Reset state
    state.testActive = false;
    state.testComplete = false;
    state.startTime = null;
    state.endTime = null;
    state.currentWordIndex = 0;
    state.currentLetterIndex = 0;
    state.inputHistory = [];
    state.correctChars = 0;
    state.incorrectChars = 0;
    state.extraChars = 0;
    state.missedChars = 0;
    state.wpmHistory = [];
    
    // Reset UI
    elements.typingInput.value = '';
    elements.timer.textContent = '';
    elements.typingArea.classList.remove('hidden');
    elements.testConfig.classList.remove('hidden');
    elements.results.classList.add('hidden');
    elements.liveStats.classList.remove('active');
    
    // Generate new test
    generateTest();
    focusInput();
}

// Focus input
function focusInput() {
    elements.typingInput.focus();
}

// Play sound (if enabled)
function playSound() {
    if (!state.settings.sound) return;
    
    // Create a simple beep using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}
