const React = require('react');
const {render, Text, Box} = require('ink');

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

const App = () => {


	const [y, setY] = useState(0);
	const [x, setX] = useState(0); 
	const [matrix, setMatrix ] = useState(createMatrix(N_ROWS, N_COLS)); 

	useEffect(() => {
		const timer = setInterval(() => {
			setX((x +1) % N_COLS); 
			if (x ===0 ) {
				setY(y + 1); 
			}
			const newMatrix = setCell(matrix, y, x, 'A'); 
			setMatrix(newMatrix);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}); 

	return <Main matrix = {matrix}/>;  
}


render(<App/>)
