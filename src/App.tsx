import React from 'react';
import './App.css';
import { GlobalStyle } from './global/global.styles';
import { DragAndDropProvider } from './components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { DragAndDropContainer } from './components/DragAndDrop/DragAndDropContainer/DragAndDropContainer';
import { DragAndDropItem } from './components/DragAndDrop/DragAndDropItem/DragAndDropItem';
import { Theme } from './theme/theme';
import { DraggableItem } from './components/molecules/DraggableItem/DraggableItem';

function App() {
	return (
		<>
			<GlobalStyle />
			<Theme>
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
							<DragAndDropContainer
								containerId={'1'}
								minHeight={50}
							>
								{(items) =>
									items.map((item) => (
										<DragAndDropItem
											key={item.id}
											id={item.id}
										>
											<DraggableItem
												id={item.id}
												title={'asddsadsa qwewqewqewq'}
												text={'cxzxcz'}
											/>
										</DragAndDropItem>
									))
								}
							</DragAndDropContainer>
							<DragAndDropContainer
								containerId={'2'}
								minHeight={50}
							>
								{(items) =>
									items.map((item) => (
										<DragAndDropItem
											key={item.id}
											id={item.id}
										>
											<DraggableItem
												id={item.id}
												title={'asddsadsa'}
												text={
													'cxzxcz dsasad asdsadas qwewq'
												}
											/>
										</DragAndDropItem>
									))
								}
							</DragAndDropContainer>
							<DragAndDropContainer
								containerId={'3'}
								minHeight={50}
							>
								{(items) =>
									items.map((item) => (
										<DragAndDropItem
											key={item.id}
											id={item.id}
										>
											<DraggableItem
												id={item.id}
												title={'asddsadsa'}
												text={'cxzxcz dsasad'}
											/>
										</DragAndDropItem>
									))
								}
							</DragAndDropContainer>
						</div>
					</DragAndDropProvider>
				</div>
			</Theme>
		</>
	);
}

export default App;
