# node-cli-character-matrix
A simple cli tool for drawing matrix based games. 

## Functions 

### startMatrixApplication(nRows, nColumns, interval, onTick)

- **nRows** - Number of rows the matrix is to have
- **nColumns** - Number of columns the matrix is to have. 
- **interval** - Time in ms between ticks 
- **onTick** a function of the signature: `(matrix: Matrix, tickCount: number, exit: (message:string) => void) => Matrix`

That is: 

Each tick the onTick function will be called with matrix as it currently is, the tick count number, and a function to be called to stop the application running. That function can take an exit message. 

The value returned from this onTick function is what will be displayed on the matrix next. 

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

The following application will draw and X starting at the top left corner, moving to the bottom right corner. 

It stops after 20 ticks. 

```javascript
import {startMatrixApplication, clearMatrix, setCell} from "node-cli-character-matrix";

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
```
