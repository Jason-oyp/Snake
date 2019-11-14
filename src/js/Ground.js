const ground = new Ground(500, 100, 20 * 30, 20 * 30);
ground.init = function () {
    this.dom.style.position = 'absolute';
    this.dom.style.left = this.x + 'px';
    this.dom.style.top = this.y + 'px';
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
    this.dom.style.backgroundColor = "#abcdef";
    document.body.appendChild(this.dom);
    this.squareTable = [];
    for (let i = 0; i < YLEN; i++) {
        this.squareTable[i] = new Array(XLEN);
        for (let j = 0; j < XLEN; j++) {
            if (i === 0 || i === YLEN - 1 || j === 0 || j === XLEN - 1) {
                var temp = SquareFactory.create('Stone', j, i, 'black');

            } else {
                temp = SquareFactory.create('Floor', j, i, 'orange');
            }
            this.dom.appendChild(temp.dom);
            this.squareTable[i][j] = temp;
        }
    }
}

ground.remove = function (x, y) {
    this.dom.removeChild(this.squareTable[x][y].dom);
    this.squareTable[x][y] = null;
}

ground.append = function (square) {
    this.dom.appendChild(square.dom);
    this.squareTable[square.y][square.x] = square;
}