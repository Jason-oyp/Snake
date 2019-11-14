const game = new Game();
game.score = 0;
game.init = function () {
    ground.init();
    snake.init();
    this.createFood();
    this.bindEvent();
    this.start();
}

game.start = function () {
    this.timer = setInterval(function () {
        snake.move();
    }, MOVEINTERVAL);
}

game.over = function () {
    clearInterval(this.timer);
    alert(this.score);
}

game.bindEvent = function () {
    let keydown = (function () {
        let lastTime = 0;
        return function (e) {
            let nowTime = new Date().getTime();
            if (nowTime - lastTime < 80) {
                return;
            }
            lastTime = nowTime;
            if (e.which === 37 && snake.direction !== directionEnum.right) {
                snake.direction = directionEnum.left;
            } else if (e.which === 38 && snake.direction !== directionEnum.bottom) {
                snake.direction = directionEnum.top;
            } else if (e.which === 39 && snake.direction !== directionEnum.left) {
                snake.direction = directionEnum.right;
            } else if (e.which === 40 && snake.direction !== directionEnum.top) {
                snake.direction = directionEnum.bottom;
            }
        }
    })();
    window.addEventListener('keydown', keydown, false);

}

game.createFood = function () {
    let temp = [];
    for (let i = 0; i < ground.squareTable.length; i++) {
        temp = temp.concat(ground.squareTable[i].filter(function (item) {
            return item.isFood;
        }));
    }
    let num = Math.floor(Math.random() * temp.length) + 1;
    console.log(num, temp[num],temp);
    ground.remove(temp[num].y, temp[num].x);
    let color = Math.random() - 0.2 > 0 ? "green" : "pink";
    let isSpeed = color === 'pink' ? "SpeedFood" : "Food";
    ground.append(SquareFactory.create(isSpeed, temp[num].x, temp[num].y, color))
}

game.init();