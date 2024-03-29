// Set global variables
var dice = [0,0,0,0,0,0], score =  0, numTurns = 0, strait = false;
var x = 0, rollagain = 1, select = 0, totalScore = 0,extraPoints = false;

document.getElementById("message").innerHTML = "Good Luck!";

function newTurn(){
  document.getElementById("message2").innerHTML = "Total Score: "+ 
  addComma(totalScore) + " in "+ numTurns + " turns";
  document.getElementById("message").innerHTML = "Good Luck!";
  dice = [0,0,0,0,0,0];
  x = 0;
  rollagain = 1;
  roll();
}

//Got this from https://stackoverflow.com/questions/290110
function addComma(num){
  if (num > 999)
 return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  else 
    return num
}

// Bank score and add to total score also add to number of turns
function endTurn(){
  // As long as one dice has been chosen already contine
  if (countXs() > 0){
    numTurns += 1;
    totalScore += score;
  if (totalScore > 10000){
     alert ("You made it to "+ totalScore +" in "+ numTurns + " turn(s)!");
     newGame()
     }
    score = 0;
    document.getElementById("message").innerHTML = "Good Luck!";
    newTurn();
  }
  else 
    document.getElementById("message").innerHTML = "Choose dice before ending turn"
}

function newGame(){
  score = 0;
  numTurns = 0;
  totalScore = 0;
  newTurn();
}

// Deletes previous score on farkle - sets special points
function farkled(){
  if (countXs() == 0 && strait == false){
      alert("You Farkled on first roll 500 points!");
    score += 500;
    extraPoints = true;
  }
  if (extraPoints == false){
  numTurns += 1;
  score = 0;
  }
  extraPoints = false;
  newTurn();
}

// Runs thru dice array and counts the x's and returns count
function countXs(){
  x = 0;
  for (var i = 0; i <= 5; i++){
  if (dice[i] == "x")
    x = x + 1;
  }
  return x;
}

  /* count number of 1's and 5's and multiples of a
  number to test if user is able to roll again or if
  it going to be game over */
function count153(){
  x = 0;
  xstring = "";
  for (var i = 0; i <= 5; i++){
    if (dice[i] == "1" || dice[i] == "5")
      x += 1;
      xstring += dice[i]
  }if (xstring.replace(/[^1]/g, "").length >= 3)
     //count number of times 3 or more of a kind
     // Code from internet
     
     if (xstring.replace(/[^1]/g, "").length >= 3)
        x += 1;
     if (xstring.replace(/[^2]/g, "").length >= 3)
        x += 1;
     if (xstring.replace(/[^3]/g, "").length >= 3)
        x += 1;
     if (xstring.replace(/[^4]/g, "").length >= 3)
        x += 1;
     if (xstring.replace(/[^5]/g, "").length >= 3)
       x += 1;
     if (xstring.replace(/[^6]/g, "").length >= 3)
       x += 1;
       
     if (findUnique(xstring) == 6){
         strait = true;
         farkled()
       }
       
     return x;
}

function gameover(){
      if (count153() == 0 && rollagain == 0) {
      if (countXs() != 6){
         document.getElementById("choose").innerHTML = '<button onclick="farkled()">You "Farkled" - New Turn</button>' ;
         }
      else 
          document.getElementById("choose").innerHTML = '<button onclick="newTurn()">HotDice! - Roll Again</button>' ;
         
      }
}

function roll() { 
   document.getElementById("message2").innerHTML = "Total Score: "+ 
   addComma(totalScore) + " in "+ numTurns + " turns";
   
   if (rollagain ==1 || countXs() == 6){
    for (var i = 0; i <=5; i++){
      if (dice[i] != "x")
         dice[i] = Math.floor(Math.random() * 6) + 1;  
      rollagain = 0;
      displayDice();
      }
     }
     else if (rollagain == 0){
       document.getElementById("message").innerHTML = "Please pick dice before rolling";   
       }
}

//Shows the new value of the dice and displays the button options

function displayDice() {
  document.getElementById("htmlDice").innerHTML = ("(You rolled: " +
    dice[0] + ", " + dice[1] + ", " + dice[2] + ", " +
    dice[3] + ", " + dice[4] + ", " + dice[5] + ")<br>"+
               "Which dice :1, 2, 3, 4, 5, 6");
  document.getElementById("choose").innerHTML = '<button onclick="pick1()">1 Dice</button>'+
'<button onclick="pickmany()">3 or more of a kind</button>' + 
 '<button onclick="roll()">Roll Again</button>' +  '<button onclick="endTurn()">End Turn</button>'

  document.getElementById("score").innerHTML = "Your Score this turn is : " + addComma(score);
gameover();
}

/* Get user numbers using switch to get multiple
numbers and add them to two strings first one diceNum
is a string with the dice selection the second is
a string with the dice value. Then check these to see
if difrent dice are selected and if the values are all
the same */

function pickmany(){
  var diceNum = "", diceValue ="";
  var choice = prompt("How many of a kind",""); 

  if (choice == 1){
    pick1();
    return
  }

//Creates to strings diceNum (# of dice 1-6) and diceValue value on dice

  switch(choice){
  case "6":
    select6 = prompt("6 Left to choose:","");
    diceNum += select6;
    diceValue += dice[select6 -1];
  case "5":
    select5 = prompt("5 Left to choose:","");
    diceNum += select5;
    diceValue += dice[select5 -1];
  case "4":
    select4 = prompt("4 Left to choose:","");
    diceNum += select4;
    diceValue += dice[select4 -1];
  case "3":
    select3 = prompt("3 Left to choose:","");
    diceNum += select3;
    diceValue += dice[select3 -1];
    select2 = prompt("2 Left to choose:","");
    diceNum += select2;
    diceValue += dice[select2 -1];
    select1 = prompt("1 Left to choose:","")
    diceNum += select1;
    diceValue += dice[select1 -1];
  }
  
  var uniqueNum = findUnique(diceNum);
  var uniqueValues = findUnique(diceValue);

// displays issues with user choice
  if (uniqueNum != diceNum.length)
    document.getElementById("message").innerHTML ="You can only choose each dice once";
  if (uniqueValues != 1)
    document.getElementById("message").innerHTML ="Please choose 3 or more of the same kind";
  if (diceNum.length < 3)
    document.getElementById("message").innerHTML ="Please choose 3 or more dice";
  
  //check if there is an x in diceValue
  x = 0
  for (var i = 0; i <= 5; i++){
  if (diceValue.charAt(i) == "x")
    x = x + 1;
  }
  if (x > 0)
    document.getElementById("message").innerHTML ="Please don't choose any x's";
  
/* As long as there at least 3 dice choosen and they are all unique numbers
and the dice values are all the same then continue */

  if ( (diceNum.length >= 3) && 
  (uniqueNum == diceNum.length) && 
  (uniqueValues == 1) ){

//Setup to find the score
    var addNumAmount = 0;      
    switch(diceNum.length){  
    case 6:
      dice[select6 -1] = "x";
      addNumAmount += 100 * diceValue.charAt(0);
    case 5:
      dice[select5 -1] = "x";
      addNumAmount += 100 * diceValue.charAt(0);
    case 4:
      dice[select4 -1] = "x";
      addNumAmount += 100 * diceValue.charAt(0);
    case 3:
      addNumAmount += 100 * diceValue.charAt(0);
      dice[select3 -1] = "x";
      dice[select2 -1] = "x";
      dice[select1 -1] = "x";
      select = "";
    }
    //scoring for 1's
      if (diceValue.charAt(0) == 1){
        addNumAmount = 0;
      if (diceNum.length == 3)
        addNumAmount = 1000;
      if (diceNum.length == 4)
        addNumAmount = 2000;
      if (diceNum.length == 5)
        addNumAmount = 3000;
      if (diceNum.length == 6)
        addNumAmount = 4000;
    }
    changeScore(addNumAmount)
  }

}

//Finding number of unique char using loops
function findUnique(testString){
  var  numChar = 0, uniqueChar = 0
  for (pos = 0; pos < testString.length; pos++){
    for (pos2 = 0; pos2 <= pos; pos2++){
        if (testString.charAt(pos) == testString.charAt(pos2) && 
        testString.charAt(pos2) != " "){
          numChar +=1;  
        }
     }   
     if (numChar == 1){
       uniqueChar += 1;
       }
     numChar = 0;
  }
  return uniqueChar;
}

function changeScore(addScore){
        score += addScore;
        document.getElementById("message").innerHTML = "You gained "+addComma(addScore)+"!";
        document.getElementById("score").innerHTML = "Your score is :" + score;    
        rollagain = 1;
        displayDice(); 
}

//If one dice only is chosen
function pick1(){
select = prompt("Choose 1 dice","");
    select -=1;
      if (dice[select] == 1){
        dice[select] = "x"
        changeScore(100);
      }
      else if (dice[select] == 5){
        dice[select] = "x"
        changeScore(50);
      }
      else if (dice[select] == "x"){
            document.getElementById("message").innerHTML = "Please pick a dice without an x"; 
      }
     else {
     document.getElementById("message").innerHTML = "Please pick a dice with a 1 or a 5 "; 
     }

}
