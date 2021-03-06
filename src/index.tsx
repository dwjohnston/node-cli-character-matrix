import React, { useEffect, useState } from 'react';
import { render, Text, Box } from 'ink';
import useInterval from "@use-it/interval";

//@ts-ignore
import keypress from "keypress";
import { captureRejections } from 'events';

export type Char = string | {
	char: string; 
	color?: string; 
	backgroundColor?: string; 
}

export type Matrix = Array<Array<Char>>;

export type TickFunction<T> = (
	matrix: Matrix,
	tickCount: number,
	exit: (message: string) => void,
	lastKeyPress: KeyPress | null,
	oldState: T,
) => {
	newMatrix: Matrix;
	newState: T;
}

export type KeyPress = {
	name: string;
	ctrl: boolean;
	meta: boolean;
	shift: boolean;
	sequence: string;
}

export type Options<T> = {
	nRows: number;
	nColumns: number;
	intervalTime: number;
	onTick: TickFunction<T>;
	initialState: T;
}


function validateChar (char: Char)  {


	let charString :string; 
	if (typeof char === 'string'){
		charString = char; 
	} else if (char.char) {
		charString = char.char; 
	}
	else {
		throw new Error("Char was of the wrong format! It must be a string, or a {char: string; color?: string; backgroundColor?: string} ")
	}

	if (charString.length > 1) {
		throw new Error ("Char must be one character!");
	}


}

function convertChar(char: Char) {

	if (typeof char === 'string'){
		return {
			char: char, 
			color: "white", 
			backgroundColor: "black"
		}
	}else {
		return {
			char: char.char, 
			color: char.color || "white", 
			backgroundColor: char.backgroundColor || "black"
		}
	}

}

const Cell = ({ char = ' ' }: { char: Char }) => {

	validateChar(char);
	const charToUse = convertChar(char);
	return <Box width={1} height={1}><Text color = {charToUse.color} backgroundColor={charToUse.backgroundColor}>{charToUse.char}</Text></Box>
}


const Main = ({
	matrix = [[]]
}: { matrix: Matrix }) => {

	const nRows = matrix.length;
	const nCols = matrix[0].length;

	return <Box width={nRows + 2} height={nCols + 2} margin={0} borderStyle={'single'} flexDirection="column">
		{matrix.map((row, rowNum) => {
			return <Box key={rowNum} width="100%">
				{row.map((cell, cellNum) => {
					return <Cell key={`${rowNum}-${cellNum}`} char={cell} />
				})}
			</Box>

		})}
	</Box>
};


export function createMatrix(nRows: number, nColumns: number): Matrix {
	return new Array(nRows).fill(new Array(nColumns).fill(' '));
}

export function clearMatrix(matrix: Matrix): Matrix {
	return createMatrix(matrix.length, matrix[0].length);
}

export function setCell(matrix: Matrix, rowNum: number, cellNum: number, char: Char) {
	validateChar(char);
	const newMatrix = JSON.parse(JSON.stringify(matrix));
	newMatrix[rowNum][cellNum] = char;

	return newMatrix;
}

const App = <T,>({ onTick, intervalTime, initialMatrix, initialState }: {
	onTick: TickFunction<T>;
	intervalTime: number;
	initialMatrix: Matrix;
	initialState: T;
}) => {

	const [matrix, setMatrix] = useState(initialMatrix);
	const [state, setState] = useState(initialState);
	const [tickCount, setTickCount] = useState(0);
	const [lastKeyPress, setLastKeyPress] = useState<null | KeyPress>(null);

	const exitRef = React.useRef((message: string = "") => {
		process.exit(0);
	});


	useEffect(() => {
		keypress(process.stdin);
		process.stdin.on('keypress', function (ch, key) {
			setLastKeyPress(key);
			if (key && key.ctrl && key.name == 'c') {
				process.stdin.pause();
				process.exit(0);
			}
		});

		process.stdin.setRawMode(true);
		process.stdin.resume();
	}, []);


	useInterval(() => {
		const { newMatrix, newState } = onTick(matrix, tickCount, exitRef.current, lastKeyPress, state);
		setLastKeyPress(null);
		setTickCount(tickCount + 1);
		setMatrix(newMatrix);
		setState(newState);
	}, intervalTime);

	return <Main matrix={matrix} />;
}

export function startMatrixApplication<T>(options: Options<T>) {


	const {
		nRows,
		nColumns,
		onTick,
		intervalTime,
		initialState,
	} = options;

	const matrix = createMatrix(nRows, nColumns);
	render(<App
		initialMatrix={matrix}
		onTick={onTick}
		intervalTime={intervalTime}
		initialState={initialState}
	/>);
}


