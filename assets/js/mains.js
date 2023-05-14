let selectedP = '';

function addPlayer() {

    let x = document.getElementById("namePlayer");

    if (x.value.length < 3)
        return;
    else {

        let iDiv = document.createElement('div');
        let idGenere = Date.now();
        iDiv.id = 'player-' + x.value;
        iDiv.className = 'player row border-1 p-2';

        nDiv = document.createElement('div');
        nDiv.id = "nameP-" + x.value;
        nDiv.innerHTML = x.value;
        nDiv.className = "namePstyle col-6 text-left joueur_name font-weight-bold h6 mb-0";
        nDiv.dataset.id = idGenere
        nDiv.onclick = function () { selectPlayer(this); };

        sDiv = document.createElement('div');
        sDiv.id = "scoreP-" + x.value;
        sDiv.dataset.id = idGenere
        sDiv.innerHTML = "0";
        sDiv.className = "namePstyle col-3 text-center h6 mb-0 score-item";

        rDiv = document.createElement('div');
        rDiv.id = "restP-" + x.value;
        rDiv.dataset.id = idGenere
        rDiv.innerHTML = "5000";
        rDiv.className = "namePstyle col-3 text-center h6 mb-0 score-restant-item";

        iDiv.appendChild(nDiv);
        iDiv.appendChild(sDiv);
        iDiv.appendChild(rDiv);
        document.getElementById('scores').appendChild(iDiv);
        const playersLength= document.getElementsByClassName('joueur_name').length
        if (playersLength === 1) {
            const elem = document.getElementById('blockScore');
            elem.classList.remove("d-none");
        }

        if (playersLength === 2){
            document.querySelector('#startButton').disabled = false;
        }
        x.value = '';
    }
}

function start() {
    const listP = document.getElementsByClassName('joueur_name');
    if (!listP.length){
        return
    }
    selectPlayer(listP[0])

    const elem = document.getElementById('phaseAdd');
    elem.style.display = 'none';
    const logo = document.getElementById('logo-large');
    logo.classList.add('d-none');
    logo.classList.remove('d-flex');
    const elem2 = document.getElementById('phaseCalc');
    elem2.style.display = 'inline-block';
    const elem3 = document.getElementById('scoreToAdd');
    elem3.classList.remove('d-none');
    elem3.classList.add('d-flex');


}

function calcScore(num) {
    const elem = document.getElementById('displayScore');
    const newCurrScore = (parseInt(elem.textContent) + num).toString();
    elem.innerHTML = newCurrScore;

}

function clearScore() {
    const elem = document.getElementById('displayScore');
    elem.innerHTML = "0";

}

function selectPlayer(element) {
    const pSelect = element.textContent;
    selectedP = element.dataset.id;
    const listP = document.getElementsByClassName('joueur_name');
    for (let i = 0; i < listP.length; i++) {
        if ((listP[i].dataset.id) === selectedP) {
            listP[i].parentNode.classList.add('selected');
        }
        else {
            listP[i].parentNode.classList.remove("selected");
        }
    }
}



function pushScore() {
    const score = document.getElementById('displayScore').textContent;
    const divScore = document.querySelector(`.score-item[data-id="${selectedP}"]`);
    const divScoreRestant = document.querySelector(`.score-restant-item[data-id="${selectedP}"]`);
    const scoreCurr = divScore.textContent;
    const newscore = (parseInt(score) + parseInt(scoreCurr)).toString();
    divScore.innerHTML = newscore;
    divScoreRestant.innerHTML = (5000 - parseInt(newscore)).toString();
    document.getElementById('displayScore').innerHTML = "0";
    const nextPlayer = getNextPlayer()
    if (nextPlayer){
        selectPlayer(nextPlayer.querySelector('.joueur_name'))
    }
}

function getNextPlayer(){
    const selectedPlayer = document.querySelector('.player.selected');
    let nextPlayer = selectedPlayer.nextElementSibling;

    while (nextPlayer !== null && nextPlayer.classList.contains('finish')) {
        nextPlayer = nextPlayer.nextElementSibling;
    }

    if (nextPlayer === null) {
        const firstPlayer = document.querySelector('.player:not(.finish)');
        nextPlayer = firstPlayer;
    }

    if (nextPlayer.classList.contains('player')) {
        return nextPlayer
    }
}