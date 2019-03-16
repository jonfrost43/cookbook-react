import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { cookbookApp } from './model/reducers';
import { logger } from './model/middleware';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import deepOrange from '@material-ui/core/colors/deepOrange';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

let store = createStore(cookbookApp, {recipes:[], app: {}}, applyMiddleware(logger));

const muiTheme = createMuiTheme({
	palette: {
		primary: cyan,
		secondary: deepOrange
	},
	typography: {
		fontFamily: 'Raleway, sans-serif',
		useNextVariants: true
	}
});

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={muiTheme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('app')
);
