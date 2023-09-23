import { Fragment, useState } from 'react';
import './App.scss';
import TicTacToe from './Components/TicTacToe';
import InformationText from './Components/InformationText';

function App() {
	const [isCircle, setisCircle] = useState(true);

	const changeTypeHandler = (value) => {
		setisCircle(value);
	};

	return (
		<Fragment>
			<InformationText isCircle={isCircle} />
			<TicTacToe onChangeType={changeTypeHandler} />;
		</Fragment>
	);
}

export default App;
