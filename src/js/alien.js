import {Block} from "./block";

export class Alien {
    static ALIEN_HEIGHT_IN_BLOCK = 3;
    static ALIEN_WIDTH_IN_BLOCK = 3;

    x = 50;
    y = 50;

    node = null;

    blocks = [];


    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.node = this.create();
        this.draw();
        // this.moveLoop();
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

    draw() {
        this.node.style.top = this.y + 'px';
        this.node.style.left = this.x + 'px';
    }

    moveLoop() {
        setInterval(() => {
            this.x += Block.BLOCK_SIZE;
            this.draw();
        }, 1000);
    }

}