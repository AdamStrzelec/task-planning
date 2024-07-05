import React from 'react';
import './App.css';
import { GlobalStyle } from './global/global.styles';
import { Theme } from './theme/theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomeView, ProjectView, AboutView } from 'src/views/index';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <HomeView />,
		},
		{
			path: '/project/:id',
			element: <ProjectView />,
		},
		{
			path: '/about',
			element: <AboutView />,
		},
	]);

	return (
		<>
			<GlobalStyle />
			<Theme>
				<div>
					<a href="/">Home</a>
					<a href="/project/123">Project</a>
					<a href="/about">About</a>
				</div>
				<RouterProvider router={router} />
			</Theme>
		</>
	);
}

export default App;
