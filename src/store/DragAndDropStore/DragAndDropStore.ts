import { createSlice } from '@reduxjs/toolkit';

export const dragAndDropSlice = createSlice({
	name: 'dragAndDrop',
	initialState: {
		value: 0,
	},
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	},
});

export const { increment, decrement, incrementByAmount } =
	dragAndDropSlice.actions;

export const dragAndDropSliceReducer = dragAndDropSlice.reducer;
