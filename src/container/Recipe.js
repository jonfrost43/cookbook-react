import React, { Component, Children, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NavigationBack from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';

import { connect } from 'react-redux';
import { addRecipe, deleteRecipe } from '../model/actions';

import DocumentTitle from '../component/DocumentTitle'

const mapStateToProps = state => {
	return {
		recipes: state.recipes
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addRecipe: recipe => {
			dispatch(addRecipe(recipe));
		},
		onDelete: recipe => {
			dispatch(deleteRecipe(recipe.id));

			fetch('/api/recipes/'+recipe._id, {
				method: 'DELETE',
				credentials: 'include'
			});
		}
	};
};

const AppBarMenu = (props) => {
	const [menuState, setMenuState] = useState({anchorEl: null, open: false});

	return (
		<div>
			<IconButton color="inherit" onClick={(event) => setMenuState({anchorEl: event.currentTarget, open: true})}>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={menuState.anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={menuState.open}
				onClose={() => setMenuState({anchorEl: null, open: false})}
			>
				<MenuItem onClick={props.onClickEdit}>Edit</MenuItem>
				<MenuItem onClick={props.onClickDelete}>Delete</MenuItem>
			</Menu>
		</div>
	)
};

class Recipe extends Component {
	constructor(props){
		super();

		console.log(props);

		fetch('/api/recipes', {credentials: 'include'})
			.then(res => res.ok ? res.json() : null)
			.then(recipes => recipes.forEach(recipe => props.addRecipe(recipe)));
	}

	onClickBack(){
		history.back();
	}

	onClickEdit = () => {
		var recipe = this.props.recipes.filter(recipe => recipe._id === this.props.match.params.recipeId)[0];
		var path = '/recipe/'+recipe.name.replace(/\s/g, '-').toLowerCase()+'/'+recipe._id+'/edit';
		this.props.history.push(path);
	}

	onClickDelete = () => {
		var recipe = this.props.recipes.filter(recipe => recipe._id === this.props.match.params.recipeId)[0];
		this.props.onDelete(recipe);
		this.props.history.push('/');
	}

	render(){
		var recipe = this.props.recipes.filter(recipe => recipe._id === this.props.match.params.recipeId)[0];

		if(!recipe){
			return null;
		}

		let appBar = Children.only(this.props.children);

		return (
			<div className="recipe">
				<DocumentTitle title={recipe.name} />

				{React.cloneElement(appBar, appBar.props,
					<ToolBar>
						<IconButton color="inherit" aria-label="Menu" onClick={this.onClickBack}>
							<NavigationBack />
						</IconButton>
						<Typography component="h1" variant="h5">{recipe.name}</Typography>
						<AppBarMenu onClickEdit={this.onClickEdit} onClickDelete={this.onClickDelete} />
					</ToolBar>
				)}

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
					<div className="text">
						<h3>Method</h3>
						<ol>
							{recipe.method.map((step, index) => <li key={index}>{step.text}</li>)}
						</ol>
					</div>
				</Paper>
			</div>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
