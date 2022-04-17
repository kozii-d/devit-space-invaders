export class Element {
    x = null;
    y = null;
    node = null;

    draw() {
        this.node.style.top = this.y + 'px';
        this.node.style.left = this.x + 'px';
    }
}