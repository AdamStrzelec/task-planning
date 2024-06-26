import React from 'react';
import './App.css';
import { GlobalStyle } from './global/global.styles';
import { DragAndDropProvider } from './components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { DragAndDropContainer } from './components/DragAndDrop/DragAndDropContainer/DragAndDropContainer';
import { DragAndDropItem } from './components/DragAndDrop/DragAndDropItem/DragAndDropItem';
import { Theme } from './theme/theme';
import { DraggableItem } from './components/molecules/DraggableItem/DraggableItem';
import { mockedItems } from './components/DragAndDrop/mocks/mockedItems';

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
						backgroundColor: 'orange',
					}}
				>
					<DragAndDropProvider dragAndDropItems={mockedItems}>
						<DragAndDropContainer
							containerId="4"
							namespace="row"
							direction={'row'}
							options={{
								slotsPositionYWithOffset: false,
								slotsPositionXWithOffset: true,
							}}
						>
							{(rowItems) =>
								rowItems.map((item) => (
									<DragAndDropItem key={item.id} id={item.id}>
										<div
											style={{
												// width: 200,
												// height: 200,
												backgroundColor: 'green',
												paddingTop: 100,
											}}
										>
											<DragAndDropContainer
												containerId={
													item.childrenContainerId
												}
												namespace={'column'}
											>
												{(items) =>
													items.map((item) => (
														<DragAndDropItem
															key={item.id}
															id={item.id}
														>
															<DraggableItem
																id={item.id}
																title={
																	'asddsadsa qwewqewqewq'
																}
																text={'cxzxcz'}
															/>
														</DragAndDropItem>
													))
												}
											</DragAndDropContainer>
										</div>
									</DragAndDropItem>
								))
							}
						</DragAndDropContainer>
					</DragAndDropProvider>
				</div>
			</Theme>
		</>
	);
}

export default App;
