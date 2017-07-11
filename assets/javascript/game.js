
//if you're looking at this you're cheating. And you should be ashamed.
var words = [
	"spaghetti",
	"calisthenics",
	"compensation",
	"arrivederci",
	"tnetennba",
	"moss",
	"countdown"
]

const numberOfWords = 7;

var chances = 6;

var wins = 0;

var losses = 0;

function init() {

	let word = randomWord();
	let game = document.getElementById("game");
	let div;
	
	for (let i = 0; i < word.length; i++) {
		div = document.createElement("div");
		div.setAttribute("class", "appendedDivs");
		game.appendChild(div);

	}

	initPressedKeysDiv();

	return word;

	function randomWord() {
		return words[Math.floor(numberOfWords * Math.random())];
	}

	function initPressedKeysDiv() {
		let pressed = document.getElementById("keys");
		pressed.innerHTML = "Press any key to get started!";
	}

}

function isGameOver() {
	
	if (chances === 0) {
		incrementLosses();
		return true;
	}

	if (foundIndices.length === word.length) {
		incrementWins();
		return true;
	}

	return false;

	function incrementWins() {
		let winning = document.getElementById("wins");
		wins++;
		winning.innerHTML = "WINS: " + wins.toString();
	}

	function incrementLosses() {
		let losing = document.getElementById("losses");
		losses++;
		losing.innerHTML = "LOSSES: " + losses.toString();
	}
}

function resetBoard(className) {
	var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }

}

var word = init();

var incorrectGuesses = [];
var pressed = document.getElementById("keys");
var foundIndices = [];
var booleanFlag = false;
var gameOver = false;

document.onkeyup = function(event) {

	let selectedkey = event.key; 

	for (let i = 0; i < word.length; i++) {
		if (word.charAt(i).toLowerCase() === selectedkey.toLowerCase() && !foundIndices.includes(i)) {
			let divs = document.getElementsByClassName("appendedDivs");
			divs[i].innerHTML = '' + selectedkey;
			foundIndices.push(i);
			pressed.innerHTML = "Incorrect Guesses: " + incorrectGuesses.toString();
			booleanFlag = true;
		}
	}

	if (!booleanFlag) {
		incorrectGuesses.push(selectedkey);
		pressed.innerHTML = "Incorrect Guesses: " + incorrectGuesses.toString();
		chances--;
	}

	booleanFlag = false;

	gameOver = isGameOver();

	if(gameOver) {
		resetBoard('appendedDivs');
		foundIndices = [];
		incorrectGuesses = [];
		chances = 6;
		word = init();
	}
};
