import React, { Component, Children } from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { deleteRecipe } from '../model/actions';

const mapStateToProps = state => {
	return {
		recipes: state.recipes
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onDelete: recipeId => {
			dispatch(deleteRecipe(recipeId));
		}
	};
};

const AppBarMenu = (props) => (
	<IconMenu
		iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
		targetOrigin={{horizontal: 'right', vertical: 'top'}}
		anchorOrigin={{horizontal: 'right', vertical: 'top'}}
	>
		<MenuItem primaryText="Edit" onClick={props.onClickEdit} />
		<MenuItem primaryText="Delete" onClick={props.onClickDelete} />
	</IconMenu>
);

class Recipe extends Component {
	onClickBack(){
		browserHistory.goBack();
	}

	onClickEdit = () => {
		var recipe = this.props.recipes.filter(recipe => recipe.id === parseInt(this.props.params.recipeId, 10))[0];
		var path = '/edit/'+recipe.id+'/'+recipe.name.replace(/\s/g, '-').toLowerCase();
		browserHistory.push(path);
	}

	onClickDelete = () => {
		var recipe = this.props.recipes.filter(recipe => recipe.id === parseInt(this.props.params.recipeId, 10))[0];
		this.props.onDelete(recipe.id);
		browserHistory.push('/');
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
						iconElementRight: <AppBarMenu onClickEdit={this.onClickEdit} onClickDelete={this.onClickDelete} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
