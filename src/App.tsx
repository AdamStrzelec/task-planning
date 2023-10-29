import React from 'react';
import './App.css';
import { GlobalStyle } from './global/global.styles';
import { DragAndDropProvider } from './components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { DragAndDropContainer } from './components/DragAndDrop/DragAndDropContainer/DragAndDropContainer';
import { DragAndDropItem } from './components/DragAndDrop/DragAndDropItem/DragAndDropItem';

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
				<DragAndDropProvider>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							gap: '50px',
						}}
					>
						<DragAndDropContainer containerId={'1'}>
							{(items) =>
								items.map((item) => (
									<DragAndDropItem
										key={item.id}
										id={item.id}
										color={item.color}
									>
										<div>
											<p
												style={{
													margin: 0,
													width: 100,
													height: 100,
												}}
											>
												{item.color}
											</p>
										</div>
									</DragAndDropItem>
								))
							}
						</DragAndDropContainer>
						<DragAndDropContainer containerId={'2'}>
							{(items) =>
								items.map((item) => (
									<DragAndDropItem
										key={item.id}
										id={item.id}
										color={item.color}
									>
										<div>
											<p
												style={{
													margin: 0,
													width: 100,
													height: 100,
												}}
											>
												{item.color}
											</p>
										</div>
									</DragAndDropItem>
								))
							}
						</DragAndDropContainer>
						<DragAndDropContainer containerId={'3'}>
							{(items) =>
								items.map((item) => (
									<DragAndDropItem
										key={item.id}
										id={item.id}
										color={item.color}
									>
										<div>
											<p
												style={{
													margin: 0,
													width: 100,
													height: 100,
												}}
											>
												{item.color}
											</p>
										</div>
									</DragAndDropItem>
								))
							}
						</DragAndDropContainer>
					</div>
				</DragAndDropProvider>
			</div>
		</div>
	);
}

export default App;
