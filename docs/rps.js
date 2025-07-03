let comMove = "";
        let userMove = "";

        let score = JSON.parse(localStorage.getItem("score"));
         score = { player: 0, computer: 0, tie: 0 };

        comMove=comPick();
        
     function comPick(){
        const randomNumber=Math.random();
      if (randomNumber >= 0 && randomNumber < 1/3 ){
        
        return "rock"
        
      }
      else if (randomNumber >= 1/3 && randomNumber < 2/3 ){
        
        return "paper"
      }
      else if (randomNumber >= 2/3 && randomNumber < 1 ){
         
         return "sissor"
      }
      else {
        console.log("Error: Invalid random number");
      }
      }


            function check() {
document.querySelectorAll(".who-move")[0].innerText = "Computer Move:";
document.querySelectorAll(".who-move")[1].innerText = "Your Move:";
document.querySelectorAll(".circle img")[0].src = `images/${comMove}.svg`;
document.querySelectorAll(".circle img")[1].src = `images/${userMove}.svg`;

        if (userMove === comMove) {
          document.querySelector('.who-won').innerText = "It's a tie!";
          score.tie += 1;
        }
        else if ((userMove === "rock" && comMove === "sissor") ||
                 (userMove === "paper" && comMove === "rock") ||
                 (userMove === "sissor" && comMove === "paper")) {
          document.querySelector('.who-won').innerText = "You win!";
          score.player += 1;
        }
        else if ((comMove === "rock" && userMove === "sissors") ||
                 (comMove === "paper" && userMove === "rock") ||
                 (comMove === "sissor" && userMove === "paper")) {
          document.querySelector('.who-won').innerText = "Computer wins!";
          score.computer += 1;
        }
        else {
          console.log("Invalid move");
        }
        localStorage.setItem("score", JSON.stringify(score));
        document.querySelector(".score").innerText = `player:${score.player} computer:${score.computer} tie:${score.tie}`;
      
        comMove = comPick();
       
        updateScoreDisplay();
      }
      
      /*function updateMovesDisplay() {
        const whoMoves = document.querySelectorAll(".move-div .who-move");
        whoMoves[0].innerHTML = `Computer Move: <img class="pick" src="images/${comMove}.svg">`;
        whoMoves[1].innerHTML = `Your Move: <img class="pick" src="images/${userMove}.svg">`;
      }*/

        function reset(){
        userMove = "";
        comMove = comPick();
        document.querySelector('.who-won').innerText = "no one";
        const whoMoves = document.querySelectorAll(".move-div .who-move");
        whoMoves[0].innerHTML = "Computer Move:";
        whoMoves[1].innerHTML = "Your Move:";
        score = { player: 0, computer: 0, tie: 0 };
        localStorage.removeItem("score");
        document.querySelector(".score").innerText=`player:${score.player} computer:${score.computer} tie:${score.tie}`;
    }


    function updateScoreDisplay() {
  document.querySelector(".score").innerText =
    `player:${score.player} computer:${score.computer} tie:${score.tie}`;
}

