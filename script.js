var words = []
var word
var answerWord
var currentWord = ""
var letterSpot
var guesses = 1
var tiles
var popup = ["that was alright I guess", "pretty gnarly dude", "could be better", "you got this!", "you can do better than that",
"how embarrasing"]

function getWord() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "words.txt", true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                console.log(allText)
                words = allText.split("\n");
                wordValue = getRandomIntInclusive(0, words.length-1);
                answerWord = words[wordValue];
                console.log(answerWord);
            }
        }
    }
    rawFile.send(null);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/*function getRandomWord() {
    wordValue = getRandomIntInclusive(0, words.length-1);
    word = words[wordValue];
    //console.log(word);
    console.log(word);
    return word;
}*/


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
    if (currentWord.length === 5) {
        console.log(currentWord);
        console.log(answerWord);
        if (currentWord == answerWord) {
            console.log("you win.");
            msg = popup[guesses-1];
            setTimeout(() => { alert(msg) }, 13000);
        }
        for (let i = 1; i < 6; i++) {
            tiles = document.getElementById(`${guesses}-${i}`);
            currentKeyTile = document.getElementById(`${currentWord[i-1]}`)
            if (answerWord.includes(currentWord[i-1])) {
                if (answerWord[i-1] === currentWord[i-1]) {
                    tiles.classList.add("green");
                    currentKeyTile.style.backgroundColor = "green";
                }
                else{
                    tiles.classList.add("yellow");
                    currentKeyTile.style.backgroundColor = "yellow";
                }
            }
            else{
                tiles.classList.add("graeeaaey");
                currentKeyTile.style.backgroundImage = 'url("sadbigbird.jpg")';
                currentKeyTile.innerHTML = "";
            }
        }
        guesses +=1;
        currentWord = "";
        if (guesses == 7) {
            setTimeout(() => { alert(`get em next time tiger \n${answerWord}`) }, 13000);
        }
    }
}

addEventListener("keydown", key_input);

answerWord = getWord();


setInterval(myTimer, 1000);

var time = 30;

function myTimer() {
  document.getElementById("timer").innerHTML = time;
  if (time > 0) {
  time -= 1
}
  else if (time == 0) {
  clearInterval(myTimer);
}
  
}