"use strict";
// JS Assessment: Find Your Hat //
import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });


const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
	constructor(field = [[]]) {
		this.field = field;

		this.positionRowX = 0;
		this.positionColY = 0;
		// this.field[this.positionRowX][this.positionColY] = pathCharacter;

		// find position
		for (let i = 0; i < this.field.length; i++){
			for (let j = 0 ; j < this.field[i].length; j++){
				if(this.field[i][j]===pathCharacter){
					this.positionColY = i ;
					this.positionRowX= j ;
					break;
				}
			}
			if(this.field[this.positionColY][this.positionRowX]===pathCharacter)
				break;
		}
		this.gameOver = false;
		this.gameStatus = 'playing';
	}

	// Print field //
	print() {
		for(let i = 0; i< this.field.length; i++){
			console.log(this.field[i].join(''));
		}
	}

	//----Step 1 Move
	askformove(){
		const move = prompt("Which Way (A:left, D:right, W:up, S:down)").toUpperCase();
		let newPositionRowX = this.positionRowX;
		let newPositionColY = this.positionColY;

		switch (move){
			case 'A' : newPositionRowX--;
				break;
			case 'D': newPositionRowX++;
				break;
			case 'W':newPositionColY--;
				break;
			case 'S' : newPositionColY++;
				break;
			default:
				console.log('Please use to A, D, W, S');
				return false;
		}
		return{x:newPositionRowX, y: newPositionColY};
	}

	//----step2 check move and Game over
	checkmove(newX,newY){

		//--- check ตก map
		if(newY < 0 || newY >= this.field.length ||
			newX <0 || newX >= this.field[0].length){
			this.gameOver = true;
			this.gameStatus = 'Lose (You walked off the map.)';
			return false;
			}

		//-----check object
		const targetmove = this.field[newY][newX];
		if(targetmove===hole){
			this.gameOver = true;
			this.gameStatus = 'Lose (You fall into a hole)';
			return false;
		}
		if(targetmove===hat){
			this.gameOver = true;
			this.gameStatus = 'Win🎉';
			return false;
		}
		//---ตำแหน่งใหม่
		this.positionColY = newY;
		this.positionRowX = newX;
		//---tracking
		this.field[this.positionColY][this.positionRowX] = pathCharacter
		return true;
	}

	//---- step3 runGame
	runGame(){
		clear();
		this.print();

		//--- ถ้าตำแหน่งใหม่ค่า false ให้ continue input ต่อ
		while(!this.gameOver){
			const newPos = this.askformove();
			if(newPos===false){
				continue;
			}
			//--- ถ้าค่า true ให้เคลียร์แล้วปริ้นใหม่
			const isValidMove = this.checkmove(newPos.x,newPos.y)
			if(isValidMove){
				clear();
				this.print();
			}
			//--- ถ้า GamesOver เป็น true ให้เคลียร์
			if(this.gameOver){
				clear();
			}
		}
		//---แสดงผลเกม
		console.log(`Game Over! --> You ${this.gameStatus}`);
	}
}

//--- RandomMap
const genfield = (height, width, holePercent) => {
	//-----randomField
	const map = [];
	for( let i=0; i<height;i++){
		map.push([]);
		for(let j=0; j<width;j++){
			const rand = Math.random();
			if(rand<holePercent/100){
				map[i].push(hole);
			}
			else{
				map[i].push(fieldCharacter);
			}
		}
	}
	//-----randomHat
	let hatX,hatY;
	do{
		hatX = Math.floor(Math.random()*width);
		hatY = Math.floor(Math.random()*height);
	} while (hatX===0 && hatY ===0);
	map[hatX][hatY] = hat;

	//------randomPlayer
	let playerX,playerY;
	do{
		playerX = Math.floor(Math.random()*width);
		playerY = Math.floor(Math.random()*height);
	} while(playerX===0 && playerY===0);
	map[playerX][playerY] = pathCharacter;
	return map;
};

const randomField = genfield(9,9,20);
const newGame = new Field(randomField);
newGame.runGame();
