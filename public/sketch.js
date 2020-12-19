var socket;
var players;
var gameStart = false;

function setup() {
  createCanvas(400, 400);
  socket = io(); //defaults to host that serves the page
  socket.on('players', test);
}

function draw() {
  background(220);
  if (keyIsDown(UP_ARROW)){
  	key = "up";
  	socket.emit('key',key);
  } else if (keyIsDown(DOWN_ARROW)){
  	key = "down";
  	socket.emit('key',key);
  } else if (keyIsDown(LEFT_ARROW)){
  	key = "left";
  	socket.emit('key',key);
  } else if (keyIsDown(RIGHT_ARROW)){
  	key = "right";
  	socket.emit('key',key);
  } 

  if(gameStart){
  	for(player in players) {
  		if(socket.id == player){
  			fill("green");
  		} else {
  			fill("red");
  		}
  		rect(players[player].x, players[player].y, 20, 20);
  	}
  }
}

function test(data){
	players = data;
	gameStart = true;
}