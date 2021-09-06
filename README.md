# node-cli-character-matrix
A simple cli tool for drawing matrix based games. 


# Notes: 

- Emoji are not supported at this stage. 

## Data Types

**Char** 

```typescript
export type Char = string | {
	char: string; 
	color?: string; 
	backgroundColor?: string; 
}
```

## Functions 

### startMatrixApplication(options)

**Options object**

- **nRows** - Number of rows the matrix is to have
- **nColumns** - Number of columns the matrix is to have. 
- **interval** - Time in ms between ticks 
- **onTick** a function of the signature: `<T,>(matrix: Matrix, tickCount: number, exit: (message:string) => void, keyPress: KeyPress, oldState:T) => {newMatrix: Matrix, newState: T}`
- **initialState** The value that the state is initially set as. 

That is: 

Each tick the onTick function will be called with matrix as it currently is, the state as it currently is, the tick count number, the most recent key press (if any) and a function to be called to stop the application running. That function can take an exit message. 

The value returned from this onTick function is what will be displayed on the matrix next, as well as any new state to be passed back. This allows for a functional style of programming.

### createMatrix(rows, columns) 

Create a blank matrix of nRows rows and nColumns columns.

Returns: the blank matrix
### setCell(matrix, rowNum, cellNum, char)

For the given matrix, set the cell at rowNum/cellNum as the given character

Returns: the new matrix

### clearMatrix(matrix) 

Create a blank matrix of the same size as the given one. 

Returns: the blank matrix 





## Sample application: 

The following application will draw an X starting at the top left corner, moving to the bottom right corner. 

It stops after 20 ticks. 

State is not used in this example. 

```javascript
import { startMatrixApplication, clearMatrix, setCell } from "node-cli-character-matrix";

const N_ROWS = 5;
const N_COLUMNS = 5;
const INTERVAL_MS = 100;

startMatrixApplication({
	nRows: N_ROWS,
	nColumns: N_COLUMNS,
	intervalTime: INTERVAL_MS,
	onTick: (matrix, tickCount, exit) => {
		const clearedMatrix = clearMatrix(matrix);
		const newMatrix = setCell(clearedMatrix, tickCount % N_ROWS, tickCount % N_COLUMNS, 'X');

		if (tickCount > 20) {
			exit("Thank you for playing!");
		}
		return {newMatrix, newState: null};
	},
	initialState: null,
});

```


## Sample Application with Key Presses 

This application will move the X around with the keyboard arrow keys. 

State is not used in this example. 

```javascript

let currentX = 0;
let currentY = 0;

startMatrixApplication({
	nRows: N_ROWS,
	nColumns: N_COLUMNS,
	intervalTime: INTERVAL_MS,
	initialState: null,
	onTick: (matrix, tickCount, exit, keyPress) => {
		const clearedMatrix = clearMatrix(matrix);

		if (keyPress) {

			switch (keyPress.name) {
				case "down": {
					currentY = (currentY + 1 + N_ROWS) % N_ROWS;
					break;
				}
				case "up": {
					currentY = (currentY - 1 + N_ROWS) % N_ROWS;
					break;
				}

				case "left": {
					currentX = (currentX - 1 + N_COLUMNS) % N_COLUMNS;
					break;
				}

				case "right": {
					currentX = (currentX + 1 + N_COLUMNS) % N_COLUMNS;
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
		return {newMatrix, newState: null,};
	}
});

```

## Sample application with key presses - folding function 

This demonstrate is like the above one - but demonstrates the more functional 'folding' style of code: 


```javascript 
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

```