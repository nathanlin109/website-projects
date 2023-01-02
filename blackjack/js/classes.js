// Card class
class Card {
    constructor(value = 0, suit = "diamond", id = "number", src = "<img src=\"media/images/cards/card-back.png\" alt=\"\" class=\"rowOne\" ") {
        this.value = value;
        this.suit = suit;
        this.id = id;
        this.src = src;
    }
}

// Player class
class Player {
    constructor(name = "",total = 0, cards = [], stand = false) {
        this.name = name;
        this.total = total;
        this.cards = cards;
        this.stand = stand;
        this.div = "<div class=\"hand\"></div>";
        this.cardBackDiv = "<div class=\"hand\"></div>";
        this.money = 100;
        this.bet = 0;
    }
}