var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var dx = 2;
var dy = -2;
var paddleHeight = 65;
var paddleWidth = 20;
var paddleY = (canvas.height - paddleHeight) / 2;
var paddleX = 10;
var topPressed = false;
var downPressed = false;
var score = 0;
var lives = 3;
var framecount = 0;
var x = 0,
    y = 0;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 38) {
        topPressed = true;
    } else if (e.keyCode == 40) {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 38) {
        topPressed = false;
    } else if (e.keyCode == 40) {
        downPressed = false;
    }
}


var circle1 = {
    x: Math.floor((Math.random() * 1100) + 900),
    y: Math.floor((Math.random() * 600) + 60),
    col: "blue"
}
var circle2 = {
    x: Math.floor((Math.random() * 1100) + 900),
    y: Math.floor((Math.random() * 600) + 60),
    col: "black"
}
var circle3 = {
    x: Math.floor((Math.random() * 1100) + 900),
    y: Math.floor((Math.random() * 600) + 60),
    col: "green"
}
var circle4 = {
    x: Math.floor((Math.random() * 1100) + 900),
    y: Math.floor((Math.random() * 600) + 60),
    col: "red"
}
var circles = [];
circles.push(circle1);
circles.push(circle2);
circles.push(circle3);
circles.push(circle4);


function drawBall() {
    //  ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circles.length; i++) {
        var c = circles[i];
        ctx.beginPath();
        ctx.arc(c.x, c.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = c.col;
        ctx.fill();
        ctx.closePath();
    }
    x = circles[3].x;
    y = circles[3].y;

}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "gray";
    ctx.fillText("Score: " + score, 8, 20);
}

function collisionDetection() {
    if (paddleX > circles[3].x) {
        if (paddleY < circles[3].y && (paddleY + paddleHeight) > circles[3].y) {
            for (var i = 0; i < circles.length; i++) {
                circles[i].x = Math.floor((Math.random() * 1100) + 900);
                circles[i].y = Math.floor((Math.random() * 600) + 60);
            }
            lives--;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (!lives) {
                alert("YOU CROSSED MORE THAN 3 RED BALLS!! GAME OVER");
                document.location.reload();
            }
        }
    } else {
        if (paddleX > circles[0].x || paddleX > circles[1].x || paddleX > circles[2].x) {
            if ((paddleY < circles[0].y && (paddleY + paddleHeight) > circles[0].y) ||
                (paddleY < circles[1].y && (paddleY + paddleHeight) > circles[1].y) ||
                (paddleY < circles[2].y && (paddleY + paddleHeight) > circles[2].y)) {
                score++;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < circles.length; i++) {
                    circles[i].x = Math.floor((Math.random() * 1100) + 900);
                    circles[i].y = Math.floor((Math.random() * 600) + 60);
                }

            }
        }
    }
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "gray";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function animate() {
    setInterval(function() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();
        for (var i = 0; i < 4; i++) {
            circles[i].x -= dx;
        }
        if (topPressed && paddleY > 5) {
            paddleY -= 3;
        } else if (downPressed && paddleY < 580) {
            paddleY += 3;
        }
    }, 100 / 60);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
animate();
