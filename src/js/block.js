import {Element} from "./element";

export class Block extends Element {
    static BLOCK_SIZE = 15;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.node = this.create();
        this.draw();
    }

    create() {
        const element = document.createElement('div');
        element.classList.add('block');
        element.style.height = Block.BLOCK_SIZE + 'px';
        element.style.width = Block.BLOCK_SIZE + 'px';

        return element;
    }
}