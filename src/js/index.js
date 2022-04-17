import {Game} from "./game";
import ('../styles/style.scss');

// todo: поправить костыль с лишним пришельцем
// todo: поправить регистрацю выстрелов пришельцев (сейчас регистрация происходит по кончику выстрела.
//  Добавить, чтобы весь выстрел считывался
// todo: попробовать заменить интервалы на таймауты у пришельцев

let game = new Game();
const modal = document.querySelector('.modal');
let modalBnt = document.querySelector('.modal__btn');
modalBnt.addEventListener('click', () => {
    modal.style.display = 'none';
    game = game.restartGame();
})