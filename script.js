var words = []
var word
var answerWord
var currentWord = ""
var letterSpot
var guesses = 1
var tiles

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                console.log(allText)
                words = allText.split("\n");
            }
        }
    }
    rawFile.send(null);
}

readTextFile("words.txt");
console.log(words)

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomWord() {
    wordValue = getRandomIntInclusive(0, words.length-1);
    word = words[wordValue];
    //console.log(word);
    console.log(word);
    return word;
}
answerWord = getRandomWord();
console.log(answerWord);

function enterLetter(key) {
    if (currentWord.length < 5) {
        currentWord += key;
        letterSpot = document.getElementById(`${guesses}-${currentWord.length}`);
        letterSpot.innerHTML = key;
        letterSpot.style.backgroundImage = "none";
    }
}

key_input = (event) => {
    console.log(event.keyCode);
    if (event.keyCode > 64 && event.keyCode < 91) {
        enterLetter(event.key);
    }
    if (event.keyCode === 8) {
        takeback();
    }
    if (event.keyCode === 13) {
        check()
    }
}

function takeback() {
    if (currentWord.length > 1) {
        letterSpot = document.getElementById(`${guesses}-${currentWord.length}`);
        letterSpot.innerHTML = "";
        letterSpot.style.backgroundImage = 'url("tiles.png")';
        currentWord = currentWord.slice(0, -1);
    }
    else {
        letterSpot = document.getElementById(`${guesses}-${1}`);
        letterSpot.innerHTML = "";
        letterSpot.style.backgroundImage = 'url("tiles.png")';
        currentWord = "";
    }
}




function check() {
    console.log("test");
    answerWord = "hello";
    console.log(currentWord);
    console.log(answerWord);
    if (currentWord.length === 5) {
        if (currentWord === answerWord) {
            console.log("you win.");
        }
        for (let x = 1; x < 6; x++) {
            tiles = document.getElementById(`${guesses}-${x}`);
            currentTile = document.getElementById(`${currentWord[i-1]}`)
            if (answerWord.includes(currentWord[i-1])) {
                if (answerWord[i-1] === currentWord[i-1]) {
                    tiles.classList.add("green");
                    currentTile.style.backgroundColor = "green";
                }
            }
        }
    }
}

addEventListener("keydown", key_input);
//setTimeout((answerWord = getRandomWord()) => {}, 100);