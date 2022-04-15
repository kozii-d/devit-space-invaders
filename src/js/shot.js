import {Game} from "./game";

export class Shot {
    static SHOT_WIDTH = 4;
    static SHOT_HEIGHT = 20;

    x = null;
    y = null;
    node = null;

    isOutOfField = false;
    isDead = false;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.node = this.create();

        this.draw();

        setInterval(() => {
            this.y -= 5;
            this.update();
            this.draw();
        }, 1000 / Game.FPS);
    //    200
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

    draw() {
        this.node.style.top = this.y + 'px';
        this.node.style.left = this.x + 'px';
    }

    update() {
        if (this.x < 0 || this.y < 0) {
            this.isDead = true;
        }
    }
}