import {Game} from "./game";

import ('../styles/style.scss');

// todo: поправить костыль с лишним пришельцем
// todo: попробовать заменить интервалы на таймауты у пришельцев

let game = null;
const modal = document.querySelector('.modal');
const startModal = document.querySelector('.modal_start');
let modalBnt = document.querySelector('.modal__btn');
let startModalBtn = document.querySelector('.modal_start__btn');

startModalBtn.addEventListener('click', () => {
    startModal.style.display = 'none';
    game = new Game();
});


modalBnt.addEventListener('click', () => {
    modal.style.display = 'none';
    game = game.restartGame();
});

