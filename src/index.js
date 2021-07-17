"use strict";
exports.__esModule = true;
exports.startMatrixApplication = exports.setCell = exports.clearMatrix = exports.createMatrix = void 0;
var react_1 = require("react");
var ink_1 = require("ink");
var interval_1 = require("@use-it/interval");
var Cell = function (_a) {
    var _b = _a.char, char = _b === void 0 ? ' ' : _b;
    if (typeof char !== 'string') {
        throw new Error("Wrong character type! Character must be a string!");
    }
    if (char.length > 1) {
        throw new Error("Character must be a single letter!");
    }
    return <ink_1.Box width={1} height={1}><ink_1.Text color="red" backgroundColor="white">{char}</ink_1.Text></ink_1.Box>;
};
var Main = function (_a) {
    var _b = _a.matrix, matrix = _b === void 0 ? [[]] : _b;
    var nRows = matrix.length;
    var nCols = matrix[0].length;
    return <ink_1.Box width={nRows + 2} height={nCols + 2} margin={0} borderStyle={'single'} flexDirection="column">
		{matrix.map(function (row, rowNum) {
            return <ink_1.Box key={rowNum} width="100%">
				{row.map(function (cell, cellNum) {
                    return <Cell key={rowNum + "-" + cellNum} char={cell}/>;
                })}
			</ink_1.Box>;
        })}
	</ink_1.Box>;
};
function createMatrix(rows, columns) {
    return new Array(rows).fill(new Array(columns).fill(' '));
}
exports.createMatrix = createMatrix;
function clearMatrix(matrix) {
    return createMatrix(matrix.length, matrix[0].length);
}
exports.clearMatrix = clearMatrix;
function setCell(matrix, rowNum, cellNum, char) {
    if (typeof char !== 'string') {
        throw new Error("Char must be a string!");
    }
    if (char.length > 1) {
        throw new Error("Char must be string of length 1!");
    }
    var newMatrix = JSON.parse(JSON.stringify(matrix));
    newMatrix[rowNum][cellNum] = char;
    return newMatrix;
}
exports.setCell = setCell;
var App = function (_a) {
    var onTick = _a.onTick, intervalTime = _a.intervalTime, initialMatrix = _a.initialMatrix;
    var _b = react_1.useState(initialMatrix), matrix = _b[0], setMatrix = _b[1];
    var _c = react_1.useState(0), tickCount = _c[0], setTickCount = _c[1];
    var exitRef = react_1["default"].useRef(function (message) {
        if (message === void 0) { message = ""; }
        process.exit(0);
    });
    interval_1["default"](function () {
        var newMatrix = onTick(matrix, tickCount, exitRef.current);
        setTickCount(tickCount + 1);
        setMatrix(newMatrix);
    }, intervalTime);
    return <Main matrix={matrix}/>;
};
function startMatrixApplication(nRows, nColumns, intervalTime, onTick) {
    var matrix = createMatrix(nRows, nColumns);
    ink_1.render(<App initialMatrix={matrix} onTick={onTick} intervalTime={intervalTime}/>);
}
exports.startMatrixApplication = startMatrixApplication;
