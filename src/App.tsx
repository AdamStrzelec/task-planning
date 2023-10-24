import React from 'react';
import './App.css';
import { GlobalStyle } from './global/global.styles';
import { DragAndDropProvider } from './components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';

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
				<DragAndDropProvider />
			</div>
		</div>
	);
}

export default App;
