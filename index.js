"use strict";

$(document).ready(function() {
    $("#test-btn").on('click', function() {
      $("#test").html("Hello, World!");
    })


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

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 3;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 3;
  }
  x += dx;
  y += dy;
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

setInterval(draw, 1);

});
