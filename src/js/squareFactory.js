function SquareFactory() {

}

SquareFactory.create = function (type, x, y, color) {
    if (typeof SquareFactory.prototype[type] === 'undefined') {
        throw new Error('no this type!');
    }
    if (SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    return new SquareFactory.prototype[type](x, y, color);
}

SquareFactory.prototype.init = function (square, color, msg) {
    square.dom.style.position = 'absolute';
    square.dom.style.left = square.x * SQUAREWIDTH + 'px';
    square.dom.style.top = square.y * SQUAREWIDTH + 'px';
    square.dom.style.width = square.width + 'px';
    square.dom.style.height = square.height + 'px';
    square.dom.style.backgroundColor = color;
    square.touch = function () {
        return msg;
    }
}

SquareFactory.prototype.Floor = function (x, y, color) {
    let floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    floor.isFood = true;
    this.init(floor, color, MESSAGEENUM.MOVE);
    return floor;
}

SquareFactory.prototype.Stone = function (x, y, color) {
    let stone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(stone, color, MESSAGEENUM.DIE);
    return stone;
}

SquareFactory.prototype.Food = function (x, y, color) {
    let food = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(food, color, MESSAGEENUM.EAT);
    food.upDate(x,y);
    return food;
}

SquareFactory.prototype.SpeedFood = function (x, y, color) {
    let sFood = new SpeedFood(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(sFood, color, MESSAGEENUM.EAT);
    sFood.isSpeed = true;
    sFood.upDate(x,y);
    return sFood;
}

SquareFactory.prototype.SnakeHead = function (x, y, color) {
    let snakeHead = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(snakeHead, color, MESSAGEENUM.DIE);
    snakeHead.upDate(x,y);
    return snakeHead;
}

SquareFactory.prototype.SnakeBody = function (x, y, color) {
    let snakeBody = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(snakeBody, color, MESSAGEENUM.DIE);
    return snakeBody;
}

