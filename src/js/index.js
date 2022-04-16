import {Game} from "./game";

import ('../styles/style.scss');

let game = new Game();
const modal = document.querySelector('.modal');
let modalBnt = document.querySelector('.modal__btn');
modalBnt.addEventListener('click', () => {
    modal.style.display = 'none';
    game = game.restartGame();
})