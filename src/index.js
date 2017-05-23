import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { cookbookApp } from './model/reducers';
import { logger } from './model/middleware';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrangeA200, darkBlack } from 'material-ui/styles/colors';
import App from './App';

injectTapEventPlugin();

let store = createStore(cookbookApp, {recipes:[], app: {}}, applyMiddleware(logger));

const muiTheme = getMuiTheme({
	palette: {
		accent1Color: deepOrangeA200,
		textColor: darkBlack
	},
	fontFamily: 'Raleway, sans-serif'
});

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}>
			<App></App>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('app')
);
