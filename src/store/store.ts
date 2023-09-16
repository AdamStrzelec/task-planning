import { configureStore } from '@reduxjs/toolkit';
import { dragAndDropSliceReducer } from './DragAndDropStore/DragAndDropStore';

export default configureStore({
	reducer: {
		dragAndDrop: dragAndDropSliceReducer,
	},
});
