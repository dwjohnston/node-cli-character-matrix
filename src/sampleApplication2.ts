import {startMatrixApplication, clearMatrix, setCell} from ".";

const N_ROWS = 5; 
const N_COLUMNS=5;
const INTERVAL_MS=100; 


let currentX = 0; 
let currentY = 0; 

startMatrixApplication(N_ROWS, N_COLUMNS, INTERVAL_MS, (matrix, tickCount, exit, keyPress) => {
	const clearedMatrix =  clearMatrix(matrix); 

	if (keyPress) {

		switch (keyPress.name) {
			case "down": {
				currentY = (currentY + 1 + N_ROWS) % N_ROWS; 
				break;
			}
			case "up" : {
				currentY = (currentY - 1 + N_ROWS) % N_ROWS; 
				break;
			}

			case "left" : {
				currentX = (currentX - 1 + N_COLUMNS) %N_COLUMNS; 
				break;
			}

			case  "right" : {
				currentX = (currentX + 1 + N_COLUMNS) %N_COLUMNS; 
				break;
			}

			default: {

			}
		}
	}

	const newMatrix = setCell(clearedMatrix, currentY, currentX, 'X');

	if (tickCount > 100) {
		exit("Thank you for playing!");
	}
	return newMatrix; 
}); 