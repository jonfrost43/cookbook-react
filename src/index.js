import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import AddRecipe from '../src/component/AddRecipe';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={AddRecipe} />
	</Router>,
	document.getElementById('app')
);
