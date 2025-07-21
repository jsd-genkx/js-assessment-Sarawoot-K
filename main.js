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

		//---ตำแหน่งเริ่มต้น
		this.positionRowX= 0;
		this.positionColY= 0;
		this.field[this.positionRowX][this.positionColY]=pathCharacter;

		//--- find position
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
	print(){
		for(let i = 0 ; i < this.field.length; i++){
			console.log(this.field[i].join(''));
		}
	}

	//----Step 1 Move
	askformove(){
		const move = prompt('Which way (A:left, D:right, W:up, S:down) =>').toUpperCase();
		let newPositionRowX = this.positionRowX;
		let newPositionColY = this.positionColY;

		switch (move){
			case 'A' : newPositionRowX--;
				break;
			case 'D' : newPositionRowX++;
				break;
			case 'W' : newPositionColY--;
				break;
			case 'S' : newPositionColY++;
				break;
			default:
				console.log('please use to A,D,W,S');
				return false;
		}
		return {x:newPositionRowX,y:newPositionColY};
	}

	//----step2 check move and Game over
	checkmove(newX,newY){
		//--- check ตก map
		if(newY< 0 || newY >= this.field.length ||
			newX < 0 || newX >= this.field[0].length){
				this.gameOver = true;
				this.gameStatus = 'Lose (You walked off the map.)';
				return false;
			}

		//-----check object
		const targetmove = this.field[newY][newX];

		if (targetmove===hole){
			this.gameOver= true
			this.gameStatus = 'Lose (You fall into a hole)'
			return false;
		}

		if (targetmove===hat){
			this.gameOver = true
			this.gameStatus = 'Win 🎉';
			return false;
		}

		//---ตำแหน่งใหม่
		this.positionColY = newY;
		this.positionRowX = newX;
		//---tracking
		this.field[this.positionColY][this.positionRowX] = pathCharacter;
		return true;
	}

	//---- step3 runGame
	runGame(){
		clear();
		this.print();

		while(!this.gameOver){
			//--- ถ้าตำแหน่งใหม่ค่า false ให้ continue input ต่อ
			const newPos = this.askformove();
			if(newPos===false){
				continue;
			}

			//--- ถ้าค่า true ให้เคลียร์แล้วปริ้นใหม่
			const isValidMove = this.askformove(newPos.x,newPos.y);
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

// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
const newGame = new Field([
	["░", "░", "O"],
	["░", "O", "░"],
	["░", "^", "░"],
]);
newGame.print();
