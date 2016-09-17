import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import recipes from '../data/recipes';
import { browserHistory } from 'react-router';

export default React.createClass({
	onClickBack: function () {
		browserHistory.goBack();
	},

	render: function(){
		var recipe = recipes.filter(function(recipe){
			return recipe.id === parseInt(this.props.params.recipeId, 10);
		}, this)[0];

		return (
			<div className="recipe">
				<AppBar title={recipe.name} iconElementLeft={<IconButton onClick={this.onClickBack}><NavigationBack /></IconButton>} />
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
