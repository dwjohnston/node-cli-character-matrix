import { startMatrixApplication, clearMatrix, setCell } from ".";

const N_ROWS = 5;
const N_COLUMNS = 5;
const INTERVAL_MS = 100;

const colors = ["red", "green", "blue", "orange", "purple"]; 

startMatrixApplication({
	nRows: N_ROWS,
	nColumns: N_COLUMNS,
	intervalTime: INTERVAL_MS,
	onTick: (matrix, tickCount, exit) => {
		const clearedMatrix = clearMatrix(matrix);
		const newMatrix = setCell(clearedMatrix, tickCount % N_ROWS, tickCount % N_COLUMNS, {
			char:'X', 
			color: colors[tickCount%5], 
			backgroundColor: colors[(tickCount+1)%5], 
		});

		if (tickCount > 20) {
			exit("Thank you for playing!");
		}
		return {newMatrix, newState: null};
	},
	initialState: null,
});



