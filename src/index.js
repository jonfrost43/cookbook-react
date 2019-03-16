import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { cookbookApp } from './model/reducers';
import { logger } from './model/middleware';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

let store = createStore(cookbookApp, {recipes:[], app: {}}, applyMiddleware(logger));

const muiTheme = createMuiTheme({
	palette: {
		accent1Color: deepOrange['A200'],
		textColor: grey['900']
	},
	fontFamily: 'Raleway, sans-serif'
});

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('app')
);
