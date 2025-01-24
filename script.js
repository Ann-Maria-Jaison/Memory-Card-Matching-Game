const cards = [
    'card1.jpg', 'card2.jpg', 'card3.jpg', 'card4.jpg', 'card5.jpg', 'card6.jpg', 
    'card7.jpg', 'card8.jpg'
];
let shuffledCards = [];
let flippedCards = [];
let score = 0;
let timer;
let seconds = 0;
let minutes = 0;

const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const cardsContainer = document.querySelector('.cards-container');
const restartButton = document.getElementById('restartButton');

// Shuffle the cards by duplicating the array and shuffling
function shuffleCards() {
    shuffledCards = [...cards, ...cards];  // Duplicate the array
    shuffledCards.sort(() => Math.random() - 0.5);  // Shuffle the cards
}

// Create the cards on the screen
function createCards() {
    cardsContainer.innerHTML = '';
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;

        const cardImage = document.createElement('img');
        cardImage.src = `images/${card}`;  // Load the image from the images folder
        cardImage.classList.add('card-img');
        cardImage.style.display = 'none';  // Hide the image initially

        cardElement.appendChild(cardImage);
        cardsContainer.appendChild(cardElement);

        cardElement.addEventListener('click', () => flipCard(cardElement, cardImage));
    });
}

// Flip the card
function flipCard(cardElement, cardImage) {
    if (flippedCards.length === 2 || cardElement.classList.contains('flipped')) return;

    cardElement.classList.add('flipped');
    cardImage.style.display = 'block';  // Show the image when the card is flipped
    flippedCards.push({ cardElement, cardImage });

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check if the flipped cards match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.cardImage.src === secondCard.cardImage.src) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        flippedCards = [];
        if (score === cards.length) {  // All pairs matched
            clearInterval(timer);
            alert('You won! Your time: ' + formatTime());
        }
    } else {
        setTimeout(() => {
            firstCard.cardElement.classList.remove('flipped');
            secondCard.cardElement.classList.remove('flipped');
            firstCard.cardImage.style.display = 'none';  // Hide the image again
            secondCard.cardImage.style.display = 'none';
            flippedCards = [];
        }, 1000);
    }
}

// Start the timer
function startTimer() {
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        timerDisplay.textContent = `Time: ${formatTime()}`;
    }, 1000);
}

// Format the time as MM:SS
function formatTime() {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Restart the game
function restartGame() {
    score = 0;
    flippedCards = [];
    minutes = 0;
    seconds = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: 00:00`;
    shuffleCards();
    createCards();
    startTimer();
}

// Initialize the game
function initGame() {
    shuffleCards();
    createCards();
    startTimer();
}

restartButton.addEventListener('click', restartGame);

// Start the game when the page loads
initGame();
