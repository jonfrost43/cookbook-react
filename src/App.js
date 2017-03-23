import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Home from './container/Home';
import RecipeForm from './container/RecipeForm';
import Recipe from './container/Recipe';

var App = () => {
	return (
		<div>
			<Router history={browserHistory}>
				<Route path="/" activeClassName="active" component={Home} />
				<Route path="/create" activeClassName="active" component={RecipeForm} appBarTitle={'Create recipe'} />
				<Route path="/edit/:recipeId/:recipeName" activeClassName="active" component={RecipeForm} />
				<Route path="/recipe/:recipeId/:recipeName" activeClassName="active" component={Recipe} />
			</Router>
		</div>
	);
};

export default App;
