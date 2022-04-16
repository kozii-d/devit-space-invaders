import {Spaceship} from "./spaceship";
import {Alien} from "./alien";
import {Block} from "./block";
import {AlienShot} from "./alienShot";
import {FakeSpaceship} from "./fakeSpaceship";

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
        A: false,
        D: false,
        Ф: false,
        В: false,
        ' ': false // space key
    };

    constructor() {
        const game = document.querySelector('.game-field');
        game.innerHTML = '';
        this.create();
        this.spaceship = new Spaceship();
        this.addEvents();
        this.spawnAliens();
        this.moveAliens();
        this.updateLoop();
    }

    create() {
        const game = document.querySelector('.game-field');
        game.style.height = Game.GAME_HEIGHT + 'px';
        game.style.width = Game.GAME_WIDTH + 'px';

        const info = document.createElement('div');
        info.classList.add('info');

        const score = document.createElement('p');
        score.classList.add('score');
        score.style.marginLeft = `${Block.BLOCK_SIZE}px`;
        score.textContent = 'Score: 0';

        const lifeCount = document.createElement('p');
        lifeCount.style.marginRight = `${Block.BLOCK_SIZE}px`;
        const lifeSpaceship = new FakeSpaceship().node;
        lifeCount.classList.add('life-count');
        lifeCount.textContent = 'x3';

        const underline = document.createElement('div');
        underline.classList.add('underline');
        underline.style.top = Game.GAME_HEIGHT - (Block.BLOCK_SIZE * 0.7) + 'px'

        game.appendChild(score);
        game.appendChild(lifeCount)
        game.appendChild(lifeSpaceship)
        game.appendChild(underline)

        return game;
    }

    updateLoop() {
        const gameLoop = setInterval(() => {
            this.useKey();
            this.checkShots();
            this.isSpaceshipDead();
            this.updateScoreAndLife();
            this.checkEndGame();
            this.reverse();
        }, 1000 / Game.FPS);
        this.intervals.push(gameLoop);
    }

    addEvents() {
        document.addEventListener('keydown', e => {
            this.keyState[e.key] = true;
            console.log(e.key)
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
                // регистрация попаданий в пришельцев
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

    useKey() {
        if (this.keyState.ArrowLeft || this.keyState.a || this.keyState.ф || this.keyState.A || this.keyState.Ф) {
            this.spaceship.move('moveLeft');
        }
        if (this.keyState.ArrowRight || this.keyState.d || this.keyState.в || this.keyState.D || this.keyState.В) {
            this.spaceship.move('moveRight');
        }
        if (this.keyState[' ']) {
            const shot = this.spaceship.shot();
            shot && this.shots.push(shot);
        }
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
        const excess = this.aliens.pop();
        excess.intervals.forEach(interval => {
            clearInterval(interval);
        })
        excess.isDead = false
        excess.node.remove();
    }

    moveAliens () {
        const moveAliensX = setInterval(() => {

            for (let i = 0; i < this.aliens.length; i++) {
                const alien = this.aliens[i]

                if (this.isReverse) {
                    alien.x -= Block.BLOCK_SIZE;

                } else {
                    alien.x += Block.BLOCK_SIZE;
                }
                alien.draw();
            }

        }, 700);

        const moveAliensY = setInterval(() => {
            for (let i = 0; i < this.aliens.length; i++) {
                const alien = this.aliens[i]

                alien.y += Block.BLOCK_SIZE;
                alien.draw();
            }
        }, 10000);
        this.intervals.push(moveAliensX, moveAliensY);
    }

    checkEndGame() {
        if (this.isEndGame) {
            const modal = document.querySelector('.modal');
            modal.style.display = 'block';
            this.aliens.forEach(alien => {
                alien.intervals.forEach(interval => {
                    clearInterval(interval);
                })
            })
            this.intervals.forEach(interval => {
                clearInterval(interval);
            })
        }

        const lastAlien = this.aliens[this.aliens.length - 1];

        if (this.aliens.length === 0) {
            this.isEndGame = true;
            return;
        }

        if (this.spaceship.isDead) {
            this.isEndGame = true;
            return;
        }

        if (this.spaceship.y <= lastAlien.y + (Block.BLOCK_SIZE * Alien.ALIEN_HEIGHT_IN_BLOCK)) {
            this.isEndGame = true;
        }


    }

    updateScoreAndLife() {
        const score = document.querySelector('.score');
        score.textContent = `Score: ${this.score * 100}`;
        const lifeCount = document.querySelector('.life-count')
        lifeCount.textContent = `x${this.spaceship.life}`;
    }

    isSpaceshipDead() {
        // регистрация выстрелов от пришельцев
        this.aliens.forEach(alien => {
            alien.shots.forEach(shot => {
                if ((shot.x >= this.spaceship.x && shot.x <= this.spaceship.x + Block.BLOCK_SIZE * Spaceship.SPACESHIP_WIDTH_IN_BLOCK)
                && (shot.y + AlienShot.SHOT_HEIGHT >= this.spaceship.y && shot.y  + AlienShot.SHOT_HEIGHT <= this.spaceship.y + Block.BLOCK_SIZE * Spaceship.SPACESHIP_HEIGHT_IN_BLOCK)) {
                    shot.isDead = true;
                    this.spaceship.life--;
                    if (!this.spaceship.life) {
                        this.isEndGame = true;
                    }
                }
            })
        })
    }

    reverse() {
        if (this.aliens.length) {
            this.aliens.forEach(alien => {
                if (alien.x > Game.GAME_WIDTH - (Block.BLOCK_SIZE * 5)) {
                    this.isReverse = true;
                }
                if (alien.x <= Block.BLOCK_SIZE) {
                    this.isReverse = false;
                }
            })
        }
    }

    restartGame() {
        return new Game();
    }
 }