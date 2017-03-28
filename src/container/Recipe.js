import React, { Component, Children } from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		recipes: state.recipes
	};
};

class Recipe extends Component {
	onClickBack(){
		browserHistory.goBack();
	}

	onClickEdit = () => {
		var recipe = this.props.recipes.filter(recipe => recipe.id === parseInt(this.props.params.recipeId, 10))[0];
		var path = '/edit/'+recipe.id+'/'+recipe.name.replace(/\s/g, '-').toLowerCase();
		browserHistory.push(path);
	}

	render(){
		var recipe = this.props.recipes.filter(recipe => recipe.id === parseInt(this.props.params.recipeId, 10))[0];

		return (
			<div className="recipe">
				{Children.map(this.props.children, child => {
					return React.cloneElement(child, Object.assign({}, child.props, {
						title: recipe.name,
						onLeftIconButtonTouchTap: null,
						iconElementLeft: <IconButton onClick={this.onClickBack}><NavigationBack /></IconButton>,
						iconElementRight: <IconButton onClick={this.onClickEdit}><EditIcon /></IconButton>
					}));
				})}

				<Paper rounded={false} style={{maxWidth:600, margin:'0 auto'}}>
					<img src={recipe.image} className="heroImage" />
					<div className="text">
						<h3>Ingredients</h3>
						<ul>
						{recipe.ingredients.map(function(ingredient){
							if(ingredient.unit === 'n/a'){
								ingredient.unit = '';
							}
							return <li key={ingredient.text}>{ingredient.quantity}{ingredient.unit} {ingredient.text}</li>
						})}
						</ul>
					</div>
				</Paper>
			</div>
		);
	}

}

export default connect(mapStateToProps)(Recipe);
