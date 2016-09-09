import React from 'react';
import Navigation from './Navigation';
import recipes from '../data/recipes';

export default React.createClass({
	render: function(){
		var recipe = recipes.filter(function(recipe){
			return recipe.id = this.props.params.recipeId;
		}, this)[0];

		return (
			<div className="recipe">
				<Navigation />
				<h2>{recipe.name}</h2>
				<img src={recipe.image} />
				<h3>Ingredients</h3>
				<ul>
				{recipe.ingredients.map(function(ingredient){
					return <li key={ingredient.text}>{ingredient.quantity}{ingredient.unit} {ingredient.text}</li>
				})}
				</ul>
			</div>
		);
	}
});
