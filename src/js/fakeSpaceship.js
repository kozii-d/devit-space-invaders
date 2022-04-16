import {Block} from "./block";
import {Spaceship} from "./spaceship";

export class FakeSpaceship {
    x = 60;
    y = 13;
    blocks = [];
    node = null;

    constructor() {
        this.node = this.create();
        this.draw();
    }

    create() {
        const fakeSpeceship = document.createElement('div');

        fakeSpeceship.classList.add('fake-spaceship');
        fakeSpeceship.style.height = Block.BLOCK_SIZE * Spaceship.SPACESHIP_HEIGHT_IN_BLOCK + 'px';
        fakeSpeceship.style.width = Block.BLOCK_SIZE * Spaceship.SPACESHIP_WIDTH_IN_BLOCK + 'px';


        this.blocks.push(
            new Block(Block.BLOCK_SIZE, 0),
            new Block(0, Block.BLOCK_SIZE),
            new Block(Block.BLOCK_SIZE, Block.BLOCK_SIZE),
            new Block(Block.BLOCK_SIZE * 2, Block.BLOCK_SIZE)
        )

        this.blocks.forEach(block => {
            // block.node.style.backgroundColor = '#0f0';
            fakeSpeceship.appendChild(block.node);
            block.node.classList.add('fake-spaceship__block');
        });



        return fakeSpeceship;
    }

    draw() {
        this.node.style.top = this.y + 'px';
        this.node.style.right = this.x + 'px';
    }

}