import {Block} from "./block";
import {Shot} from "./shot";
import {Game} from "./game";
import {Element} from "./element";

export class Spaceship extends Element{
    static SPEED = 7;
    static SPACESHIP_HEIGHT_IN_BLOCK = 2;
    static SPACESHIP_WIDTH_IN_BLOCK = 3;

    life = 3;
    blocks = [];
    lastShot = null;
    isDead = false;

    constructor() {
        super();
        this.x = (Game.GAME_WIDTH / 2) - (Block.BLOCK_SIZE * 1.5);
        this.y = Game.GAME_HEIGHT - Block.BLOCK_SIZE * (Spaceship.SPACESHIP_HEIGHT_IN_BLOCK + 1);
        this.node = this.create();
        this.draw();
    }

    create() {
        const gameField = document.querySelector('.game-field');
        const spaceShipBody = document.createElement('div');

        gameField.appendChild(spaceShipBody);
        spaceShipBody.classList.add('spaceship');
        spaceShipBody.style.height = Block.BLOCK_SIZE * Spaceship.SPACESHIP_HEIGHT_IN_BLOCK + 'px';
        spaceShipBody.style.width = Block.BLOCK_SIZE * Spaceship.SPACESHIP_WIDTH_IN_BLOCK + 'px';


        this.blocks.push(
            new Block(Block.BLOCK_SIZE, 0),
            new Block(0, Block.BLOCK_SIZE),
            new Block(Block.BLOCK_SIZE, Block.BLOCK_SIZE),
            new Block(Block.BLOCK_SIZE * 2, Block.BLOCK_SIZE)
        )

        this.blocks.forEach(block => {
            block.node.style.backgroundColor = '#0f0';
            spaceShipBody.appendChild(block.node);
            block.node.classList.add('spaceship__block');
        });


        return spaceShipBody;
    }

    move(direction) {
        if (direction === 'moveLeft' && this.x > 6) {
            this.x -= Spaceship.SPEED;
        }
        if (direction === 'moveRight' && this.x < Game.GAME_WIDTH - Block.BLOCK_SIZE * 3 - 6) {
            this.x += Spaceship.SPEED;
        }

        this.draw();
    }

    shot() {
        const time = new Date().getTime();
        if (this.lastShot && time - this.lastShot < 1000) {
            return null;
        }
        this.lastShot = time;
        return new Shot(this.x + Block.BLOCK_SIZE * 1.5 - 2, this.y);
    }

}