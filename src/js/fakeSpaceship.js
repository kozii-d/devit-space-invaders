import {Block} from "./block";
import {Spaceship} from "./spaceship";
import {Game} from './game';
import {Element} from "./element";

export class FakeSpaceship extends Element {
    static BLOCK_SIZE = 15;

    blocks = [];

    constructor() {
        super();
        this.x = Game.GAME_WIDTH - 105;
        this.y = 13;
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
}