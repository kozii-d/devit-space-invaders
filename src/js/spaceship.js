import {Block} from "./block";
import {Shot} from "./shot";
import {Game} from "./game";

export class Spaceship {
    static SPEED = 7;
    static SPACESHIP_HEIGHT_IN_BLOCK = 2;
    static SPACESHIP_WIDTH_IN_BLOCK = 3;

    x = (Game.GAME_WIDTH / 2) - (Block.BLOCK_SIZE * 1.5);
    y = 450;
    blocks = [];
    node = null;
    lastShot = null;
    constructor() {
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
            spaceShipBody.appendChild(block.node);
            block.node.classList.add('spaceship__block');
        });


        return spaceShipBody;
    }

    draw() {
        this.node.style.top = this.y + 'px';
        this.node.style.left = this.x + 'px';
    }

    move(direction) {
        if (direction === 'moveLeft' && this.x > 5) {
            this.x -= Spaceship.SPEED;
        }
        if (direction === 'moveRight' && this.x < Game.GAME_WIDTH - Block.BLOCK_SIZE * 3 - 5) {
            this.x += Spaceship.SPEED;
        }

        this.draw();
    }

    shot() {
        const time = new Date().getTime();
        if (this.lastShot && time - this.lastShot < 500) {
            return null;
        }
        this.lastShot = time;
        return new Shot(this.x + Block.BLOCK_SIZE * 1.5 - 2, this.y);
    }

}