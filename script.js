var words = []
var word
var answerWord
var currentWord = ""
var letterSpot
var guesses = 1
var tiles
var popup = ["that was alright I guess", "pretty gnarly dude", "could be better", "you got this!", "you can do better than that",
"how embarrasing"]
var time = 30;
var paused = false

function getWord() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "words.txt", true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                allText = allText.toLowerCase();
                //console.log(allText)
                words = allText.split("\n");
                wordValue = getRandomIntInclusive(0, words.length-1);
                answerWord = words[wordValue];
                if (answerword.length === 6) {
                    answerWord = answerWord.slice(0, -1);
                }
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
    if (paused === false) {
        if (currentWord.length < 5) {
            currentWord += key;
            letterSpot = document.getElementById(`${guesses}-${currentWord.length}`);
            letterSpot.innerHTML = key;
            letterSpot.style.backgroundImage = "none";
        }
    }
}

key_input = (event) => {
        //console.log(event.keyCode)
        if (event.keyCode > 64 && event.keyCode < 91) {
            enterLetter(event.key);
        }
        if (event.keyCode === 8) {
            takeback();
        }
        if (event.keyCode === 13) {
            if (currentWord.length === 5) {
                wordtest(currentWord);
            }
            else {
                alert("stop it");
            }
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

function wordtest(word){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word, requestOptions)
        .then(response => response.json())
        .then(result => iswordvalid(result))
        .catch(error => console.log('error', error));  
}

function iswordvalid(def) {
    if (def.length >= 1) {
        check()
    }
    else {
        alert("stop it.")
    }
}

//wordtest();


function check() {
    if (time > 0) {
        paused = true;
        if (currentWord != answerWord) {
            setTimeout(() => {paused = false}, 11000)
            setTimeout(() => {time = 30}, 12000);
        }
        //console.log(currentWord.charCodeAt(5));
        //console.log(answerWord.length);
        //console.log(currentWord==answerWord);
        //console.log(currentWord===answerWord);
        if (currentWord === answerWord) {
            console.log("you win.");
            msg = popup[guesses-1];
            setTimeout(() => {  window.confettiful = new Confettiful(document.querySelector('.game'))}, 11000)
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


var gameover = false

function myTimer() {
  document.getElementById("timer").innerHTML = time;
  if (time > 0 && paused === false) {
  time -= 1
}
else if (time == 0 && gameover === false) {
    clearInterval(myTimer);
    setTimeout(() => {alert(`get em next time tiger \n${answerWord}`)}, 1000);
    gameover = true
}
}




const Confettiful = function (el) {
    this.el = el;
    this.containerEl = null;
  
    this.confettiFrequency = 3;
    this.confettiColors = ['#fce18a', '#ff726d', '#b48def', '#f4306d'];
    this.confettiAnimations = ['slow', 'medium', 'fast'];
  
    this._setupElements();
    this._renderConfetti();
  };
  
  Confettiful.prototype._setupElements = function () {
    const containerEl = document.createElement('div');
    const elPosition = this.el.style.position;
  
    if (elPosition !== 'relative' || elPosition !== 'absolute') {
      this.el.style.position = 'relative';
    }
  
    containerEl.classList.add('confetti-container');
  
    this.el.appendChild(containerEl);
  
    this.containerEl = containerEl;
  };
  
  Confettiful.prototype._renderConfetti = function () {
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div');
      const confettiSize = Math.floor(Math.random() * 3) + 7 + 'px';
      const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
      const confettiLeft = Math.floor(Math.random() * this.el.offsetWidth) + 'px';
      const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];
  
      confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;
  
      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl.parentNode.removeChild(confettiEl);
      }, 3000);
  
      this.containerEl.appendChild(confettiEl);
    }, 25);
  };
  
  window.confettiful = new Confettiful(document.querySelector('.js-container'));