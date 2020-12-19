//importing the express module
var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

console.log("server is running");

var socket = require('socket.io');
var io = socket(server); //keep track of inputs and outputs to the server
io.sockets.on('connection', newConnection);

//dictionary containing players for each connection
var players = {};

function newConnection(socket) {
	console.log('new connection: ' + socket.id);
	socket.on('disconnect', () => {	
		console.log('lost connection: ' + socket.id);
		delete(players[socket.id]);
  	});

	players[socket.id] = new Player();
	io.sockets.emit('players',players);
	
	socket.on('key', keyMsg);

	function keyMsg(key){ //data is the key pressed
		players[socket.id].move(key);
		io.sockets.emit('players',players);
		// socket.broadcast.emit('key', data); // this sends to everyone minus the client that sent the message
	}
}

function Player(){
	this.x = 20;
	this.y = 20;
	this.speed = 2;

	this.move = function(dir){
		if(dir == "up"){
			this.y -= this.speed;
		} else if (dir == "down") {
			this.y += this.speed;
		} else if (dir == "left") {
			this.x -= this.speed;
		} else if (dir == "right") {
			this.x += this.speed;
		}
	}
}