var words = []
var word
var answerWord

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

readTextFile("words.txt")
/*console.log(words)*/

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomWord() {
    wordValue = getRandomIntInclusive(0, words.length-1);
    word = words[wordValue];
    //console.log(word);
}

getRandomWord()
setTimeout((answerWord = getRandomWord()) => {}, 100);

console.log(word);