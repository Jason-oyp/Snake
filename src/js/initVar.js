const XLEN = 30,
    YLEN = 30,
    SQUAREWIDTH = 20;
let MOVEINTERVAL = 300;

function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dom = dom || document.createElement('div');
}
Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.dom.style.left = x * SQUAREWIDTH + 'px';
    this.dom.style.top = y * SQUAREWIDTH + 'px';
}

let Floor = tools.extends(Square),
    Stone = tools.extends(Square),
    Food = tools.single(Square),
    SpeedFood = tools.single(Square),
    SnakeBody = tools.extends(Square),
    SnakeHead = tools.single(Square),
    Ground = tools.single(Square),
    Game = tools.single(),
    Snake = tools.single();

const MESSAGEENUM = {
    MOVE: 'move',
    EAT: 'eat',
    DIE: 'die'
}
