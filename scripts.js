/**
 * Object to store the scores for all counters. 
 * This keeps the actual numeric value in JavaScript.
 */
const counters = {
    score1: 0,
    penalty1: 0,
    score2: 0,
    penalty2: 0
};


/**
 * Increments the score for the specified counter ID and updates the HTML display.
 * @param {string} counterId The unique ID of the score/penalty to increment (e.g., 'score1').
 */
function incrementCounter(counterId) {
    // 1. Check if the counterId exists in our 'counters' object
    if (counters.hasOwnProperty(counterId)) {
        
        // 2. Increment the numeric score in the JavaScript object
        counters[counterId]++; 
        
        // 3. Get the corresponding HTML element using the counterId
        const displayElement = document.getElementById(counterId);

        // 4. Update the text content of the HTML element
        if (displayElement) {
            displayElement.textContent = counters[counterId];
        }
    }
}

// 1. Get references to the HTML elements (Same as before)
const startButton = document.getElementById('start-button');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');

// 2. Timer Constants and Variables
const COUNTDOWN_TIME_MS = 30000; // 30 seconds in milliseconds
let startTime; // Time the timer was started
let timerInterval; // Stores the interval ID

// 3. Initialize the display to 00:30.00 (Crucial for visual setup)
minutesDisplay.textContent = '00';
secondsDisplay.textContent = '30';
millisecondsDisplay.textContent = '00';

// 4. Define the function to START the countdown
function startCountdown() {
    // Prevent starting if already running
    if (timerInterval) return; 
    
    // Set the target end time (Start time + 30 seconds)
    const endTime = Date.now() + COUNTDOWN_TIME_MS; 

    // The core function: Update the display every 10 milliseconds
    timerInterval = setInterval(function updateCountdown() {
        
        // Calculate the remaining time
        let remainingTime = endTime - Date.now();
        
        // --- 🚨 STOPPING THE TIMER AT ZERO ---
        if (remainingTime <= 0) {
            clearInterval(timerInterval); // Stop the counting
            timerInterval = null; // Clear the interval reference
            remainingTime = 0; // Ensure it displays exactly zero
            
            // Set the display to 00:00.00
            minutesDisplay.textContent = '00';
            secondsDisplay.textContent = '00';
            millisecondsDisplay.textContent = '00';

            startButton.textContent = "Time Up!";
            // You can add an alert or sound effect here!
            return; // Exit the function
        }
        
        // --- Calculation for Display ---
        // Calculate minutes, seconds, and milliseconds from remainingTime
        let ms = Math.floor((remainingTime % 1000) / 10);
        let s = Math.floor((remainingTime / 1000) % 60);
        let m = Math.floor(remainingTime / 60000);

        // Format the numbers (add leading zero)
        let formattedMs = String(ms).padStart(2, '0');
        let formattedS = String(s).padStart(2, '0');
        let formattedM = String(m).padStart(2, '0');

        // Update the display elements
        minutesDisplay.textContent = formattedM;
        secondsDisplay.textContent = formattedS;
        millisecondsDisplay.textContent = formattedMs;
        
    }, 10); // Update every 10ms
    
    startButton.textContent = "Running..."; 
}

// 5. Attach the startCountdown function to the button's click event
startButton.addEventListener('click', startCountdown);

// --- SCORE COUNTER & SECRET CODE LOGIC ---
(function() {
    // Secret Code definition
    const SECRET_SCORE1 = 7;
    const SECRET_PENALTY1 = 14;
    const SECRET_SCORE2 = 23;
    const SECRET_PENALTY2 = 87;
    const HIDDEN_MESSAGE_ID = 'secret-message';

    // Object to store the scores for all counters. 
    const counters = {
        score1: 0,
        penalty1: 0,
        score2: 0,
        penalty2: 0
    };

    function checkSecretCode() {
        const isSecretActive = (
            counters.score1 === SECRET_SCORE1 &&
            counters.penalty1 === SECRET_PENALTY1 &&
            counters.score2 === SECRET_SCORE2 &&
            counters.penalty2 === SECRET_PENALTY2
        );

        const messageElement = document.getElementById(HIDDEN_MESSAGE_ID);

        if (messageElement) {
            // Use ternary operator for concise show/hide logic
            messageElement.style.display = isSecretActive ? 'block' : 'none';
            if (isSecretActive) {
                console.log("SECRET UNLOCKED!");
            }
        }
    }

    // Function to handle the incrementing and updating
    window.incrementCounter = function(counterId) {
        
        if (counters.hasOwnProperty(counterId)) {
            counters[counterId]++; 
        } else {
            console.error("Error: Invalid counter ID passed: " + counterId);
            return;
        }

        const displayElement = document.getElementById(counterId);
        if (displayElement) {
            displayElement.textContent = counters[counterId];
        }
        
        checkSecretCode();
    };

})(); // End of Score Counter Logic IIFE