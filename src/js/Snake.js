let snake = new Snake();
snake.head = null;
snake.tail = null;
let directionEnum = {
    left: {
        x: -1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    },
    right: {
        x: 1,
        y: 0
    },
    bottom: {
        x: 0,
        y: 1
    }
}
snake.init = function () {
    let snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red'),
        snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'blue'),
        snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'blue');
    this.head = snakeHead;
    this.tail = snakeBody2;
    ground.remove(snakeHead.y, snakeHead.x);
    ground.append(snakeHead);
    ground.remove(snakeBody1.y, snakeBody1.x);
    ground.append(snakeBody1);
    ground.remove(snakeBody2.y, snakeBody2.x);
    ground.append(snakeBody2);

    //双向链表
    snakeHead.next = snakeBody1;
    snakeHead.last = null;
    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;
    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    this.direction = directionEnum.right;
}



snake.strategies = {
    move:function (square,isEat) {
        let newSnakeBody = SquareFactory.create('SnakeBody',snake.head.x,snake.head.y,'blue');
        newSnakeBody.last = snake.head;
        newSnakeBody.next = snake.head.next;
        snake.head.next.last = newSnakeBody;
        snake.head.next = newSnakeBody;
        ground.remove(snake.head.y,snake.head.x);
        ground.append(newSnakeBody);

        let newSnakeHead = SquareFactory.create('SnakeHead',square.x,square.y,'red');
        ground.remove(newSnakeHead.y,newSnakeHead.x);
        ground.append(newSnakeHead);

        if(isEat === 'eat'){
            return;
        }
        let newFloor = SquareFactory.create('Floor',snake.tail.x,snake.tail.y,'orange');
        snake.tail = snake.tail.last;
        ground.remove(newFloor.y,newFloor.x);
        ground.append(newFloor);

    },
    eat:function (square) {
        if(square.isSpeed){
            MOVEINTERVAL = 100;
            clearInterval(game.timer);
            clearTimeout(game.timer1);
            game.start();
            game.timer1 = setTimeout(function () {
                MOVEINTERVAL = 300;
                clearInterval(game.timer);
                game.start();
            },10000);
        }
        this.move(square,"eat");
        game.createFood();
        game.score++;
    },
    die:function () {
        game.over();
    }
}

snake.move = function () {
    let square = ground.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    this.strategies[square.touch()](square);
    
}
