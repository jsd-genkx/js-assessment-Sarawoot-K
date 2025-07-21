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
		this.field[this.positionRow][this.positionCol] = pathCharacter;
	}

	//----Step 1 สร้างเงื่อนไขการเดิน
	askformove(){
		const move = prompt('Which way : (A:left, D:right, W:up, S:down')
	}





	// Print field //
	print() {
		clear();
		this.print()
	}

	// Your Code //
}

// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
const newGame = new Field([
	["░", "░", "O"],
	["░", "O", "░"],
	["░", "^", "░"],
]);
newGame.print();
