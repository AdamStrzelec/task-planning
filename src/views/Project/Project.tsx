import React from 'react';
import { DragAndDropContainer } from 'src/components/DragAndDrop/DragAndDropContainer/DragAndDropContainer';
import { DragAndDropItem } from 'src/components/DragAndDrop/DragAndDropItem/DragAndDropItem';
import { DragAndDropProvider } from 'src/components/DragAndDrop/DragAndDropProvider/DragAndDropProvider';
import { mockedItems } from 'src/components/DragAndDrop/mocks/mockedItems';
import { DraggableColumn } from 'src/components/molecules/DraggableColumn/DraggableColumn';
import { DraggableItem } from 'src/components/molecules/DraggableItem/DraggableItem';
import RoadImage from 'src/assets/images/road-2.jpg';

export const Project = () => {
	return (
		<div
			style={{
				backgroundImage: `url(${RoadImage})`,
				width: '100vw',
				height: '100vh',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
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
						rowItems.map((item) => {
							const childrenContainerId =
								item.childrenContainerId;

							return (
								<DragAndDropItem key={item.id} id={item.id}>
									{({
										focusedContainerId,
										draggedItemHeight,
										draggedItemContainerId,
									}) => (
										<DraggableColumn
											title={'In progress'}
											id={childrenContainerId}
											draggedItemContainerId={
												draggedItemContainerId
											}
											draggedItemHeight={
												draggedItemHeight
											}
											focusedContainerId={
												focusedContainerId
											}
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
															{() => (
																<DraggableItem
																	id={item.id}
																	title={
																		'asddsadsa qwewqewqewq'
																	}
																	text={
																		'cxzxcz asdsasadsa qwewqeqwewq asdssad xzcxzcxxcz assasad qwewqeqwew asasddsa xzcxzcxz sadsaasd'
																	}
																	onDeleteItem={(
																		id,
																	) =>
																		console.log(
																			'delete ID: ',
																			id,
																		)
																	}
																	onEdit={(
																		id,
																	) =>
																		console.log(
																			'edit ID: ',
																			id,
																		)
																	}
																	titleColor={
																		'blue'
																	}
																/>
															)}
														</DragAndDropItem>
													))
												}
											</DragAndDropContainer>
										</DraggableColumn>
									)}
								</DragAndDropItem>
							);
						})
					}
				</DragAndDropContainer>
			</DragAndDropProvider>
		</div>
	);
};
