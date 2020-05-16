let score = 0;
const TILE_SIZE = 20;
const UP = Symbol("UP");
const DOWN = Symbol("DOWN");
const LEFT = Symbol("LEFT");
const RIGHT = Symbol("RIGHT");
const apple = { x: 10, y: 10 };
const snake = {
    head: { x: 5, y: 5 },
    body: [{ x: 4, y: 5 }, { x: 3, y: 5 }, { x: 2, y: 5 }, { x: 1, y: 5 }],
    direction: 0,
    direction: DOWN
}

function renderPixel({ x, y }) {
    rect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function handleDeath({ x, y }) {
    let died = false;
    if (x < 0 || x > 29 || y < 0 || y > 29) {
        died = true;
    }
    snake.body.forEach(({ x: x2, y: y2 }) => {
        if (x === x2 && y === y2) {
            died = true;
        }
    })
    if (died) {
        noLoop();
    }
}

function updateSnake() {
    if (!(snake.head.x === apple.x && snake.head.y === apple.y)) {
        snake.body.pop();
    } else {
        apple.x = floor(random(1, 30))
        apple.y = floor(random(1, 30))
        score++;
    }
    snake.body.unshift({
        x: snake.head.x,
        y: snake.head.y
    });
}

function setup() {
    createCanvas(600, 600);
}
let tick = 0;

function draw() {
    background(0);
    // Draw border
    strokeWeight(5);
    noFill();
    rect(1, 0, 599, 600);
    noStroke();
    fill(255);
    textFont("monospace");
    textSize(30);
    text(`Score: ${score}`, 10, 30)
        // Draw apple
    fill(0, 255, 0)
    renderPixel(apple);
    // Draw snake
    fill(0, 0, 255);
    renderPixel(snake.head);
    snake.body.forEach(renderPixel)
        // Move snake
    if (tick % 4 === 0) {
        switch (snake.direction) {
            case RIGHT:
                updateSnake();
                handleDeath({
                    x: snake.head.x + 1,
                    y: snake.head.y
                });
                snake.head.x += 1;
                break;
            case LEFT:
                updateSnake();
                handleDeath({
                    x: snake.head.x - 1,
                    y: snake.head.y
                });
                snake.head.x -= 1;
                break;
            case UP:
                updateSnake();
                handleDeath({
                    x: snake.head.x,
                    y: snake.head.y - 1
                });
                snake.head.y -= 1;
                break;
            case DOWN:
                updateSnake();
                handleDeath({
                    x: snake.head.x,
                    y: snake.head.y + 1
                });
                snake.head.y += 1;
                break;
        }
    }
    tick++;
}

function keyPressed() {
    if (key === "ArrowRight") {
        if (snake.direction !== LEFT) {
            snake.direction = RIGHT;
        }
    }
    if (key === "ArrowLeft") {
        if (snake.direction !== RIGHT) {
            snake.direction = LEFT;
        }
    }
    if (key === "ArrowUp") {
        if (snake.direction !== DOWN) {
            snake.direction = UP;
        }
    }
    if (key === "ArrowDown") {
        if (snake.direction !== UP) {
            snake.direction = DOWN;
        }
    }
}