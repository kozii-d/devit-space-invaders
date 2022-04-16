import {Spaceship} from "./spaceship";
import {Alien} from "./alien";
import {Block} from "./block";

export class Game {
    static FPS = 60;
    static GAME_HEIGHT = 500;
    static GAME_WIDTH = 1000;

    spaceship = null
    aliens = [];
    shots = [];
    intervals = [];
    score = 0;
    isReverse = false;
    isEndGame = false;

    keyState = {
        ArrowLeft: false,
        ArrowRight: false,
        a: false,
        d: false,
        ф: false,
        в: false,
        ' ': false // space key
    };

    constructor() {
        const game = document.querySelector('.game-field');
        game.innerHTML = '';
        this.create();
        this.spaceship = new Spaceship();
        this.spawnAliens();
        this.moveAliens();
        this.addEvents();
        this.updateLoop();
    }

    create() {
        const game = document.querySelector('.game-field');
        game.style.height = Game.GAME_HEIGHT + 'px';
        game.style.width = Game.GAME_WIDTH + 'px';

        const score = document.createElement('p');
        score.classList.add('score');
        score.style.marginLeft = `${Block.BLOCK_SIZE}px`;
        score.textContent = 'Score: 0000';
        game.appendChild(score);

        return game;
    }

    updateLoop() {
        const gameLoop = setInterval(() => {
            if (this.keyState.ArrowLeft || this.keyState.a || this.keyState.ф) {
                this.spaceship.move('moveLeft');
            }
            if (this.keyState.ArrowRight || this.keyState.d || this.keyState.в) {
                this.spaceship.move('moveRight');
            }
            if (this.keyState[' ']) {
                const shot = this.spaceship.shot();
                shot && this.shots.push(shot);
            }

            this.checkShots();
            this.updateScore();
            this.checkEndGame();

            if (this.isEndGame) {
            //    todo: сделать конец игры
                const modal = document.querySelector('.modal');
                modal.style.display = 'block';
                this.intervals.forEach(interval => {
                    clearInterval(interval);
                })
            }

        }, 1000 / Game.FPS);
        this.intervals.push(gameLoop);
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
            if (shot.isDead) {
                shot.node.remove();
            }
            this.aliens.forEach(alien => {
                // регистрация попаданий
                if ((alien.y >= shot.y - Block.BLOCK_SIZE * Alien.ALIEN_HEIGHT_IN_BLOCK && alien.y <= shot.y)
                && (alien.x >= shot.x - Block.BLOCK_SIZE * Alien.ALIEN_WIDTH_IN_BLOCK && alien.x <= shot.x)) {
                    shot.isDead = true;
                    shot.node.remove();
                    alien.isDead = true;
                    alien.node.remove();
                    this.score++;
                }
            });
        });
        this.shots = this.shots.filter(shot => !shot.isDead);
        this.aliens = this.aliens.filter(aliens => !aliens.isDead);
    }

    spawnAliens() {
        for (let height = Block.BLOCK_SIZE * 5, width = Block.BLOCK_SIZE; height < Game.GAME_HEIGHT / 100 * 40;) {
            if (width > Game.GAME_WIDTH / 100 * 60) {
                height += Alien.ALIEN_HEIGHT_IN_BLOCK * Block.BLOCK_SIZE + Block.BLOCK_SIZE;
                width = Block.BLOCK_SIZE;
            }
            this.aliens.push(new Alien(width, height));
            width += Alien.ALIEN_WIDTH_IN_BLOCK * Block.BLOCK_SIZE + Block.BLOCK_SIZE;
        }
        // todo: исправить костыль
        this.aliens.pop().node.remove();
    }

    moveAliens () {
        const firstAlien = this.aliens[0];
        const lastAlien = this.aliens[this.aliens.length - 1];

        const moveAliensX = setInterval(() => {

            if (lastAlien.x > Game.GAME_WIDTH - (Block.BLOCK_SIZE * 5)) {
                this.isReverse = true;
            }
            if (firstAlien.x <= Block.BLOCK_SIZE) {
                this.isReverse = false;
            }

            for (let i = 0; i < this.aliens.length; i++) {
                const alien = this.aliens[i]

                if (this.isReverse) {
                    alien.x -= Block.BLOCK_SIZE;

                } else {
                    alien.x += Block.BLOCK_SIZE;
                }
                alien.draw();
            }

        }, 100);

        const moveAliensY = setInterval(() => {
            for (let i = 0; i < this.aliens.length; i++) {
                const alien = this.aliens[i]

                alien.y += Block.BLOCK_SIZE;
                alien.draw();
            }
        }, 1000);
        this.intervals.push(moveAliensX, moveAliensY);
    }

    checkEndGame() {
        const lastAlien = this.aliens[this.aliens.length - 1];

        if (this.aliens.length === 0) {
            this.isEndGame = true;
            return;
        }

        if (this.spaceship.y <= lastAlien.y + (Block.BLOCK_SIZE * Alien.ALIEN_HEIGHT_IN_BLOCK)) {
            this.isEndGame = true;
        }


    }

    updateScore() {
        const score = document.querySelector('.score');
        score.textContent = `Score: ${this.score * 100}`;
    }

    restartGame() {
        return new Game();
    }
}