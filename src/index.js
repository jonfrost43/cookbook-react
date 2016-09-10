import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {darkBlack} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import { Router, Route, Link, browserHistory } from 'react-router';
import Home from './component/Home';
import AddRecipe from './component/AddRecipe';
import Recipe from './component/Recipe';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
	palette: {
		textColor: darkBlack
	},
	fontFamily: 'Raleway, sans-serif'
});

ReactDOM.render(
	<MuiThemeProvider muiTheme={muiTheme}>
		<div>
			<AppBar title="Cookbook" />
			<Router history={browserHistory}>
				<Route path="/" activeClassName="active" component={Home} />
				<Route path="/create" activeClassName="active" component={AddRecipe} />
				<Route path="/recipe/:recipeId/:recipeName" activeClassName="active" component={Recipe} />
			</Router>
		</div>
	</MuiThemeProvider>,
	document.getElementById('app')
);
