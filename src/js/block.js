export class Block {
    static BLOCK_SIZE = 15;

    x = 0;
    y = 0;
    node = null;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.node = this.create();
        this.draw();
    }

    create() {
        // const gameField = document.querySelector('.game-field');
        const element = document.createElement('div');
        // gameField.appendChild(element);
        element.classList.add('block');
        element.style.height = Block.BLOCK_SIZE + 'px';
        element.style.width = Block.BLOCK_SIZE + 'px';

        return element;
    }

    draw() {
        this.node.style.top = this.y + 'px';
        this.node.style.left = this.x + 'px';
    }
}