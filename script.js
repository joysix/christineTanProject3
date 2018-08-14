// ROCK     // PAPER   // SCISSORS
// Z 90     // X 88    // C 67
// I 73     // O 79    // P 80


// Choose number of rounds (Best of an odd number)
// Hit enter to start
// Each player selects R, P, or S
// Listen for keydown, save choice in two variables
// Compare choices and declare winner and add to score


const score = {
    p1: 0,
    p2: 0
}

const choice = {
    p1: null,
    p2: null
}  

const app = {}

app.check = () => {
    if(choice.p1 !== null && choice.p2 !== null){
        $("body").off("keydown");
    }
};

$(function(){

    let rounds = Number(prompt("Pick a number of rounds to play"));
    if(rounds % 2 === 0){
       rounds = Number(prompt("Choose an odd number")); 
    }
    

    $("body").on('keydown', function(e){
        if(e.which === 13){

            $("body").on('keydown', function(r){
                if (choice.p1 === null ){
                    if(r.which === 90 || r.which === 88 || r.which === 67){
                        choice.p1 = "r.which";
                        app.check();                        
                    }
                }
                if (choice.p2 === null){
                    if(r.which === 73 || r.which === 79 || r.which === 80){
                        choice.p2 = r.which;
                        app.check();
                    }
                }

            });

        };

    });

});