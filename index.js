"use strict";

$(document).ready(function() {

$("#restart").hide();
$("#message").text('');

const canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// ball variables
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 1;
let dy = -1;
let ballRadius = 13;

// paddle variables
let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = ((canvas.width-paddleWidth)/2);

// user input variables
let rightPressed = false;
var leftPressed = false;

// brick variables
let brickRowCount = 4;
let brickColumnCount = 6;
let brickWidth = 75;
let brickHeight = 25;
let brickPadding = 13;
let brickOffsetTop = 30;
let brickOffsetLeft = (canvas.width/6);

var bricks = [];
for (let c = 0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 };
  }
}

$(document).keydown(keyDownHandler);
$(document).keyup(keyUpHandler);

function keyDownHandler (e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  }
}

function keyUpHandler (e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  }
}

function drawBall () {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#9957db";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle () {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#151d4f";
  ctx.fill();
  ctx.closePath();
}

function drawBricks () {
  for (let c = 0; c<brickColumnCount; c++) {
    for (let r = 0; r<brickRowCount; r++) {
      let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
      let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#5ec0ed";
      ctx.fill();
      ctx.closePath();
    }
  }
}

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
    $("#message").text("Game Over");
    $("#restart").show();
    return;
    }
  }
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 3;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 3;
  }
  x += dx;
  y += dy;
}

setInterval(draw, 1);

const restart = function (e) {
  e.preventDefault();
  location.reload();
}

$("#restart").on('click', restart);

});
