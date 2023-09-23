import { Fragment, useReducer, useState } from 'react';
import './TicTacToe.scss';
import WinAlert from './WinAlert';
import EndTime from './EndTime';

const initialCells = [
	{ id: 'cell1', class: '', picked: false },
	{ id: 'cell2', class: '', picked: false },
	{ id: 'cell3', class: '', picked: false },
	{ id: 'cell4', class: '', picked: false },
	{ id: 'cell5', class: '', picked: false },
	{ id: 'cell6', class: '', picked: false },
	{ id: 'cell7', class: '', picked: false },
	{ id: 'cell8', class: '', picked: false },
	{ id: 'cell9', class: '', picked: false },
];

const winReducer = (state, action) => {
	if (action.type === 'SET_WINNER') {
		return { value: action.value, isValid: action.isValid };
	}
	if (action.type === 'TRY_AGAIN') {
		return { value: '', isValid: false };
	}
	return { value: '', isValid: false };
};

const TicTacToe = (props) => {
	const [isCircle, setisCircle] = useState(true);
	const [cells, setCells] = useState(initialCells);
	// const [isWin, setIsWin] = useState(false);
	const [winState, dispatchWin] = useReducer(winReducer, {
		value: '',
		isValid: null,
	});

	const pickCellHandler = (e) => {
		const id = e.target.id;
		const updatedCells = [...cells];
		const index = updatedCells.findIndex((cell) => cell.id === id);

		if (cells[index].class.length > 0) {
			return console.log('Błąd');
		} else {
			setisCircle(!isCircle);
			props.onChangeType(!isCircle);
		}

		if (isCircle) {
			console.log('Kółko');
			if (index !== -1) {
				updatedCells[index].class = 'circle';
				updatedCells[index].picked = true;
				setCells(updatedCells);
			}
		} else if (!isCircle) {
			console.log('Krzyżyk');
			if (index !== -1) {
				updatedCells[index].class = 'cross';
				updatedCells[index].picked = true;
				setCells(updatedCells);
			}
		}
		winSystem();
	};

	const winSystem = () => {
		const top = [cells[0], cells[1], cells[2]];
		const left = [cells[0], cells[3], cells[6]];
		const right = [cells[2], cells[5], cells[8]];
		const bottom = [cells[6], cells[7], cells[8]];
		const rowCenter = [cells[3], cells[4], cells[5]];

		const columnCenter = [cells[1], cells[4], cells[7]];
		const crossLeft = [cells[0], cells[4], cells[8]];
		const crossRight = [cells[2], cells[4], cells[6]];

		const checkWinningClass = (cellsArray) => {
			const firstClass = cellsArray[0].class;

			const allSameClass = cellsArray.every(
				(cell) => cell.class === firstClass
			);

			return allSameClass ? firstClass : null;
		};

		const winningClass =
			checkWinningClass(top) ||
			checkWinningClass(left) ||
			checkWinningClass(right) ||
			checkWinningClass(bottom) ||
			checkWinningClass(rowCenter) ||
			checkWinningClass(columnCenter) ||
			checkWinningClass(crossLeft) ||
			checkWinningClass(crossRight);

		if (winningClass) {
			dispatchWin({ type: 'SET_WINNER', value: winningClass, isValid: true });
		}
	};

	const tryAgainHandler = () => {
		dispatchWin({ type: 'TRY_AGAIN', isValid: false });
		setCells([
			{ id: 'cell1', class: '', picked: false },
			{ id: 'cell2', class: '', picked: false },
			{ id: 'cell3', class: '', picked: false },
			{ id: 'cell4', class: '', picked: false },
			{ id: 'cell5', class: '', picked: false },
			{ id: 'cell6', class: '', picked: false },
			{ id: 'cell7', class: '', picked: false },
			{ id: 'cell8', class: '', picked: false },
			{ id: 'cell9', class: '', picked: false },
		]);
	};

	return (
		<Fragment>
			<div className='container'>
				{cells.map((cell) => (
					<div
						key={cell.id}
						id={cell.id}
						className={`cell ${cell.class}`}
						onClick={pickCellHandler}
					/>
				))}
				{winState.isValid && (
					<WinAlert winner={winState.value} onClickHandler={tryAgainHandler} />
				)}
			</div>
			<EndTime isCircle={isCircle} onClickHandler={tryAgainHandler} pickedWinner={winState.isValid}  />
		</Fragment>
	);
};

export default TicTacToe;
