import { startMatrixApplication, clearMatrix, setCell, KeyPress } from ".";

const N_ROWS = 5;
const N_COLUMNS = 5;
const INTERVAL_MS = 100;


/**
 * Functional/folding style of state management
 */

startMatrixApplication({
	nRows: N_ROWS,
	nColumns: N_COLUMNS,
	intervalTime: INTERVAL_MS,
	initialState: {
		x: 0,
		y: 0,
	},
	onTick: (matrix, tickCount, exit, keyPress, oldState) => {
		const clearedMatrix = clearMatrix(matrix);

		function getVector(keyPress: KeyPress | null) : {
			x: number; 
			y: number;
		} {
			if (keyPress) {

				switch (keyPress.name) {
					case "down": {
						return {
							x: 0,
							y: 1,
						}
					}
					case "up": {
						return {
							x: 0,
							y: -1,
						}
					}

					case "left": {
						return {
							x: -1,
							y: 0,
						}
					}

					case "right": {
						return {
							x: 1,
							y: 0,
						}
					}

					default: {
						return {
							x: 0,
							y: 0,
						}
					}
				}
			}

			return {
				x: 0,
				y: 0,
			}
		}

		const vector = getVector(keyPress);

		const newState = {
			x: (oldState.x + N_COLUMNS + vector.x) % N_COLUMNS,
			y: (oldState.y + N_ROWS + vector.y) % N_ROWS
		}

		const newMatrix = setCell(clearedMatrix, newState.y, newState.x, 'X');

		if (tickCount > 100) {
			exit("Thank you for playing!");
		}
		return {
			newMatrix,
			newState
		}
	}
});


