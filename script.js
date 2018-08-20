// ROCK     // PAPER   // SCISSORS
// Z 90     // X 88    // C 67
// I 73     // O 79    // P 80

const game = {
    rounds: {
        bestOf: null,
        toWin: null,
        count: 1
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

const app = {}

const p1 = game.p1;
const p2 = game.p2;

const rock = `<img class="rock svg" src="assets/rock.svg">`
const paper = `<img class="paper svg" src="assets/paper.svg">`
const scissors = `<img class="scissors svg" src="assets/scissors.svg">`


app.endGame = () => {

};

// resets keys, deletes hand from page, then begins next round
app.reset = () => {
    $('body').on('keydown', function(e) {
        if(e.which === 13) {
            $('.winner').remove();
            p1.hand = null;
            p2.hand = null;
            $('figure').empty();

            app.ready();
        }
    });
};

// updates background to reflect score
app.updateBg = (num) => {
    $('main').css('background', `linear-gradient(-75deg, darkorange ${num}%, dodgerblue ${num}%)`)
  
    app.reset();
};

// calculates point difference ratio, updates background accordingly
app.calcRatio = () => {
    const diff = p1.score - p2.score;
    const gamesPlayed = p1.score + p2.score;
    const ratio = diff / (gamesPlayed - (game.rounds.bestOf + 1));
    const adjust = (ratio * 50) + 50;

    app.updateBg(adjust);
};

// announces round winner
app.announceRoundWin = (player) => {
    const win = `<div class="winner"><p><h3>${player.name} wins!</h3> Hit enter for next round.</p></div>`
    $('main').append(win);
};

// announces game winner
app.announceGameWinner = (player) => {
    const winner = `<div class="winner winner-game"><p><h3>${player.name} wins it all!</h3> Play again?</p></div>`
    $('main').append(winner);
};

// checks for game winner
app.checkGameWinner = (player) => {
    if(player.score === game.rounds.toWin) {
        app.announceGameWinner(player);
        return true;
    }
};

// updates score
app.updateStats = (player, score) => {
    game.rounds.count++;
    player.score++;
    $(score).text(player.score);
};


// compares hands
app.compareHands = (winner, loser, score) => {
    if(
        (winner.hand === rock && loser.hand === scissors) ||
        (winner.hand === paper && loser.hand === rock) ||
        (winner.hand === scissors && loser.hand === paper)) {
            // updates score first
        app.updateStats(winner, score);
            // checks game win
        const win = app.checkGameWinner(winner);
            // if no game win, check round win
        if(!win) {
            app.announceRoundWin(winner);
        }
    }
};

// checks results, then calculates ratio of difference in score
app.checkRound = () => {
    if(p1.hand === p2.hand) {
        const tie = `<div class="winner"><p><h3>Tie. No one wins!</h3> Hit enter for next round.</p></div>`
        $('main').append(tie);
    }
    else {
        app.compareHands(p1, p2, '.score-p1');
        app.compareHands(p2, p1, '.score-p2');
    }

    app.calcRatio();
};

// prints results, then checks results
app.printHands = () => {
    $('.hand-p1').append(p1.hand);
    $('.hand-p2').append(p2.hand);

    app.checkRound();
};

// ensures both players have played, then prints results on page
app.keysOff = () => {
    if(p1.hand && p2.hand){
        $('body').off('keydown');
        $('figure').empty();

        app.printHands();
    };
};

// saves choice based on keydown
app.play = (player, key) => {
    if(!player.hand){
        if(key === player.keys[0]){
            player.hand = rock;
        }
        else if(key === player.keys[1]){
            player.hand = paper;
        }
        else if(key === player.keys[2]){
            player.hand = scissors;
        }
    };
};

// begins round
app.ready = () => {
    $('.count-rounds').text(game.rounds.count);
    $('body').on('keydown', function(key){
        app.play(p1, key.which);
        app.play(p2, key.which);

        app.keysOff();
    });
};

// prints details (name, score, rounds) on page
app.printStats = () => {
    $('.name-p1').text(p1.name);
    $('.score-p1').text(p1.score);

    $('.name-p2').text(p2.name);
    $('.score-p2').text(p2.score);

    const rounds = `<p class="counts">Best of <span class="count count-best-of">${game.rounds.bestOf}</span> | Round <span class="count count-rounds">${game.rounds.count}</span></p>`;

    $('main').prepend(rounds);
};

// shows controls, disables keydown when open
app.showKeys = () => {
    $('.control-toggle').on('click', function() {
        $('.keys').toggleClass('hide');
        $('.control').toggleClass('show hidden');
        if($('.keys').hasClass('hide')) {
            app.ready();
        }
    });
    
    app.printStats();  
};

// saves form inputs, hides form, then shows controls
app.setup = () => {
    $('form').on('submit', function(e){
        e.preventDefault();

        p1.name = $('input[name=name-p1]').val();
        if(!p1.name.length){
            p1.name = 'Jack Traven';
        }
  
        p2.name = $('input[name=name-p2]').val();
        if(!p2.name.length) {
            p2.name = 'Richard Kimble';
        }
        
        game.rounds.bestOf = Number($('select').val());
        game.rounds.toWin = Math.ceil(game.rounds.bestOf / 2);
        
        $('.setup').css('display', 'none');        
        $('.keys').toggleClass('hide');
        $('.control-toggle').css('left', '0');
        
        app.showKeys();
    });
};

// allows toggle to hide footer 
app.hideFooter = () => {
    $('.tuck').on('click', function() {
        $('h2').toggleClass('hide');
        $('h6').toggleClass('hide');
        $('img').toggleClass('down');
    });
};

$(function(){
    app.setup();
    app.hideFooter();
});
