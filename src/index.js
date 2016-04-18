import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import Home from './component/Home';
import AddRecipe from './component/AddRecipe';
import Recipe from './component/Recipe';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" activeClassName="active" component={Home} />
		<Route path="/create" activeClassName="active" component={AddRecipe} />
		<Route path="/recipe/:recipeId/:recipeName" activeClassName="active" component={Recipe} />
	</Router>,
	document.getElementById('app')
);
