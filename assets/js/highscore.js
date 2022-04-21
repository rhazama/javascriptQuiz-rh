var highScore = document.querySelector(".headOfDisplay-main-text");
var clearBtn = document.querySelector("#clear-button");
var backBtn = document.querySelector("#back-button");

var data = [
    {
    name: '',
    score: 0
    }
];

//retrieve the local storage
var stringify = JSON.stringify(data);

console.log(stringify);
var get = localStorage.getItem("userScores");

var parse = JSON.parse(get);

localStorage.setItem("userScores", stringify);
   // for (var i = 0; i < userScores.length; i++) {
    //    var highScoreEl = document.createElement("li");
    //    highScoreEl.textContent = userScores[i].initials + " " + userScores[i].score;
    //    highScoreEl.setAttribute("class", "li")
    //    highScore.appendChild(highScoreEl);
   // }

   // clearBtn.addEventListener("click", function (){
  //  localStorage.clear();
   // location.reload();
// });

//return to quiz home
//backBtn.addEventListener("click", function (){
  //  window.location.replace("./index.html");
//});