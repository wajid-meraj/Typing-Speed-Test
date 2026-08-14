const text =
"The quick brown fox jumps over the lazy dog. Typing is a useful skill that improves with regular practice. Keep your eyes on the screen and focus on accuracy before speed.";

const typingInput = document.getElementById("typingInput");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const progressBar = document.getElementById("progressBar");
const result = document.getElementById("result");

const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalTime = document.getElementById("finalTime");

let startTime = null;
let timer = null;
let testStarted = false;


// Start Test
startBtn.addEventListener("click", () => {

    typingInput.disabled = false;
    typingInput.focus();

    startTime = new Date();
    testStarted = true;

    startBtn.disabled = true;

    result.style.display = "none";

    timer = setInterval(updateStats, 1000);
});


// Typing Event
typingInput.addEventListener("input", () => {

    if (!testStarted) return;

    updateStats();

    const typedText = typingInput.value;

    const progress =
        Math.min((typedText.length / text.length) * 100, 100);

    progressBar.style.width = progress + "%";

    // Test complete
    if (typedText.length >= text.length) {
        finishTest();
    }
});


// Update statistics
function updateStats() {

    if (!startTime) return;

    const currentTime = new Date();

    const elapsedSeconds =
        Math.floor((currentTime - startTime) / 1000);

    timeDisplay.textContent = elapsedSeconds + "s";

    const typedText = typingInput.value;

    // Calculate correct characters
    let correctCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === text[i]) {
            correctCharacters++;
        }
    }

    // Accuracy
    let accuracy = 100;

    if (typedText.length > 0) {
        accuracy =
            (correctCharacters / typedText.length) * 100;
    }

    accuracyDisplay.textContent =
        Math.round(accuracy) + "%";


    // WPM
    const minutes = elapsedSeconds / 60;

    let wpm = 0;

    if (minutes > 0) {
        wpm =
            Math.round((typedText.length / 5) / minutes);
    }

    wpmDisplay.textContent = wpm;
}


// Finish test
function finishTest() {

    testStarted = false;

    clearInterval(timer);

    typingInput.disabled = true;

    const endTime = new Date();

    const elapsedSeconds =
        Math.max(1, Math.floor((endTime - startTime) / 1000));

    const typedText = typingInput.value;

    let correctCharacters = 0;

    for (let i = 0; i < text.length; i++) {

        if (typedText[i] === text[i]) {
            correctCharacters++;
        }
    }

    const accuracy =
        (correctCharacters / text.length) * 100;

    const wpm =
        Math.round(
            (typedText.length / 5) /
            (elapsedSeconds / 60)
        );

    finalWpm.textContent = wpm + " WPM";

    finalAccuracy.textContent =
        Math.round(accuracy) + "%";

    finalTime.textContent =
        elapsedSeconds + "s";

    result.style.display = "block";

    startBtn.disabled = false;
}


// Restart
restartBtn.addEventListener("click", () => {

    clearInterval(timer);

    startTime = null;
    testStarted = false;

    typingInput.value = "";

    typingInput.disabled = true;

    timeDisplay.textContent = "0s";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";

    progressBar.style.width = "0%";

    result.style.display = "none";

    startBtn.disabled = false;
});
