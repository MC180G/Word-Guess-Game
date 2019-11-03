var wordGuessGame = {

  wordsToPick: {
    douglas: { picture: "mikedouglas.jpg" },
    keaton: { picture: "mikekeaton.jpg" },
    caine: { picture: "mikecaine.jpg" },
    jackson: { picture: "mikejackson.jpg" },
    vick: { picture: "mikevick.jpg" },
    jordan: { picture: "mikejordan.jpg" },
    stipe: { picture: "mikestipe.jpg" },
    bolton: { picture: "mikebolton.jpg" },
    shannon: { picture: "mikeshannon.jpg" },
    richards: { picture: "mikerichards.jpg" },
    bay: { picture: "mikebay.jpg" },
    imperioli: { picture: "mikeimp.jpg" },
    landon: { picture: "mikelandon.jpg" },
    cera: {picture: "mikecera.jpg" },
    che: {picture:"mikeche.jpg" }
  },

  targetWord: null,
  wordLetters: [],
  correctLetters: [],
  usedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterUsed: null,
  wins: 0,

  setupGame: function () {
    // Choose a Micheal
    var objKeys = Object.keys(this.wordsToPick);
    this.targetWord = objKeys[Math.floor(Math.random() * objKeys.length)];

    //Divide up into letters

    this.wordLetters = this.targetWord.split("");

    //Lays out blank word as dashes

    this.rebuildWordView();

    // user Guesses

    this.processUpdateTotalGuesses();
  },

  //User guesses

  updatePage: function (letter) {

    if (this.guessesLeft === 0) {
      this.restartGame();
    } 
    
    else {

      this.updateGuesses(letter);

      this.updateMatchedLetters(letter);

      this.rebuildWordView();

      if (this.updateWins() === true) {
        this.restartGame();
      }
    }
  },

  // If user guesses wrong...

  updateGuesses: function (letter) {

    if ((this.usedLetters.indexOf(letter === -1) && this.wordLetters.indexOf(letter) === -1)) {

      this.usedLetters.push(letter);

      this.guessesLeft--;

      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML = this.usedLetters.join(", ");
    }
  },

  processUpdateTotalGuesses: function () {

    this.totalGuesses = this.wordLetters.length + 5;
    this.guessesLeft = this.totalGuesses;

    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },

  updateMatchedLetters: function (letter) {

    for (var i = 0; i < this.targetWord.length; i++) {

      if ((letter === this.wordLetters[i]) && (this.correctLetters.indexOf(letter) === -1)) {
        this.correctLetters.push(letter);
      }

    }

  },

  rebuildWordView: function () {

    var wordView = "";

    for (var i = 0; i < this.targetWord.length; i++) {

      if (this.correctLetters.indexOf(this.wordLetters[i]) !== -1) {
        wordView += this.wordLetters[i];
      } else { wordView += "&nbsp;_&nbsp;"; }

    }

    document.querySelector("#current-word").innerHTML = wordView;
  },

  restartGame: function () {
    document.querySelector("#guessed-letters").innerHTML = "";
    this.targetWord = null;
    this.wordLetters = [];
    this.correctLetters = [];
    this.usedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterUsed = null;
    this.setupGame();
    this.rebuildWordView();
  },

  updateWins: function () {
    var win;

    if (this.correctLetters.length === 0) {
      win = false;
    } else { win = true }

    for (var i = 0; i < this.targetWord.length; i++) {
      if (this.correctLetters.indexOf(this.wordLetters[i]) === -1) {
        win = false
      }
    }
    if (win) {
      this.wins = this.wins + 1;

      document.querySelector("#wins").innerHTML = this.wins;



      document.querySelector("#mike-div").innerHTML =
        "<img id='mike-image' src='assets/images/" +
        this.wordsToPick[this.targetWord].picture + "' alt='" +
        this.wordsToPick[this.targetWord].song + "'>";

      var audio = new Audio(this.wordsToPick[this.targetWord].preview);
      audio.play();

      return true;
    }
    return false;
  }
};

wordGuessGame.setupGame();

document.onkeyup = function (event) {
  if (event.keyCode >= 49 && event.keyCode <= 90) {
    wordGuessGame.letterUsed = event.key.toLowerCase();
    wordGuessGame.updatePage(wordGuessGame.letterUsed);
  }
};
