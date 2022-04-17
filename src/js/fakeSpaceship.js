import {Block} from "./block";
import {Spaceship} from "./spaceship";
import {Game} from './game';

export class FakeSpaceship {
    static BLOCK_SIZE = 15;
    x = Game.GAME_WIDTH - 105;
    y = 13;
    blocks = [];
    node = null;

    constructor() {
        this.node = this.create();
        this.draw();
    }

    create() {
        const fakeSpaceship = document.createElement('div');

        fakeSpaceship.classList.add('fake-spaceship');
        fakeSpaceship.style.height = FakeSpaceship.BLOCK_SIZE * Spaceship.SPACESHIP_HEIGHT_IN_BLOCK + 'px';
        fakeSpaceship.style.width = FakeSpaceship.BLOCK_SIZE * Spaceship.SPACESHIP_WIDTH_IN_BLOCK + 'px';


        this.blocks.push(
            new Block(FakeSpaceship.BLOCK_SIZE, 0),
            new Block(0, FakeSpaceship.BLOCK_SIZE),
            new Block(FakeSpaceship.BLOCK_SIZE, FakeSpaceship.BLOCK_SIZE),
            new Block(FakeSpaceship.BLOCK_SIZE * 2, FakeSpaceship.BLOCK_SIZE)
        )

        this.blocks.forEach(block => {
            block.node.style.height = '15px';
            block.node.style.width = '15px';
            fakeSpaceship.appendChild(block.node);
            block.node.classList.add('fake-spaceship__block');
        });



        return fakeSpaceship;
    }

    draw() {
        this.node.style.top = this.y + 'px';
        this.node.style.left = this.x + 'px';
    }

}