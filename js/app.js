/* collect the cards and store them in an array  */ 
let card = document.getElementsByClassName('card');
let cards = [...card];
console.log(cards);

/* make a deck of cards to play with */
const playDeck = document.getElementById('card-deck');

/* global verabls */ 
let counter = document.querySelector('.moves');
let moves = 0; 
const stars = document.querySelectorAll('fa-star');
let gameQuality = document.querySelectorAll('.stars li');
let matchedCards = document.getElementsByClassName('matched');
let closeIcon = document.querySelectorAll('.close');
let winPopOut = document.getElementById('popout');
let selectedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*calls the start function on page load */
document.body.onload = startPairs();

function startPairs() {
    cards = shuffle(cards);
    /* play field clean up */
    for (var i = 0; i < cards.lenght; i++){
        playDeck.innerHTML = '';
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove('show', 'open', 'match', 'disable');
    }
    moves = 0; 
    moveCounter.innerHTML = moves;

    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = 'd4af37';
        stars[i].style.visibility = 'visible';
    }
    second = 0;
    minute = 0;
    let clock = document.querySelector('.timer');
    timer.innerHTML = '0 minutes 0 seconds';
    clearInterval(interval);
}

/* function to set open, show and disable to cards */ 
let showCards = function () {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disable'); /* class used to diable a second click once selected */
};

/* function used to check if selected cards are a match */ 
function chooseCards() {
    selectedCards.push(this);
    let lengh = selectedCards.length;
    if (lengh == 2) {
        moveCounter();
        if(selectedCards[0].type === selectedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}

function matched () {
    selectedCards[0].classList.add('matched', 'disable');
    selectedCards[1].classList.add('matched', 'disable');
    selectedCards[0].classList.remove('show', 'open', 'no-event');
    selectedCards[1].classList.remove('show', 'open', 'no-event');
    selectedCards = [];
}

function unmatched () {
    selectedCards[0].classList.add('unmatched');
    selectedCards[1].classList.add('unmatched');
    disable();
    setTimeout(function(){
        selectedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
        selectedCards[1].classList.remove('show', 'open', 'no-event', 'unmatched');
        enable();
        selectedCards = [];
    },1200);
}
/* function to temopraraly disable cards from being selected again once selected */ 
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disable');
    });
}

function enable() {
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disable');
        for(var i = 0; i < matchedCards.length; i++) {
            matchedCards[i].classList.add('disable');
        }
    });
}

function moveCounter() {
    moves ++;
    moveCounter.innerHTML = moves;
    if (moves == 1) {
        second = 0;
        minute = 0;
        startTimer();
    }
    /* setting star rate based on moves */ 
    if (moves > 8 && mvoes < 13) {
        for(i = 0; i < 3; i++) {
            if(i > 1) {
                stars[i].style.visibility = 'collapse';
            }
        }
    }
    else if (moves > 14) {
        for(i = 0; i < 3; i++) {
            if(i > 0){
                stars[i].style.visibility = 'collapse';
            }
        }
    }
}

/* clock function */ 
let second = 0;
let minute = 0;
let clock = document.querySelector('.timer');
let interval;

function startClock() {
    interval = setInterval(function(){
        clock.innerHTML = minuet+'minuets '+second+"seconds";
        second++;
        if(second == 60) {
            minute++;
            second=0;
        }
    },1000);
}

/* Player wins function */ 
function playerWins () {
    if (matchedCards.length == 16) {
        clearInterval(interval);
        compleatedIn = timer.innerHTML;

        winPopOut.classList.add('show');

        let gameQuality = document.querySelector('.stars').innerHTML;

        document.getElementById('movesTaken').innerHTML = moves;
        document.getElementById('gameQuality').innerHTML = gameQuality;
        document.getElementById('totalTime').innerHTML = compleatedIn;

        closePopOut();
    }
}

function closePopOut() {
    closeIcon.addEventListener('click', function(evt) {
        popout.classList.remove('show');
        startPairs();
    });
}

function playAgain() {
    popout.classList.remove('show');
    startPairs();
}

/* adds listiners to each card in the deck */ 
for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener('click', showCards);
    card.addEventListener('click', chooseCards);
    card.addEventListener('click', playerWins);
}