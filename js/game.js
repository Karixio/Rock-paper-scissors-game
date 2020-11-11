const startGame = document.querySelector('.start');
const reset = document.querySelector('.reset');
const picks = [...document.querySelectorAll('div img')];
const playerPicked = document.querySelector('span[data-summary="your-choice"]');
const aiPicked = document.querySelector('span[data-summary="ai-choice"]');
const winner = document.querySelector('span[data-summary="who-win"]');
const games = document.querySelector('.numbers');
const wins = document.querySelector('.wins');
const losses = document.querySelector('.losses');
const ties = document.querySelector('.draws');
let playerPick = '';
let activePick = '';

let gameSummary = {
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        ties: 0
    };

picks.forEach(function(pick){
    pick.addEventListener('click', (e) => {
        picks.forEach(function(pick){
            pick.style.boxShadow = '';
        });
        activePick = e.target;
        playerPick = e.target.dataset.option;
        e.target.style.boxShadow = '0 0 0 4px yellow';
    });
});

function generateAiPick(){
    const aiPick = picks[Math.floor(Math.random() * picks.length)].dataset.option;
    return aiPick;
};

function gameResult(player, ai){
    if(player === 'kamień' && ai === 'nożyce' || player === 'papier' && ai === 'kamień' || player === 'nożyce' && ai === 'papier'){
        return 'win';
    }else if(player === 'nożyce' && ai === 'kamień' || player === 'kamień' && ai === 'papier' || player === 'papier' && ai === 'nożyce'){
        return 'loss';
    }else{
        return 'tie';
    }
};

function displayResult(result){
    if(result === 'win'){
        winner.style.color = 'green';
        return 'Wygrałeś!';
    }else if(result === 'loss'){
        winner.style.color = 'red';
        return 'Przegrałeś :(';
    }else if(result === 'tie'){
        winner.style.color = 'gray';
        return 'Remis :/';
    };
};
function clearResult(){
    if(playerPicked.textContent != ''){
        playerPicked.textContent = '';
        aiPicked.textContent = '';
        winner.textContent = '';
    };
};

function changeGameSummary(result){
    gameSummary.gamesPlayed++;
    games.textContent = 'liczba gier: ' + gameSummary.gamesPlayed;
    if(result === 'win'){
        gameSummary.wins++
        wins.textContent = 'wygranych: ' + gameSummary.wins;
    }else if(result === 'loss'){
        gameSummary.losses++;
        losses.textContent = 'przegranych: ' + gameSummary.losses;
    }else if(result === 'tie'){
        gameSummary.ties++;
        ties.textContent = 'remisów: ' + gameSummary.ties;
    };

};

const game = () => {
    if(playerPick == ''){
        alert('Nic nie wybrałeś!');
        return;
    };
    clearResult();

    const player = playerPick;
    const ai = generateAiPick();

    activePick.style.boxShadow = '';
    playerPicked.textContent = player;
    aiPicked.textContent = ai;

    const whoWon = gameResult(player, ai);
    const result = displayResult(whoWon);
    winner.textContent = result;

    changeGameSummary(whoWon);
    playerPick = '';
    activePick = '';
    ai = '';
};

reset.addEventListener('click', () => {
    gameSummary.gamesPlayed = 0;
    gameSummary.wins = 0;
    gameSummary.losses = 0;
    gameSummary.ties = 0;
    games.textContent = 'liczba gier: ' + gameSummary.gamesPlayed;
    wins.textContent = 'wygranych: ' + gameSummary.wins;
    losses.textContent = 'przegranych: ' + gameSummary.losses;
    ties.textContent = 'remisów: ' + gameSummary.ties;
    playerPicked.textContent = '';
    aiPicked.textContent = '';
    winner.textContent = '';
    playerPick = '';
    activePick = '';
    picks.forEach(function(pick){
        pick.style.boxShadow = '';
    });
});
startGame.addEventListener('click', game);

