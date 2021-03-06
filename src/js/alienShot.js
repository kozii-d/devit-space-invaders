import {Game} from "./game";
import {Element} from "./element";

export class AlienShot extends Element {

    static SHOT_WIDTH = 4;
    static SHOT_HEIGHT = 20;
    static SHOT_SPEED = 7;

    isDead = false;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.node = this.create();
        this.draw();
        this.loop();
    }

    create() {
        const gameField = document.querySelector('.game-field');
        const shot = document.createElement('div');
        shot.style.height = AlienShot.SHOT_HEIGHT + 'px';
        shot.style.width = AlienShot.SHOT_WIDTH + 'px';
        shot.style.backgroundColor = 'red';
        gameField.appendChild(shot);
        shot.classList.add('shot');

        return shot;
    }

    deathUpdate() {
        if (this.x > Game.GAME_WIDTH || this.y > Game.GAME_HEIGHT - AlienShot.SHOT_HEIGHT) {
            this.isDead = true;
            this.node.remove();
        }
    }

    loop() {
        const shotLoop = setInterval(() => {
            if (this.isDead) {
                // this.node.remove();
                clearInterval(shotLoop);
            }
            this.y += AlienShot.SHOT_SPEED;
            this.deathUpdate();
            this.draw();
        }, 1000 / Game.FPS);
    }

}

