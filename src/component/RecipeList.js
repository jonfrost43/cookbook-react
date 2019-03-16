import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';

class _RecipeListItem extends Component {
	onClickRecipe = () => {
		let recipe = this.props.recipe;
		let path = '/recipe/'+recipe.name.replace(/\s/g, '-').toLowerCase()+'/'+recipe._id;
		this.props.history.push(path);
	}

	render(){
		let recipe = this.props.recipe,
			image = recipe.image ? <img src={recipe.image} /> : <span />;

		return (
			<li key={recipe._id} className="cardContainer">
				<Card containerStyle={{paddingBottom:0}} onClick={this.onClickRecipe}>
					<CardMedia style={{
						display: 'flex',
						alignItems: 'center',
						maxHeight: '120px',
						overflow: 'hidden'
					}}>{image}</CardMedia>
				<CardHeader title={recipe.name} />
				</Card>
			</li>
		);
	}
}

var RecipeListItem = withRouter(_RecipeListItem)

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
