/* collect the cards from the playfield and store them in an array*/ 
let card = document.getElementsByClassName('card');
let cards = [...card];
console.log(cards);

const deckOfCards = document.getElementById('play-deck');

/* global verables */ 
let moves = 0; 
let counter = document.querySelector('.moves');
const stars = document.querySelectorAll('.fa-star');
let starList = document.querySelectorAll('.stars li');
let matchedCards = document.getElementsByClassName("matched");
let closeMe = document.querySelector('.close');
let popout = document.getElementById('popout');
let selectedCards = [];

/* shuffle function from http://stackoverflow.com/a/2450976 */ 
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


/* function that creates a new game. */ 
function startPairs() {
    /* call shuffle function to shuffle the deck */ 
    cards = shuffle(cards);
    for (let i = 0; i < cards.length; i++) {
        deckOfCards.innerHTML = '';
        [].forEach.call(cards, function(item) {
            deckOfCards.appendChild(item);
        });
        cards[i].classList.remove('show', 'open', 'disabled');
    }
    moves = 0;
    counter.innerHTML = moves;

    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = '#ddc856';
        stars[i].style.visibility = 'visible';
    }
    second = 0; 
    minute = 0;
    hour = 0; /* shouldn't be needed but add it anyway */
    let clock = document.querySelector('.clock');
    clock.innerHTML = '0 min 0 sec';
    clearInterval(interval);
}

let showCard = function () {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
};

/* function  to add choosen cards into an array and check if they match */ 
function choosenCard() {
    selectedCards.push(this);
    let len = selectedCards.length;
    if (len === 2) {
        moveCounter();
        if(selectedCards[0].type === selectedCards[1].type) {
            matching();
        } else {
            nonMatching();
        }
    }
}

function matching() {
    selectedCards[0].classList.add('matched', 'disabled');
    selectedCards[1].classList.add('matched', 'disabled');
    selectedCards[0].classList.remove('show', 'open', 'no-event');
    selectedCards[1].classList.remove('show', 'open', 'no-event');
    selectedCards = [];
}

function nonMatching() {
    selectedCards[0].classList.add('unmatched');
    selectedCards[1].classList.add('unmatched');
    disabled();
    setTimeout(function() {
        selectedCards[0].classList.remove('show', 'open', 'no-event', 'unmatched');
        selectedCards[1].classList.remove('show', 'open', 'no-event', 'unmatched');
        enable();
        selectedCards = [];
    },1200);
}

/* function to disable selected cards so player can't choose the same ones twice */
function disabled() {
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

/*function used to remove matched cards */
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for (let i = 0; i < matchedCards.length; i++){
            matchedCards[i].classList.add('disabled');
        }
    });
}

function moveCounter() {
    moves ++;
    counter.innerHTML = moves;
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startClock();
    }
    if (moves > 8 && moves < 13) {
        for(i = 0; i < 3; i++) {
            if(i > 1) {
                stars[i].style.visibility = 'collapse';
            }
        }
    }
    else if (moves > 14) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = 'collapse';
            }
        }
    }
}

/* function to keep game time */ 
let second = 0;
let minute = 0;
let hour = 0;
let clock = document.querySelector('.clock');
let interval;
function startClock() {
    interval = setInterval(function(){
        clock.innerHTML = minute+'min '+second+'sec';
        second  ++;
        if (second == 60) {
            minute ++;
            second = 0;
        }
        if (minute == 60) {
            hour ++;
            minute = 0;
        }
    },1200);
}

/* win condition and show popout window displaying player score move count and time taken to solve */ 
function playerWin() {
    if (matchedCards.length == 16) {
        clearInterval(interval);
        finishTime = clock.innerHTML;
        popout.classList.add('show');
        let gameQuality = document.querySelector('.stars').innerHTML;
        document.getElementById('totalMoves').innerHTML = moves;
        document.getElementById('gameQuality').innerHTML = gameQuality;
        document.getElementById('completedIn').innerHTML = finishTime;
        closePop();

    }
}

function closePop() {
    closeMe.addEventListener('click', function(evt){
        popout.classList.remove('show');
        startPairs();
    });
}

function restart () {
    popout.classList.remove('show');
    startPairs();
}

for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener('click',showCard);
    card.addEventListener('click',choosenCard);
    card.addEventListener('click',playerWin);
}

document.body.onload = startPairs();


/* DEBUG LIST 
* match function not corretly matching cards, and not resetting when no match is present 
* timer not corretly starting on first card select (starts after first pair is selected )
* have to add pop up window to index but win condition seems to be working 
*/ 