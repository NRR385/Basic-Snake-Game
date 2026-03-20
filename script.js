const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const box = 20;

let snake;
let direction;
let food;
let goldenFood = null;

let redFoodCounter = 0;

let score;
let game;
let speed;
let paused=false;

let playerName="Player";

let highScore = localStorage.getItem("snakeHighScore") || 0;
document.getElementById("highScore").innerText = highScore;

let leaderboard = JSON.parse(localStorage.getItem("snakeLeaderboard")) || [];


/* LEADERBOARD */

function updateLeaderboard(){

  const board=document.getElementById("leaderboard");
  board.innerHTML="";

  leaderboard.forEach((player,index)=>{
    const li=document.createElement("li");
    li.innerText=(index+1)+". "+player.name+" - "+player.score;
    board.appendChild(li);
  });

}

function saveScore(){

  leaderboard.push({
    name:playerName,
    score:score
  });

  leaderboard.sort((a,b)=>b.score-a.score);

  leaderboard=leaderboard.slice(0,5);

  localStorage.setItem("snakeLeaderboard",JSON.stringify(leaderboard));

  updateLeaderboard();
}


/* INIT GAME */

function initGame(){

  snake=[
    {x:200,y:200},
    {x:180,y:200},
    {x:160,y:200}
  ];

  direction="RIGHT";
  score=0;
  speed=120;
  paused=false;
  redFoodCounter=0;

  document.getElementById("score").innerText=score;

  food={
    x:Math.floor(Math.random()*20)*box,
    y:Math.floor(Math.random()*20)*box
  };

  goldenFood=null;

}


/* CONTROLS */

document.addEventListener("keydown",changeDirection);

function changeDirection(event){

  if(event.key==="p" || event.key==="P"){

    if(paused){
      game=setInterval(draw,speed);
      paused=false;
    }else{
      clearInterval(game);
      paused=true;

      ctx.fillStyle="white";
      ctx.font="30px Arial";
      ctx.fillText("PAUSED",150,200);
    }

  }

  if(event.key==="ArrowUp" && direction!=="DOWN") direction="UP";
  if(event.key==="ArrowDown" && direction!=="UP") direction="DOWN";
  if(event.key==="ArrowLeft" && direction!=="RIGHT") direction="LEFT";
  if(event.key==="ArrowRight" && direction!=="LEFT") direction="RIGHT";

}


/* DRAW SNAKE */

function drawSnake(){

  for(let i=0;i<snake.length;i++){

    if(i===0){
      ctx.fillStyle="#4ade80";
    }else{
      ctx.fillStyle="#22c55e";
    }

    ctx.fillRect(snake[i].x,snake[i].y,box,box);

  }

}


/* DRAW NORMAL FOOD */

function drawFood(){

  ctx.fillStyle="#ef4444";

  ctx.beginPath();
  ctx.arc(food.x+10,food.y+10,8,0,Math.PI*2);
  ctx.fill();

}


/* DRAW GOLDEN FOOD */

function drawGoldenFood(){

  if(goldenFood){

    ctx.fillStyle="gold";

    ctx.beginPath();
    ctx.arc(goldenFood.x+10,goldenFood.y+10,9,0,Math.PI*2);
    ctx.fill();

  }

}


/* SPAWN GOLD FOOD */

function spawnGoldenFood(){

  goldenFood={
    x:Math.floor(Math.random()*20)*box,
    y:Math.floor(Math.random()*20)*box
  };

  setTimeout(()=>{
    goldenFood=null;
  },5000);

}


/* GAME LOOP */

function draw(){

  ctx.clearRect(0,0,400,400);

  drawSnake();
  drawFood();
  drawGoldenFood();

  let headX=snake[0].x;
  let headY=snake[0].y;

  if(direction==="LEFT") headX-=box;
  if(direction==="RIGHT") headX+=box;
  if(direction==="UP") headY-=box;
  if(direction==="DOWN") headY+=box;

  if(headX<0) headX=380;
  if(headX>=400) headX=0;
  if(headY<0) headY=380;
  if(headY>=400) headY=0;

  let newHead={x:headX,y:headY};

  for(let i=1;i<snake.length;i++){
    if(newHead.x===snake[i].x && newHead.y===snake[i].y){
      gameOver();
      return;
    }
  }

  /* RED FOOD */

  if(headX===food.x && headY===food.y){

    score+=1;
    redFoodCounter++;

    document.getElementById("score").innerText=score;

    if(score%5===0 && speed>50){
      speed-=10;
      clearInterval(game);
      game=setInterval(draw,speed);
    }

    food={
      x:Math.floor(Math.random()*20)*box,
      y:Math.floor(Math.random()*20)*box
    };

    /* GOLD FOOD AFTER 5 RED */

    if(redFoodCounter===5){
      spawnGoldenFood();
      redFoodCounter=0;
    }

  }

  /* GOLD FOOD */

  else if(goldenFood && headX===goldenFood.x && headY===goldenFood.y){

    score+=5;

    goldenFood=null;

    document.getElementById("score").innerText=score;

  }

  else{

    snake.pop();

  }

  snake.unshift(newHead);

}


/* START GAME */

function startGame(){

  let nameInput=prompt("Enter your name:");

  if(nameInput && nameInput.trim()!==""){
    playerName=nameInput;
  }

  initGame();

  startBtn.style.display="none";
  restartBtn.style.display="none";

  game=setInterval(draw,speed);

}


/* GAME OVER */

function gameOver(){

  clearInterval(game);

  if(score>highScore){

    highScore=score;
    localStorage.setItem("snakeHighScore",highScore);
    document.getElementById("highScore").innerText=highScore;

  }

  saveScore();

  ctx.fillStyle="rgba(0,0,0,0.7)";
  ctx.fillRect(0,0,400,400);

  ctx.fillStyle="white";
  ctx.font="35px Arial";
  ctx.fillText("GAME OVER",100,180);

  ctx.font="20px Arial";
  ctx.fillText("Score: "+score,160,220);

  restartBtn.style.display="inline-block";

}


function restartGame(){

  clearInterval(game);
  startGame();

}

startBtn.addEventListener("click",startGame);
restartBtn.addEventListener("click",restartGame);

updateLeaderboard();