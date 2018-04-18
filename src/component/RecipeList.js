import React, { Component } from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { browserHistory } from 'react-router';

class RecipeListItem extends Component {
	onClickRecipe = () => {
		let recipe = this.props.recipe;
		let path = '/recipe/'+recipe.name.replace(/\s/g, '-').toLowerCase()+'/'+recipe._id;
		browserHistory.push(path);
	}

	render(){
		let recipe = this.props.recipe,
			image = recipe.image ? <img src={recipe.image} /> : <span />;

		return (
			<li key={recipe._id} className="cardContainer">
				<Card containerStyle={{paddingBottom:0}} onClick={this.onClickRecipe}>
					<CardMedia>{image}</CardMedia>
					<CardTitle title={recipe.name} />
				</Card>
			</li>
		);
	}
}

var RecipeList = props => {
	let recipes = Array.isArray(props.recipes) ? props.recipes : [];

	return (
		<ul className="recipeList">
			{recipes.map(function(recipe){
				return <RecipeListItem key={recipe.id} recipe={recipe} />;
			})}
		</ul>
	);
}

export default RecipeList;
