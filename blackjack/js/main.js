"use strict";

// On Page Load
window.onload = function () {
    // Load
    document.querySelector("#hit").onclick = checkInput;
    document.querySelector("#stand").onclick = stand;
    document.querySelector("#currentBet").innerHTML = "Bet:<br>0";
    document.querySelector("#reset").onclick = setup;


    // Set chip values
    let allChips = document.querySelectorAll(".chip");
    for (let i = 0; i < allChips.length; i++) {
        // Blue = 5
        if (i == 0) {
            allChips[i].value = 5;
        }
        // Red = 10
        else if (i == 1) {
            allChips[i].value = 10;
        }
        // Black = 25
        else if (i == 2) {
            allChips[i].value = 25;
        }
        allChips[i].onclick = bet;
    }
}


// Global Variables
let numPlayers = [];
let allCards = [];
let cardsLeft = [];
let player;
let opponent;
let timerStart = new Date().getTime() / 1000; // Gets the starting time (1 jan 1970)
let delay;
let setupComplete;
let canBet;
let gameOver;

// Game Setup
setup();


// Setup that creates base deck and hands for players
function setup() {
    gameOver = false;
    // Audio
    document.querySelector("#ambience").play();
    document.querySelector("#ambience").volume = .1;

    // Creates players
    player = new Player("player");
    getMoney();
    saveMoney();
    opponent = new Player("opponent");

    numPlayers.push(player);
    numPlayers.push(opponent);

    // Creates 52 card deck
    for (let i = 1; i < 53; i++) {

        // Every 4 cards is a new number (1-4 = ACE)
        let arrayValue = i;

        // Converts number in array to card number
        let cardValue = Math.ceil((i) / 4);
        let cardID = "number";

        // Set card suits
        let cardSuit;
        let cardMod = i % 4;
        // Diamonds
        if (cardMod == 0) {
            cardSuit = "diamonds";
        }
        // Hearts
        else if (cardMod == 1) {
            cardSuit = "hearts";
        }
        // Clubs
        else if (cardMod == 2) {
            cardSuit = "clubs";
        }
        // Spades
        else if (cardMod == 3) {
            cardSuit = "spades";
        }

        // Sets the srcimg for the card
        let imgsrc = `<img src="media/images/cards/${cardSuit}-${cardValue}.png" alt ="" class="rowOne" `;

        // Changes faces to 10's
        if (cardValue > 10) {
            cardValue = 10
            cardID = "face";
        }
        // Changes 1's to aces
        else if (cardValue == 1) {
            cardID = "ace";
        }

        // Push card to deck
        allCards.push(new Card(cardValue, cardSuit, cardID, imgsrc));
    }

    // Set equal to cars remaining
    cardsLeft = allCards;

    // Doesn't play card flip sound at beginning
    setupComplete = false;
    canBet = true;

    // Gives player starting cards
    for (let i = 0; i < 2; i++) {
        player.total = hit(player.cards, player.total, player.stand, player);
    }

    // Gives opponent starting cards
    for (let i = 0; i < 2; i++) {
        opponent.total = hit(opponent.cards, opponent.total, opponent.stand, opponent);
    }
    setupComplete = true;

    // Adds the cards to main div
    document.querySelector("#main").innerHTML = opponent.cardBackDiv + player.div;
    document.querySelector("#playerTotal").innerHTML = "Player Total:</br>" + player.total;
    document.querySelector("#documentation").innerHTML = "Documentation";
    document.querySelector("#documentation").onclick = link;
    document.querySelector("#opponentTotal").classList.add("invisible");
    document.querySelector("#opponentStand").classList.add("invisible");
    document.querySelector("#result").classList.add("invisible");
    document.querySelector("#currentBet").innerHTML = "Bet:<br>" + player.bet;

    // Plays card shuffle sound
    document.querySelector("#shuffle").play();
}


// Hit for cards
function hit(cards, total, stand, character) {
    // Ensure the total isn't over 21 and have not choosen to stand
    if (total < 21 && stand == false) {
        // Pick random card
        let card = randomCard();
        cards.push(cardsLeft[card]);

        // Adds the card image to the appropriate div
        // Removes the </div> at the end every time, then adds it
        character.div = character.div.substring(0, character.div.length - 6);
        allCards[card].src += `id="${character.name}Card${character.cards.length - 1}">`
        character.div += `${allCards[card].src}</div>`;

        // Adds back facing cards to opponent
        if (character.name == "opponent") {
            opponent.cardBackDiv = opponent.cardBackDiv.substring(0, opponent.cardBackDiv.length - 6);
            opponent.cardBackDiv += `<img src="media/images/cards/card-back.png" alt="" class="rowOne" id="${character.name}Card${character.cards.length - 1}"></div>`;
        }

        // Removes card from remaining deck
        cardsLeft.splice(card, 1);

        // Adds total before ace calculation
        total = addTotal(cards);

        // Calculates aces
        cards = calcAces(total, cards);

        // Adds total after ace calculation
        total = addTotal(cards);

        // Plays flip sound
        if (setupComplete == true) {
            document.querySelector("#card-flip").play();
            canBet = false;
        }

        return total;
    }
    else {
        character.stand = true;
        return total;
    }
}


// Generates random card based on remaining cards
function randomCard() {
    return Math.floor(Math.random() * (cardsLeft.length - 1) + 1);
}


// Adds total of player cards
function addTotal(cards) {
    let total = 0;

    // Adds each card value
    for (let i = 0; i < cards.length; i++) {
        total += cards[i].value;
    }
    return total;
}


// Calc Aces
function calcAces(total, cards) {
    // Cycles through cards
    for (let i = 0; i < cards.length; i++) {
        // Converts aces to 11s
        if (total < 12) {
            if (cards[i].value == 1) {
                cards[i].value = 11;
            }
        }
        // Converts aces to 1s
        else if (total > 21) {
            if (cards[i].value == 11) {
                cards[i].value = 1;
            }
        }
    }
    return cards;
}


// Stand test method
function stand() {
    player.stand = true;

    // Lets opponent hit after player stand (adds delay b4 opponent can hit again)
    delay = setInterval(checkInput, 1000);
}


// Player input for hit
function checkInput() {
    // Draw card
    player.total = hit(player.cards, player.total, player.stand, player);

    // Generate 1-100 number for probability
    let hitChance = Math.floor(Math.random() * (100 - 1) + 1);

    // Chances of opponent hitting w/ specific totals
    if (player.stand == true && opponent.total > player.total) {
        opponent.stand = true;
    }
    else {
        switch (opponent.total) {
            // Hand = 12
            case 12:
                // 69% to draw
                if (hitChance > 31) {
                    opponent.total = hit(opponent.cards, opponent.total, opponent.stand, opponent);
                }
                // Stand
                else {
                    opponent.stand = true;
                    opponentStand()
                    clearInterval(delay);
                }
                break;

            // Hand = 13
            case 13:
                // 61% to draw
                if (hitChance > 39) {
                    opponent.total = hit(opponent.cards, opponent.total, opponent.stand, opponent);
                }
                // Stand
                else {
                    opponent.stand = true;
                    opponentStand()
                    clearInterval(delay);
                }
                break;

            // Hand = 14
            case 14:
                // 44% to draw
                if (hitChance > 56) {
                    opponent.total = hit(opponent.cards, opponent.total, opponent.stand, opponent);
                }
                // Stand
                else {
                    opponent.stand = true;
                    opponentStand()
                    clearInterval(delay);
                }
                break;

            // Hand = 15
            case 15:
                // 42% to draw
                if (hitChance > 58) {
                    opponent.total = hit(opponent.cards, opponent.total, opponent.stand, opponent);
                }
                // Stand
                else {
                    opponent.stand = true;
                    opponentStand()
                    clearInterval(delay);
                }
                break;

            // Hand = 16
            case 16:
                // 38% to draw
                if (hitChance > 62) {
                    opponent.total = hit(opponent.cards, opponent.total, opponent.stand, opponent);
                }
                // Stand
                else {
                    opponent.stand = true;
                    opponentStand()
                    clearInterval(delay);
                }
                break;

            // Hand = 17
            case 17:
                // 31% to draw
                if (hitChance > 69) {
                    opponent.total = hit(opponent.cards, opponent.total, opponent.stand, opponent);
                }
                // Stand
                else {
                    opponent.stand = true;
                    opponentStand()
                    clearInterval(delay);
                }
                break;

            // Hand = 18
            case 18:
                // 23% to draw
                if (hitChance > 77) {
                    opponent.total = hit(opponent.cards, opponent.total, opponent.stand, opponent);
                }
                // Stand
                else {
                    opponent.stand = true;
                    opponentStand()
                    clearInterval(delay);
                }
                break;

            // Hand = 19
            case 19:
                // 15% to draw
                if (hitChance > 85) {
                    opponent.total = hit(opponent.cards, opponent.total, opponent.stand, opponent);
                }
                // Stand
                else {
                    opponent.stand = true;
                    opponentStand()
                    clearInterval(delay);
                }
                break;

            // Hand = 20
            case 20:
                // 8% to draw
                if (hitChance > 92) {
                    opponent.total = hit(opponent.cards, opponent.total, opponent.stand, opponent);
                }
                // Stand
                else {
                    opponent.stand = true;
                    opponentStand()
                    clearInterval(delay);
                }
                break;

            // Hand = 21
            case 21:
                // No draw
                opponent.stand = true;
                clearInterval(delay);
                break;

            // Hand < 12
            default:
                // Guarenteed draw
                opponent.total = hit(opponent.cards, opponent.total, opponent.stand, opponent);
        }
    }

    // Adds the cards to main div
    document.querySelector("#main").innerHTML = opponent.cardBackDiv + player.div;
    document.querySelector("#playerTotal").innerHTML = "Player Total:</br>" + player.total;
    win();
    formatCards();
}

// Opponent Stand
function opponentStand() {
    document.querySelector("#opponentStand").innerHTML = "Stand";
    document.querySelector("#opponentStand").classList.remove("invisible");
}

// Function to win
function win() {
    // Player Bust
    if (player.total > 21) {
        document.querySelector("#opponentTotal").innerHTML = "Opponent Total:</br>" + opponent.total;
        document.querySelector("#opponentTotal").classList.remove("invisible");
        document.querySelector("#result").innerHTML = "Loss:</br>~Player Bust~";
        document.querySelector("#result").classList.remove("invisible");
        document.querySelector("#main").innerHTML = opponent.div + player.div;
        document.querySelector("#opponentStand").classList.add("invisible");
        saveMoney();
        updateMoney();
        clearInterval(delay);
        gameOver = true;
    }
    // Opponent Bust
    else if (opponent.total > 21) {
        document.querySelector("#opponentTotal").innerHTML = "Opponent Total:</br>" + opponent.total;
        document.querySelector("#opponentTotal").classList.remove("invisible");
        document.querySelector("#result").innerHTML = "Win:</br>Opponent Bust";
        document.querySelector("#result").classList.remove("invisible");
        document.querySelector("#main").innerHTML = opponent.div + player.div;
        document.querySelector("#opponentStand").classList.add("invisible");
        player.money += player.bet * 2;
        saveMoney();
        updateMoney();
        clearInterval(delay);
        gameOver = true;
    }
    else {
        if (opponent.stand == true && player.stand == true) {
            // Player High
            if (player.total > opponent.total) {
                document.querySelector("#opponentTotal").innerHTML = "Opponent Total:</br>" + opponent.total;
                document.querySelector("#opponentTotal").classList.remove("invisible");
                document.querySelector("#result").innerHTML = "Win:</br>~Player High~";
                document.querySelector("#result").classList.remove("invisible");
                document.querySelector("#main").innerHTML = opponent.div + player.div;
                document.querySelector("#opponentStand").classList.add("invisible");
                player.money += player.bet * 2;
                saveMoney();
                updateMoney();
                clearInterval(delay);
                gameOver = true;
            }
            // Opponent High
            else if (player.total < opponent.total) {
                document.querySelector("#opponentTotal").innerHTML = "Opponent Total:</br>" + opponent.total;
                document.querySelector("#opponentTotal").classList.remove("invisible");
                document.querySelector("#result").innerHTML = "Loss:</br>Opponent High";
                document.querySelector("#result").classList.remove("invisible");
                document.querySelector("#main").innerHTML = opponent.div + player.div;
                document.querySelector("#opponentStand").classList.add("invisible");
                saveMoney();
                updateMoney();
                clearInterval(delay);
                gameOver = true;
            }
            // Tie
            else if (player.total == opponent.total) {
                document.querySelector("#opponentTotal").innerHTML = "Opponent Total:</br>" + opponent.total;
                document.querySelector("#opponentTotal").classList.remove("invisible");
                document.querySelector("#result").innerHTML = "~~~~~Tie~~~~~";
                document.querySelector("#result").classList.remove("invisible");
                document.querySelector("#main").innerHTML = opponent.div + player.div;
                document.querySelector("#opponentStand").classList.add("invisible");
                player.money += player.bet;
                saveMoney();
                updateMoney();
                clearInterval(delay);
                gameOver = true;
            }
        }
    }
}


// Saves the player money
function saveMoney() {
    let money = "nzl6723-money";
    localStorage.setItem(money, player.money.toString())
}


// Gets the player money
function getMoney() {
    let money = "nzl6723-money";
    player.money = parseInt(localStorage.getItem(money));
    if (player.money == null || isNaN(player.money) == true) {
        player.money = 100;
    }
    // Default to 5 money if all money is lost
    if (player.money < 5) {
        player.money = 5;
    }
    document.querySelector("#playerMoney").innerHTML = "Money: <br>" + player.money;
}


// Allows player to bet
function bet(e) {
    if (player.money >= parseInt(e.target.value) && canBet == true) {
        player.money -= e.target.value;
        player.bet += e.target.value;
        document.querySelector("#playerMoney").innerHTML = "Money: <br>" + player.money;
        document.querySelector("#currentBet").innerHTML = "Bet:<br>" + player.bet;
    }
}


// Updates money
function updateMoney() {
    document.querySelector("#playerMoney").innerHTML = "Money: <br>" + player.money;
    document.querySelector("#currentBet").innerHTML = "Bet:<br>0";
}


// Formats cards
function formatCards() {
    for (let i = 0; i < player.cards.length; i++) {
        // Two rows
        if (i >= 3 && i < 6) {
            document.querySelector(`#playerCard${i}`).classList.remove("rowOne");
            document.querySelector(`#playerCard${i}`).classList.add("rowTwo");
            let initialOffset = 35;
            let offset = i - 3;
            document.querySelector(`#playerCard${i}`).style.left = `${initialOffset + offset * 12}%`;
        }
        // Three rows
        else if (i >= 6 && i < 9) {
            document.querySelector(`#playerCard${i}`).classList.remove("rowOne");
            document.querySelector(`#playerCard${i}`).classList.add("rowThree");
            let initialOffset = 38;
            let offset = i - 6;
            document.querySelector(`#playerCard${i}`).style.left = `${initialOffset + offset * 12}%`;
        }
        // Four rows
        else if (i >= 9) {
            document.querySelector(`#playerCard${i}`).classList.remove("rowOne");
            document.querySelector(`#playerCard${i}`).classList.add("rowFour");
            let initialOffset = 41;
            let offset = i - 9;
            document.querySelector(`#playerCard${i}`).style.left = `${initialOffset + offset * 12}%`;
        }
    }

    // Formats opponents cards
    for (let i = 0; i < opponent.cards.length; i++) {
        // Two rows
        if (i >= 3 && i < 6) {
            document.querySelector(`#opponentCard${i}`).classList.remove("rowOne");
            document.querySelector(`#opponentCard${i}`).classList.add("rowTwo");
            let initialOffset = 35;
            let offset = i - 3;
            document.querySelector(`#opponentCard${i}`).style.left = `${initialOffset + offset * 12}%`;
        }
        // Three Rows
        else if (i >= 6 && i < 9) {
            document.querySelector(`#opponentCard${i}`).classList.remove("rowOne");
            document.querySelector(`#opponentCard${i}`).classList.add("rowThree");
            let initialOffset = 38;
            let offset = i - 6;
            document.querySelector(`#opponentCard${i}`).style.left = `${initialOffset + offset * 12}%`;
        }
        // Four Rows
        else if (i >= 9) {
            document.querySelector(`#opponentCard${i}`).classList.remove("rowOne");
            document.querySelector(`#opponentCard${i}`).classList.add("rowFour");
            let initialOffset = 41;
            let offset = i - 9;
            document.querySelector(`#opponentCard${i}`).style.left = `${initialOffset + offset * 12}%`;
        }
    }
}

// Link to Documentation
function link() {
    location.replace("documentation.html")
}
