import {Game} from "./game";

import ('../styles/style.scss');

let game = new Game();

let modalBnt = document.querySelector('.modal__btn');
modalBnt.addEventListener('click', () => {
    modalBnt = document.querySelector('.modal__btn');
    game = game.restartGame();
})