import { DragElement } from 'src/components/DragElement/DragElement';
import React, { useEffect, useCallback, useRef, useState } from 'react';
import './App.css';
import { GlobalStyle } from './global/global.styles';
import { useSelector, useDispatch } from 'react-redux';
import {
	decrement,
	incrementByAmount,
} from './store/DragAndDropStore/DragAndDropStore';
import { DragAndDropContainer } from './components/DragAndDrop/DragAndDropContainer/DragAndDropContainer';
// import { DragContainer } from './components/DragContainer/DragContainer';

function App() {
	return (
		<div>
			<GlobalStyle />
			<div
				style={{
					position: 'relative',
					width: '100vw',
					height: 200,
					backgroundColor: 'pink',
					// zIndex: 1002,
				}}
			/>
			<div
				style={{
					paddingLeft: 250,
					// transform: 'translateY(-100px)',
					position: 'relative',
					// zIndex: 1001,
				}}
			>
				<DragAndDropContainer />
			</div>
		</div>
	);
}

export default App;
