$(document).ready(function(){
	console.log("Hello Snake");

	var canvasWidth = 500;
	var canvasHeight = 500;

	var canvas = $("#game")[0];
	var context = canvas.getContext("2d");

	var gameHeight = 20;
	var gameWidth = 20;

	var gameState = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	];

	var tileTypes = {
		blank : 0,
		snake : 1,
		food : 2,
		otherPlayer : 3
	}

	var snakeDirections = {
		up : {x: -1, y: 0},
		down : {x:1, y: 0},
		left: {x:0, y:-1},
		right: {x:0, y:1}
	};

	var snakeDirection = snakeDirections.up;

	$(document).keydown(function(e){
		e.preventDefault();
		switch (e.keyCode) {
			case 38 :
				snakeDirection = snakeDirections.up;
				break;
			case 40 :
				snakeDirection = snakeDirections.down;
				break;
			case 37 :
				snakeDirection = snakeDirections.left;
				break;
			case 39 :
				snakeDirection = snakeDirections.right;
				break;
			default:
				break;
		}
	});

	var snake = [{x:10,y:10}];

	FPS = 10;
	setInterval(function(){
		update();
		draw();
	}, 1000/FPS);

	var update = function(){
		var eat = false;
		// update snake:

		// add dot to begginning
		var newX = snake[0].x + snakeDirection.x
		var newY = snake[0].y + snakeDirection.y

		// Check Bounds:
		if(newX < 0){
			newX = gameWidth - 1;
		} else if (newX >= gameWidth){
			newX = 0;
		}
		if(newY < 0){
			newY = gameHeight - 1;
		} else if (newY >= gameHeight){
			newY = 0;
		}
		snake.unshift({x:newX,y:newY})

		// Check for Food:
		if(gameState[newX][newY] == 2){
			eat = true;
			randX = Math.floor(Math.random()*20);
			randY = Math.floor(Math.random()*20);
			if(gameState[randX][randY] == tileTypes.blank){
				gameState[randX][randY] = tileTypes.food;
			}
		}

		// remove dot from end
		if(!eat){
			snake.pop();
		}

		// clear the snake
		for(i=0; i<gameWidth; i++){
			for(j=0; j<gameHeight; j++){
				if(gameState[i][j] == tileTypes.snake){
					gameState[i][j] = tileTypes.blank
				};
			}
		}

		// draw the snake
		for(i = 0; i<snake.length;i++){
			gameState[snake[i].x][snake[i].y] = tileTypes.snake
		}

	}

	var draw = function(){

		context.clearRect(0,0,canvasWidth,canvasHeight)
		
		var xLength = gameState[0].length;
		var yLength = gameState.length;

		var padding = 0;

		var remX = canvasWidth - padding*(xLength-1);
		var remY = canvasWidth - padding*(yLength-1);

		var squareWidth = remX/xLength;
		var squareHeight = remY/yLength;

		for(i = 0; i < xLength; i++){
			for(j = 0; j < yLength; j++){
				if(gameState[i][j] == tileTypes.blank){
					context.fillStyle = "#eee";
					context.fillRect(j * (squareHeight + padding), i*(squareWidth + padding),squareHeight , squareWidth);
				} else if (gameState[i][j] == tileTypes.food){
					context.fillStyle = "#f00";
					context.fillRect(j * (squareHeight + padding), i*(squareWidth + padding),squareHeight , squareWidth);
				} else if (gameState[i][j] == tileTypes.snake){
					context.fillStyle = "#000";
					context.beginPath();
				    context.arc(j * (squareHeight + padding) + squareWidth/2, i*(squareWidth + padding)+ squareWidth/2, squareWidth/2, 0, 2 * Math.PI, false);
				    context.fill();
				} else if (gameState[i][j] == tileTypes.otherPlayer){
					context.fillStyle = "#00f";
					context.beginPath();
				    context.arc(j * (squareHeight + padding) + squareWidth/2, i*(squareWidth + padding)+ squareWidth/2, squareWidth/2, 0, 2 * Math.PI, false);
				    context.fill();
				}
			}
		}

	}


})