// ROCK     // PAPER   // SCISSORS
// Z 90     // X 88    // C 67
// I 73     // O 79    // P 80


// Players enter names and agree on number of rounds
// Hit enter to begin
// Each player chooses R, P, or S
    // Listen for keydown
    // save choice in two variables
// Ensure both players played hands
        //// Print choices to page
// Compare hands and declare winner of round
// Compare leading score to games to win
// Update score and update background accordingly
    // Everytime the score is tied, subtract from games to win and reset score


const game = {
    rounds: {
        bestOf: null,
        toWin: null,
        count: 0
    },
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


const rock = `<img class="rock svg" src="assets/rock.svg">`

const paper = `<img class="paper svg" src="assets/paper.svg">`

const scissors = `<img class="scissors svg" src="assets/scissors.svg">`

const app = {}

app.reset = () => {

    $("body").on('keydown', (e) => {
        if (e.which === 13) {
            $('.winner').remove();
            p1.hand = null;
            p2.hand = null;
            $('figure').empty();

            app.ready();
        }
    })
}

app.announceWinner = (player) => {
    const winner = `<h3>${player.name} wins!</h3>`;
    const winnerDiv = $('<div class="winner">').html(`<p>${winner} (Hit enter.)</p>`);
    $('main').append(winnerDiv);
}

app.updateBg = (num) => {
    $('main').css('background', `linear-gradient(-75deg, darkorange ${num}%, dodgerblue ${num}%)`)
}

app.calcRatio = () => {
    const diff = p1.score - p2.score;
    const gamesPlayed = p1.score + p2.score;
    const ratio = diff / (gamesPlayed - (game.rounds.bestOf + 1));
    const adjust = (ratio * 50) + 50;
    console.log('ratio:' + ratio);
    console.log('adjustment:' + adjust);
    console.log('p1:' + p1.score, 'p2:' + p2.score);
    app.updateBg(adjust);

}

app.updateScore = () => {
    
    if(p1.hand === p2.hand){
        console.log('no one wins');
        const tie = `<h3>Tie!</h3>`;
        const tieDiv = $('<div class="winner">').html(`<p>${tie} (Hit enter.)</p>`);
        $('main').append(tieDiv);
    }
    
    else if(
        (p1.hand === rock && p2.hand === scissors) ||
        (p1.hand === paper && p2.hand === rock) ||
        (p1.hand === scissors && p2.hand === paper) ){
            game.rounds.count++;
            p1.score++
            $('.p1-score').text(p1.score);
            app.announceWinner(p1);
            
        } 
        
    else if(
        (p1.hand === rock && p2.hand === paper) ||
        (p1.hand === paper && p2.hand === scissors) ||
        (p1.hand === scissors && p2.hand === rock) ){
            game.rounds.count++;
            p2.score++
            $('.p2-score').text(p2.score);
            app.announceWinner(p2);
    }
    
    app.calcRatio()
    app.reset();
    
}

app.checkGameWinner = () => {
    
    if (p1.score === Math.ceil(game.rounds / 2) || p2.score === Math.ceil(game.rounds / 2)) {
        console.log("game over!");
    }
    app.updateScore();
    
};

app.printHands = () => {
    $(".p1-hand").append(p1.hand);
    $(".p2-hand").append(p2.hand);
    app.checkGameWinner();
}

app.keysOff = () => {
    if(p1.hand !== null && p2.hand !== null){
        $("body").off("keydown");
        // console.log(p1.hand + " vs " + p2.hand);
        $('figure').empty();
        app.printHands();
    }
}

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
    // if(player.hand) {
    //     console.log(player.hand);
    // }
}

app.ready = () => {

    $("body").on('keydown', function(key){
        app.play(p1, key.which);
        app.play(p2, key.which);

        app.keysOff();
    })
}

app.closeKeys = () => {
    $('body').on('keydown', function (e) {
        if (e.which === 13) {
            $('.keys').css('display', 'none');
        }
    })

    $('.close').on('click', function(){
        $('.keys').css('display', 'none');
    })
    app.ready();
}

app.setup = () => {
    $('form').on('submit', function(e){
        e.preventDefault();
        p1.name = $('input[name=p1-name]').val();
        if(!p1.name.length){
            p1.name = "Jack Traven";
        }
        $('.p1-name').text(p1.name);
        $('.p1-score').text(p1.score);
        p2.name = $('input[name=p2-name]').val();
        if (!p2.name.length) {
            p2.name = "Richard Kimble";
        }
        $('.p2-name').text(p2.name);
        $('.p2-score').text(p2.score);
        game.rounds.bestOf = Number($('select').val());
        game.rounds.toWin = Math.ceil(game.rounds.bestOf / 2);
        $('.setup').css('display', 'none');        
        $('.keys').css('display', 'grid');
    })

    app.closeKeys();
}

app.hideFooter = () => {
    $('.tuck').on('click', function () {
        $('h2').toggleClass('hide');
        $('h6').toggleClass('hide');
        $('img').toggleClass('down');
    })
}

$(function(){
    app.setup();
    app.hideFooter();
});