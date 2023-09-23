import { Fragment, useEffect, useState } from 'react';
import './EndTime.scss';

const EndTime = (props) => {
	const [timeLeft, setTimeLeft] = useState(0); // Zaczynamy od 0 sekund
	const [hasStarted, setHasStarted] = useState(false); // Czy odliczanie zostało uruchomione
	const [timeOver, setTimeOver] = useState(false);
	const [isWinner, setIsWinner] = useState(false);

	useEffect(() => {
		let interval;

		if (!hasStarted && !props.isCircle) {
			setHasStarted(true);
			setTimeLeft(120);
		}

		if (hasStarted && timeLeft > 0 && !isWinner) {
			interval = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
		} else if (hasStarted && timeLeft === 0) {
			clearInterval(interval);

			console.log('Czas się skończył');
			setTimeOver(true);
		}

		return () => clearInterval(interval);
	}, [props.isCircle, hasStarted, timeLeft, isWinner]);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	};

	const tryAgainHandler = () => {
		props.onClickHandler();
		setHasStarted(false);
		setTimeOver(false);
		setTimeLeft(120);
	};

	useEffect(() => {
		if (props.pickedWinner) {
			setTimeLeft(120);
			setIsWinner(true);
		} else {
			setIsWinner(false);
		}
	}, [props.pickedWinner]);

	return (
		<Fragment>
			<div className='end-time'>
				<p className='time-value'>{formatTime(timeLeft)}</p>
				<p className='inform-text'>Time left</p>
			</div>
			{timeOver && (
				<div className='shadow'>
					<p className='informations'>Czas się skończył</p>
					<button onClick={tryAgainHandler}>Spróbuj ponownie</button>
				</div>
			)}
		</Fragment>
	);
};

export default EndTime;
