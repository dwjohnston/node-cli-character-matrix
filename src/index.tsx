import React, {useState} from 'react';
import {render, Text, Box} from  'ink';
import useInterval from "@use-it/interval";

type Char = string; 
type Matrix = Array<Array<Char>>;

type TickFunction = (matrix: Matrix, tickCount: number, exit: (message: string) => void) => Matrix;


const Cell = ({char = ' '} : {char : Char}) => {

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
} : {matrix: Matrix}) => {

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


export function createMatrix(rows : number, columns : number) : Matrix {
	return new Array(rows).fill(new Array(columns).fill(' '));
}

export function clearMatrix(matrix : Matrix) : Matrix {
	return createMatrix(matrix.length, matrix[0].length);
}

export function setCell(matrix : Matrix, rowNum : number, cellNum : number, char : Char) {
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

const App = ({onTick, intervalTime, initialMatrix} : {
	onTick: TickFunction; 
	intervalTime: number; 
	initialMatrix: Matrix; 
}) => {

	const [matrix, setMatrix] = useState(initialMatrix);
	const [tickCount, setTickCount] = useState(0);

	const exitRef = React.useRef((message: string = "") => {
		process.exit(0);
	}); 


	useInterval(() => {
		const newMatrix = onTick(matrix, tickCount, exitRef.current); 
		setTickCount(tickCount +1);
		setMatrix(newMatrix);
	}, intervalTime);
	
	return <Main matrix = {matrix}/>;  
}

export function startMatrixApplication(nRows : number, nColumns: number, intervalTime: number, onTick: TickFunction) {
	const matrix = createMatrix(nRows, nColumns); 
	render(<App initialMatrix = {matrix} onTick = {onTick} intervalTime = {intervalTime}/>); 
}


