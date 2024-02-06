const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const fieldWidth = canvas.width;
const fieldHeight = canvas.height;

const goalWidth = 20;
const goalHeight = 100;
const leftGoalX = 0;
const rightGoalX = fieldWidth - goalWidth;
const goalY = (fieldHeight - goalHeight) / 2;

let ballX = fieldWidth / 2;
let ballY = fieldHeight / 2;

let targetX = fieldWidth / 2;
let targetY = fieldHeight / 2;

let scoreLeft = 0;
let scoreRight = 0;

function drawField() {
    ctx.fillStyle = '#008000'; 
    ctx.fillRect(0, 0, fieldWidth, fieldHeight);

    ctx.fillStyle = '#444'; 
    ctx.fillRect(leftGoalX, goalY, goalWidth, goalHeight);
    ctx.fillRect(rightGoalX, goalY, goalWidth, goalHeight);

    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();

    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText('Score: ' + scoreLeft + ' - ' + scoreRight, fieldWidth / 2 - 40, 30);
}


const ballTexture = new Image();
ballTexture.src = './img/Ball.png'; 

ballTexture.onload = function() {
    ctx.drawImage(ballTexture, ballX - 10, ballY - 10, 20, 20); 
};



function update() {
    const dx = targetX - ballX;
    const dy = targetY - ballY;
    const speed = 14;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > speed) {
        ballX += (dx / distance) * speed;
        ballY += (dy / distance) * speed;
    } else {
        ballX = targetX;
        ballY = targetY;
    }
}

canvas.addEventListener('click', (e) => {
    targetX = e.clientX - canvas.getBoundingClientRect().left;
    targetY = e.clientY - canvas.getBoundingClientRect().top;

    if (targetX < leftGoalX && targetY > goalY && targetY < goalY + goalHeight) {
        scoreRight++;
    } else if (targetX > rightGoalX && targetY > goalY && targetY < goalY + goalHeight) {
        scoreLeft++;
    }
});

function gameLoop() {
    update();
    drawField();
    requestAnimationFrame(gameLoop);
}

gameLoop();