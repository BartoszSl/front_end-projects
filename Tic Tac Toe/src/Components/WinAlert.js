import { useEffect, useReducer } from 'react';
import './WinAlert.scss';

const winnerReducer = (state, action) => {
	if ('SET_WINNER') {
		return { value: action.value, class: action.className };
	}
	return { value: '', class: '' };
};

const WinAlert = (props) => {
	const [winnerState, dispatchWinner] = useReducer(winnerReducer, {
		value: '',
		class: '',
	});

	useEffect(() => {
		if (props.winner === 'circle') {
			dispatchWinner({
				type: 'SET_WINNER',
				value: 'Kółkiem',
				className: 'green',
			});
		} else {
			dispatchWinner({
				type: 'SET_WINNER',
				value: 'Krzyżykiem',
				className: 'red',
			});
		}
	}, [props.winner]);

	return (
		<div className='shadow'>
			<p className='informations'>
				Zwycięscą jest Zawodnik z{' '}
				<span className={`winner ${winnerState.class}`}>
					{winnerState.value}
				</span>
			</p>
			<button onClick={props.onClickHandler}>Spróbuj ponownie</button>
		</div>
	);
};

export default WinAlert;
