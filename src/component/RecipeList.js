import React from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { browserHistory } from 'react-router';

var RecipeListItem = React.createClass({
	onClickRecipe: function () {
		var recipe = this.props.recipe;
		var path = '/recipe/'+recipe.id+'/'+recipe.name.replace(/\s/g, '-').toLowerCase();
		browserHistory.push(path);
	},
	render: function () {
		let recipe = this.props.recipe,
			image = recipe.image ? <img src={recipe.image} /> : <span />;
		return (
			<li key={recipe.id} className="cardContainer">
				<Card containerStyle={{paddingBottom:0}} onClick={this.onClickRecipe}>
					<CardMedia>{image}</CardMedia>
					<CardTitle title={recipe.name} />
				</Card>
			</li>
		);
	}
});

var RecipeList = React.createClass({
	render: function(){
		let recipes = Array.isArray(this.props.recipes) ? this.props.recipes : [];
		return (
			<ul className="recipeList">
				{recipes.map(function(recipe){
					return <RecipeListItem key={recipe.id} recipe={recipe} />;
				})}
			</ul>
		);
	}
});

export default RecipeList;
