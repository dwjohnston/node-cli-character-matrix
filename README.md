# node-cli-character-matrix
A simple cli tool for drawing matrix based games. 

Sample application: 

```
startMatrixApplication(5, 5, 100, (matrix, tickCount, exit) => {
	const clearedMatrix =  clearMatrix(matrix); 
	const setMatrix = setCell(clearedMatrix, tickCount % 5, tickCount % 5, 'X'); 

	if (tickCount > 20) {
		exit("Thank you for playing!");
	}
	return setMatrix; 
}); 
```
