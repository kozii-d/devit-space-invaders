import {Spaceship} from "./spaceship";

export class Game {
    static FPS = 60;

    spaceship = new Spaceship();
    aliens = [];
    shots = [];

    keyState = {
        ArrowLeft: false,
        ArrowRight: false,
        ' ': false // space key
    };

    constructor() {
        this.addEvents();
        this.updateLoop();
    }

    updateLoop() {
        setInterval(() => {
            if (this.keyState.ArrowLeft) {
                this.spaceship.move('moveLeft');
            }
            if (this.keyState.ArrowRight) {
                this.spaceship.move('moveRight');
            }
            if (this.keyState[' ']) {
                const shot = this.spaceship.shot();
                shot && this.shots.push(shot);
            }

            this.checkShots();

        }, 1000 / Game.FPS);
    }

    addEvents() {
        document.addEventListener('keydown', e => {
            this.keyState[e.key] = true;
        });

        document.addEventListener('keyup', e => {
            this.keyState[e.key] = false;
        });
    }

    checkShots() {
        this.shots.forEach(shot => {
            if (shot.isOutOfField) {
                shot.node.remove();
            }
        });

        this.shots = this.shots.filter(shot => !shot.isOutOfField);

    }
}