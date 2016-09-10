import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, Link, browserHistory } from 'react-router';
import Home from './component/Home';
import AddRecipe from './component/AddRecipe';
import Recipe from './component/Recipe';

injectTapEventPlugin();

ReactDOM.render(
	<MuiThemeProvider>
		<Router history={browserHistory}>
			<Route path="/" activeClassName="active" component={Home} />
			<Route path="/create" activeClassName="active" component={AddRecipe} />
			<Route path="/recipe/:recipeId/:recipeName" activeClassName="active" component={Recipe} />
		</Router>
	</MuiThemeProvider>,
	document.getElementById('app')
);
