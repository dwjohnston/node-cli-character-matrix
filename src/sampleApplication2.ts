import {startMatrixApplication, clearMatrix, setCell} from ".";

const N_ROWS = 5; 
const N_COLUMNS=5;
const INTERVAL_MS=100; 

startMatrixApplication(N_ROWS, N_COLUMNS, INTERVAL_MS, (matrix, tickCount, exit, keyPress) => {
	const clearedMatrix =  clearMatrix(matrix); 
	const newMatrix = setCell(clearedMatrix, tickCount % N_ROWS, tickCount %N_COLUMNS, 'X'); 

	if (tickCount > 20) {
		exit("Thank you for playing!");
	}
	return newMatrix; 
}); 