const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const startButton = document.getElementById("startButton");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20;
let snake = [{ x: boxSize * 5, y: boxSize * 5 }];
let direction = "RIGHT";
let score = 0;
let level = 1;
let speed = 150;
let food = {};
let gameInterval;

function resetGame() {
    snake = [{ x: boxSize * 5, y: boxSize * 5 }];
    direction = "RIGHT";
    score = 0;
    level = 1;
    speed = 150;
    placeFood();
    updateScoreAndLevel();
    clearInterval(gameInterval);
}

function startGame() {
    speed = 130; // Mengubah kecepatan awal ular
    resetGame();
    gameInterval = setInterval(draw, speed);
}

function updateScoreAndLevel() {
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };

    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food.x = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
        food.y = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
    }
}

function drawGrid() {
    const gridSize = boxSize; // Ukuran setiap kotak
    ctx.strokeStyle = '#ffffff'; // Warna garis
    ctx.lineWidth = 1; // Ketebalan garis

    // Menggambar garis vertikal
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Menggambar garis horizontal
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid(); // Menambahkan pemanggilan fungsi untuk menggambar grid

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#00f" : "#55f"; // Mengubah warna ular ke biru
        ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }

    // Draw food
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Move snake
    let head = { ...snake[0] };
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "UP") head.y -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;
    if (direction === "DOWN") head.y += boxSize;

    // Wrap around the canvas edges
    if (head.x < 0) head.x = canvas.width - boxSize;
    if (head.x >= canvas.width) head.x = 0;
    if (head.y < 0) head.y = canvas.height - boxSize;
    if (head.y >= canvas.height) head.y = 0;

    // Check for collisions with itself
    if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
        return;
    }

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        snake.unshift(head);
        placeFood();

        if (score % 30 === 0) {
            level += 1;
            speed = Math.max(50, speed - 20);
            clearInterval(gameInterval);
            gameInterval = setInterval(draw, speed);
        }
        updateScoreAndLevel();
    } else {
        snake.pop();
        snake.unshift(head);
    }
}

// Keyboard event listener
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

startButton.addEventListener("click", startGame);
