// ROCK     // PAPER   // SCISSORS
// Z 90     // X 88    // C 67
// I 73     // O 79    // P 80


// Players agree on number of rounds
// Hit enter to begin
// Each player chooses R, P, or S
    // Listen for keydown
    // save choice in two variables
// Ensure both players played hands
// Compare hands, declare winner of round, add to score
// Check score to see if there's a winner
    // If no winner, repeat from step 2 

const game = {
    rounds: null,
    p1: {
        keys: [90, 88, 67],
        score: 0,
        hand: null
    },
    p2: {
        keys: [73, 79, 80],
        score: 0,
        hand: null
    }
}

const p1 = game.p1;
const p2 = game.p2;

const app = {}


app.reset = () => {
    p1.hand = null;
    p2.hand = null;

    app.ready();
}

app.check = () => {
    if(p1.hand === p2.hand){
        console.log('no one wins');
        app.reset();
    }
    
    else if(
        (p1.hand === "rock" && p2.hand === "scissors") ||
        (p1.hand === "paper" && p2.hand === "rock") ||
        (p1.hand === "scissors" && p2.hand === "paper") ){
        console.log('player 1 wins');
        p1.score++
        app.reset();
    } 
    
    else if (
        (p1.hand === "rock" && p2.hand === "paper") ||
        (p1.hand === "paper" && p2.hand === "scissors") ||
        (p1.hand === "scissors" && p2.hand === "rock") ){
        console.log('player 2 wins');
        p2.score++
        app.reset();
    }
}


app.keysOff = () => {
    if(p1.hand !== null && p2.hand !== null){
        $("body").off("keydown");
        console.log(p1.hand + " vs " + p2.hand)
    }
    app.check();
};

app.play = (player, key) => {
    if(player.hand === null){
        if(key === player.keys[0]){
            player.hand = 'rock';
            console.log(player.hand);
        }
        else if(key === player.keys[1]){
            player.hand = 'paper';
            console.log(player.hand);
        }
        else if(key === player.keys[2]){
            player.hand = "scissors"
            console.log(player.hand);
        }
    }
}

app.ready = () => {
    $("body").on('keydown', function (e) {
        if (e.which === 13) {

            $("body").on('keydown', function (key) {
                app.play(p1, key.which);
                app.play(p2, key.which);
                app.keysOff();
            });

        }; // end of if "enter" keydown event

    }); // end of body selector
};

// rounds = Number(prompt("Pick a number of rounds to play"));
// if(rounds % 2 === 0){
//    rounds = Number(prompt("Choose an odd number")); 
// }

$(function(){

    app.ready();

}); // end of document ready