import {startMatrixApplication, clearMatrix, setCell} from ".";

const N_ROWS = 30; 
const N_COLUMNS=30;
const INTERVAL_MS=100; 

startMatrixApplication(N_ROWS, N_COLUMNS, INTERVAL_MS, (matrix, tickCount, exit) => {
	const clearedMatrix =  clearMatrix(matrix); 
	const newMatrix = setCell(clearedMatrix, tickCount % N_ROWS, tickCount %N_COLUMNS, 'X'); 

	if (tickCount > 20) {
		exit("Thank you for playing!");
	}
	return newMatrix; 
}); 