import { useEffect, useReducer } from 'react';

import './InformationText.scss';

const typeReducer = (state, action) => {
	if (action.type === 'SET_TYPE') {
		return { bgcColor: action.bgc, textColor: action.text };
	}
	return { bgcColor: '', textColor: '' };
};

const InformationText = (props) => {
	const [typeState, dispatchType] = useReducer(typeReducer, {
		bgcColor: '',
		textColor: '',
	});

	useEffect(() => {
		if (props.isCircle) {
			dispatchType({ type: 'SET_TYPE', bgc: 'green-bgc', text: 'green-text' });
		} else {
			dispatchType({ type: 'SET_TYPE', bgc: 'red-bgc', text: 'red-text' });
		}
	}, [props.isCircle]);

	return (
		<div className='top'>
			<h2>Tic Tac Toe</h2>
			<div className='move'>
				<div className={`square ${typeState.bgcColor}`}></div>
				<p className={`${typeState.textColor}`}>MOVE</p>
			</div>
		</div>
	);
};

export default InformationText;
