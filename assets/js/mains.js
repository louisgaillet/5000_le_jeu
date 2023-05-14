let selectedP = '';
let partie =null;
let partieId =localStorage.getItem('partieId');
function init(){
    if (!partieId || !localStorage.getItem(partieId)){
        partieId = Date.now();
        localStorage.setItem('partieId', partieId);
        let partie = {
            joueurs:[]
        }
        console.log(partieId,JSON.stringify(partie))
        localStorage.setItem(partieId,JSON.stringify(partie))
    }
    partie = JSON.parse(localStorage.getItem(partieId))
    partie.joueurs.forEach(joueur => createPlayer(joueur.name))
    if (partie.joueurs.length){
        selectPlayer(document.querySelector('.joueur_name'))
        start();
    }
}
function addPlayer() {

    let x = document.getElementById("namePlayer");

    if (x.value.length < 3)
        return;
    else {
        createPlayer(x.value)
        x.value='';
    }
}

function createPlayer(name)
{
    let inStorage = partie.joueurs.find(joueur => joueur.name === name);
    let iDiv = document.createElement('div');
    let idGenere = inStorage ? inStorage.id : Date.now();
    iDiv.id = `player-${name}`;
    iDiv.className = 'player row border-1 p-2';

    nDiv = document.createElement('div');
    nDiv.id = `nameP-${name}`;
    nDiv.innerHTML = name;
    nDiv.className = "namePstyle col-4 text-left joueur_name font-weight-bold h6 mb-0";
    nDiv.dataset.id = idGenere
    nDiv.onclick = function () { selectPlayer(this); };

    sDiv = document.createElement('div');
    sDiv.id = `scoreP-${name}`;
    sDiv.dataset.id = idGenere
    sDiv.innerHTML = inStorage ? inStorage.score : 0;
    sDiv.className = "namePstyle col-3 text-center h6 mb-0 score-item";

    rDiv = document.createElement('div');
    rDiv.id = `restP-${name}`;

    rDiv.dataset.id = idGenere
    rDiv.innerHTML = inStorage ? (5000 - inStorage.score) : 5000;
    rDiv.className = "namePstyle col-3 text-center h6 mb-0 score-restant-item";

    editDiv = document.createElement('div');
    editDiv.dataset.id = idGenere
    editDiv.innerHTML = "<span> <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34\"></path><polygon points=\"18 2 22 6 12 16 8 16 8 12 18 2\"></polygon></svg> </span>";
    editDiv.className = "edit-score col-2";
    editDiv.onclick = function () { editScore(idGenere); };

    iDiv.appendChild(nDiv);
    iDiv.appendChild(sDiv);
    iDiv.appendChild(rDiv);
    iDiv.appendChild(editDiv);


    if (!inStorage){
        partie.joueurs.push({
            name:name,
            score:0,
            id:idGenere
        })
        localStorage.setItem(partieId,JSON.stringify(partie))
    }

    document.getElementById('scores').appendChild(iDiv);
    const playersLength= document.getElementsByClassName('joueur_name').length
    if (playersLength === 1) {
        const elem = document.getElementById('blockScore');
        elem.classList.remove("d-none");
    }

    if (playersLength === 2){
        document.querySelector('#startButton').disabled = false;
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

function restart(){
    localStorage.removeItem(partieId);
    location.reload()
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
    let playerInStorage = partie.joueurs.find(joueur => joueur.id === parseInt(selectedP));
    playerInStorage.score = newscore;
    localStorage.setItem(partieId,JSON.stringify(partie))
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

function editScore(id){
    document.getElementById('edit-score').classList.remove('d-none')
    selectedP = id;
}

function cancelScore(){
    document.getElementById('edit-score').classList.add('d-none')
    selectPlayer(document.querySelector('.joueur_name'))
}

function onSubmitEditScore(){
    let score =  document.getElementById('input-edit-score').value;
    const divScore = document.querySelector(`.score-item[data-id="${selectedP}"]`);
    divScore.innerHTML = 0
    document.getElementById('displayScore').innerHTML = score;
    pushScore()
    document.getElementById('edit-score').classList.add('d-none')

}

init()

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/{repository}/serviceWorker.js', {scope: '/{repository}/'})
}
