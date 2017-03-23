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

import { setDrawer, addRecipe } from './model/actions';
import recipes from './data/recipes';

import debounce from 'lodash-es/debounce'

injectTapEventPlugin();

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {recipes:[]};

let store = createStore(cookbookApp, persistedState, applyMiddleware(logger));

store.subscribe(debounce(() => {
	localStorage.setItem('reduxState', JSON.stringify(store.getState()));
}), 500);

store.dispatch(setDrawer(false));

// recipes.forEach(recipe => {
// 	store.dispatch(addRecipe(recipe));
// });

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
