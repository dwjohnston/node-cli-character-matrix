const React = require('react');
const {render, Text, Box} = require('ink');
const useInterval = require("@use-it/interval").default;

console.log(useInterval);

const {useState, useEffect} = React; 

const Counter = () => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(previousCounter => previousCounter + 1);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return <Box width = {100} height = {50} borderStyle="single">
		<Text color="green">{counter} tests passed</Text>
	</Box>;
};

const Cell = ({char = ' '}) => {

	if (typeof char !== 'string') {
		throw new Error("Wrong character type! Character must be a string!")
	}

	if (char.length > 1) {
		throw new Error ("Character must be a single letter!")
	}

	return <Box width ={1} height= {1}><Text color ="red" backgroundColor ="white">{char}</Text></Box>
}


const Main = ({
	matrix = [[]]
}) => {

	const nRows = matrix.length; 
	const nCols = matrix[0].length; 

	return <Box width ={nRows + 2} height = {nCols +2 } margin ={0} borderStyle={'single'} flexDirection="column">
		{matrix.map((row,rowNum) => {
			return <Box key = {rowNum} width ="100%">
				{row.map((cell, cellNum) => {
					return <Cell key ={`${rowNum}-${cellNum}`} char = {cell}/>
				})}
			</Box>
		
		})}
	</Box>
};


function createMatrix(rows, columns) {
	return new Array(rows).fill(new Array(columns).fill(' '));
}

function clearMatrix(matrix) {
	return createMatrix(matrix.length, matrix[0].length);
}

function setCell(matrix, rowNum, cellNum, char) {
	if(typeof char !== 'string') {
		throw new Error("Char must be a string!"); 
	}

	if (char.length >1) {
		throw new Error("Char must be string of length 1!");
	}

	const newMatrix = JSON.parse(JSON.stringify(matrix));
	newMatrix[rowNum][cellNum] = char; 

	return newMatrix;
}


const N_ROWS = 10; 
const N_COLS = 10; 

const App = ({onTick, intervalTime, initialMatrix}) => {

	const [matrix, setMatrix] = useState(initialMatrix);

	const [tickCount, setTickCount] = useState(0);

	const exitRef = React.useRef((message) => {
		console.log(message || "");
		process.exit(0);
	}); 


	useInterval(() => {
		console.log(tickCount);
		const newMatrix = onTick(matrix, tickCount, exitRef.current); 
		setTickCount(tickCount +1);
		setMatrix(newMatrix);
	}, intervalTime);
	
	return <Main matrix = {matrix}/>;  
}

function startMatrixApplication(nRows, nColumns, intervalTime, onTick, onExit) {


	const matrix = createMatrix(nRows, nColumns); 
	render(<App initialMatrix = {matrix} onTick = {onTick} intervalTime = {intervalTime}/>); 

}


startMatrixApplication(5, 5, 100, (matrix, tickCount, exit) => {
	const clearedMatrix =  clearMatrix(matrix); 
	const setMatrix = setCell(clearedMatrix, tickCount % 5, tickCount % 5, 'X'); 

	if (tickCount > 20) {
		console.log(tickCount);
		exit("Thank you for playing!");
	}
	return setMatrix; 
}); 