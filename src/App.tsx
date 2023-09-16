import { DragElement } from 'src/components/DragElement/DragElement';
import React, { useEffect, useCallback, useRef, useState } from 'react';
import './App.css';
import { GlobalStyle } from './global/global.styles';
import { useSelector, useDispatch } from 'react-redux';
import {
	decrement,
	incrementByAmount,
} from './store/DragAndDropStore/DragAndDropStore';
import { DragContainer } from './components/DragContainer/DragContainer';

function App() {
	return (
		<div>
			<GlobalStyle />
			<DragContainer />
		</div>
	);
}

export default App;
