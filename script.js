// ROCK     // PAPER   // SCISSORS
// Z 90     // X 88    // C 67
// I 73     // O 79    // P 80


// Players agree on number of rounds
// Hit enter to begin
// Each player chooses R, P, or S
    // Listen for keydown
    // save choice in two variables
// Ensure both players played hands
        //// Print choices to page
// Compare hands, declare winner of round, add to score
// Check score to see if there's a winner
    // If no winner, repeat from step 2 

const game = {
    rounds: null,
    p1: {
        name: 'Player 1',
        keys: [90, 88, 67],
        score: 0,
        hand: null
    },
    p2: {
        name: 'Player 2',
        keys: [73, 79, 80],
        score: 0,
        hand: null
    }
}

const p1 = game.p1;
const p2 = game.p2;


const rock = `<img class="rock svg" src="assets/rock.svg" alt="Hand by Josie Schultz from the Noun Project"></img>`

const paper = `<img class="paper svg" src="assets/paper.svg" alt="Hand by Josie Schultz from the Noun Project">`

const scissors = `<img class="scissors svg" src="assets/scissors.svg" alt="Peace by Josie Schultz from the Noun Project">`

const app = {}

app.reset = () => {

    $("body").on('keydown', (e) => {
        if (e.which === 13) {
            p1.hand = null;
            p2.hand = null;
            $('figure').empty();

            app.ready();
        }
    });
};

app.check = () => {
    if(p1.hand === p2.hand){
        console.log('no one wins');
    }
    
    else if(
        (p1.hand === rock && p2.hand === scissors) ||
        (p1.hand === paper && p2.hand === rock) ||
        (p1.hand === scissors && p2.hand === paper) ){
        console.log('player 1 wins');
        p1.score++
        $('.p1-score').text(p1.score);
        
    } 
    
    else if(
        (p1.hand === rock && p2.hand === paper) ||
        (p1.hand === paper && p2.hand === scissors) ||
        (p1.hand === scissors && p2.hand === rock) ){
        console.log('player 2 wins')
        p2.score++
        $('.p2-score').text(p2.score);
    }
    app.reset();
};

app.printHands = () => {
    $(".p1-hand").append(p1.hand);
    $(".p2-hand").append(p2.hand);
    app.check();
};

app.keysOff = () => {
    if(p1.hand !== null && p2.hand !== null){
        $("body").off("keydown");
        console.log(p1.hand + " vs " + p2.hand);
        $('figure').empty();
        app.printHands();
    }
};

app.play = (player, key) => {
    if(player.hand === null){
        if(key === player.keys[0]){
            player.hand = rock;
        }
        else if(key === player.keys[1]){
            player.hand = paper;
        }
        else if(key === player.keys[2]){
            player.hand = scissors;
        }
    }
}

app.ready = () => {
    $('body').on('keydown', function(e){
        if (e.which === 13) {

            $("body").on('keydown', function(key){
                app.play(p1, key.which);
                app.play(p2, key.which);

                app.keysOff();
            });

        }; // end of if "enter" keydown event

    }); // end of body selector
};

app.setup = () => {
    $('form').on('submit', function(e){
        e.preventDefault();
        p1.name = $('input[name=p1-name]').val();
        if(!p1.name.length){
            p1.name = "Jack Traven";
        }
        $('.p1-name').text(p1.name);
        p2.name = $('input[name=p2-name]').val();
        if (!p2.name.length) {
            p2.name = "Richard Kimble";
        }
        $('.p2-name').text(p2.name);
        game.rounds = Number($('select').val());
        $('.overlay').css('display', 'none');
    }); // end of form submit

    app.ready();
}

$(function(){
    app.setup();
});