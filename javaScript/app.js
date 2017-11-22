/*
GAME RULES:
Players will take turns rolling the dice, each player may roll the dice as many times as they want.
To end your turn press the "HOLD" button and your current points will be added to your total points.
The first player to reach the number of points chosen at the beginning of the game without going over wins.
If you go over you will loose all your points.
If you role a one you will loose your current points and your turn will be over.
If you role two 6s in a row or double 6s you will loose all your points and your turn will be over.
*/

var scores, roundScore, activePlayer, gamePlaying, diceOld, diceOld2;


init();


document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){       
        //1. Get Random Number
        var dice = Math.ceil(Math.random()*6);
        var dice2 = Math.ceil(Math.random()*6);


        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'images/dice-' + dice + '.PNG';
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'images/dice-' + dice2 + '.PNG';

        //3. Update the round score IF the rolled number is NOT a 1, clear if dice is 6 and 6
        if(dice === 6 && dice2 === 6 || dice === 6 && diceOld === 6 || dice2 === 6 && diceOld2 === 6 || dice2 === 6 && diceOld === 6 || dice === 6 && diceOld2 === 6){
            //Player looses score
            loosePoints();
            alert("You rolled two sixes in a row, your turn is over and all your points are GONE!");
            nextPlayer();
        }
        else if (dice !== 1 && dice2 !== 1){
            //Add Score
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            diceOld = dice;
            diceOld2 = dice2;
        }
        else{
            //Next Player
            alert("You rolled a 1, your turn is over, you earned 0 points this turn!");
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Set the number of points players will play to
        var winningScoreInput = document.querySelector('.winningScore').value;
        var winningScoreValue;

        if(winningScoreInput){
            winningScoreValue = winningScoreInput;
        }
        else{
            winningScoreValue = 100;
        }

        //Check if player won the game
        if(scores[activePlayer] == winningScoreValue){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else if(scores[activePlayer] > winningScoreValue){
            loosePoints();
            alert("You went over, your turn is over and all your points are GONE!");
            nextPlayer();
        }        
        else{
            //Next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);





//Don't Repeat Yourself (DRY) functions
function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    diceOld = 1;
    diceOld2 = 1;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function loosePoints(){
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
}