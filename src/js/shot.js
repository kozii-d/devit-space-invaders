import {Game} from "./game";
import {Element} from "./element";

export class Shot extends Element {
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
        this.loop()

    }

    create() {
        const gameField = document.querySelector('.game-field');
        const shot = document.createElement('div');
        shot.style.height = Shot.SHOT_HEIGHT + 'px';
        shot.style.width = Shot.SHOT_WIDTH + 'px';

        gameField.appendChild(shot);
        shot.classList.add('shot');

        return shot;
    }

    deathUpdate() {
        if (this.x < 0 || this.y < 0) {
            this.isDead = true;
        }
    }

    loop() {
        const shotLoop = setInterval(() => {
            if (this.isDead) {
                this.node.remove();
                clearInterval(shotLoop);
            }
            this.y -= Shot.SHOT_SPEED;
            this.deathUpdate();
            this.draw();
        }, 1000 / Game.FPS);
    }
}