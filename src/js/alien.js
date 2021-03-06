import {Block} from "./block";
import {AlienShot} from "./alienShot";
import {Game} from "./game";
import {Element} from "./element";

export class Alien extends Element {
    static ALIEN_HEIGHT_IN_BLOCK = 3;
    static ALIEN_WIDTH_IN_BLOCK = 3;

    isDead = false;
    shotTimeout = null;

    blocks = [];
    intervals = [];
    shots = [];

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.node = this.create();
        this.draw();
        this.updateLoop();
    }

    create() {
        const gameField = document.querySelector('.game-field');
        const alien = document.createElement('div');

        gameField.appendChild(alien);
        alien.classList.add('alien');
        alien.style.height = Block.BLOCK_SIZE * Alien.ALIEN_HEIGHT_IN_BLOCK + 'px';
        alien.style.width = Block.BLOCK_SIZE * Alien.ALIEN_WIDTH_IN_BLOCK + 'px';

        this.blocks.push(
            new Block(0, 0),
            new Block(Block.BLOCK_SIZE, 0),
            new Block(Block.BLOCK_SIZE * 2, 0),
            new Block(Block.BLOCK_SIZE, Block.BLOCK_SIZE),
            new Block(0, Block.BLOCK_SIZE * 2),
            new Block(Block.BLOCK_SIZE * 2, Block.BLOCK_SIZE * 2)
        )

        this.blocks.forEach(block => {
            alien.appendChild(block.node);
            block.node.classList.add('spaceship__block');
        });

        return alien;
    }

    shot() {
        this.shots.push(new AlienShot(this.x - (AlienShot.SHOT_WIDTH / 2) + Block.BLOCK_SIZE * 1.5, this.y + Block.BLOCK_SIZE * 2));
    }

    updateLoop() {
        const alienLoop = setInterval(() => {
            this.shots.forEach(shot => {
                if (shot.isDead) {
                    shot.node.remove();
                }
            })

            this.shots = this.shots.filter(shot => !shot.isDead);

            if (this.isDead) {
                clearTimeout(this.shotTimeout);
                this.intervals.forEach(interval => {
                    clearTimeout(interval);
                    clearInterval(interval);
                })
            }

        }, 1000 / Game.FPS);
        this.intervals.push(alienLoop);
    }

}
