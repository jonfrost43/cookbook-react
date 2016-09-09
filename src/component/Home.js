import React from 'react';
import Navigation from './Navigation';
import RecipeList from './RecipeList';
import recipes from '../data/recipes';

export default React.createClass({
	render: function(){
		return (
			<div>
				<Navigation />
				<h2>Recipes</h2>
				<RecipeList data={recipes} />
			</div>
		);
	}
});
