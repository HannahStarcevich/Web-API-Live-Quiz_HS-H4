// get string from the local storage 

var myListOfHighScoresInLocalStorage = localStorage.getItem("userNameAndHighScore");

// parse out the string into the array of objects 

myListOfHighScoresInLocalStorage = JSON.parse(myListOfHighScoresInLocalStorage);

// print the items to the UL on the screen 

for (var i = 0; i < myListOfHighScoresInLocalStorage.length; i++) {
    var name = myListOfHighScoresInLocalStorage[i].name;
    var score = myListOfHighScoresInLocalStorage[i].score;
    $(".high-score-list-wrapper").append(`<li>Name: ${name} Score: ${score}</li>`)
}