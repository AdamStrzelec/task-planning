import React from 'react';
import './App.css';
import { GlobalStyle } from './global/global.styles';
import { DragAndDropContainer } from './components/DragAndDrop/DragAndDropContainer/DragAndDropContainer';

function App() {
	return (
		<div>
			<GlobalStyle />
			<div
				style={{
					position: 'relative',
					width: '100vw',
				}}
			/>
			<div
				style={{
					paddingLeft: 200,
					paddingTop: 100,
				}}
			>
				<DragAndDropContainer />
			</div>
		</div>
	);
}

export default App;
