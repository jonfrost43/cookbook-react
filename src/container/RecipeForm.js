import React, { Component, Children } from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import DoneIcon from 'material-ui/svg-icons/action/done';
import Ingredients from '../component/Ingredients';
import RecipeMethod from '../component/RecipeMethod';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { addRecipe, editRecipe } from '../model/actions';
import categories from '../data/categories'

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

		onAdd: recipe => {
			return fetch('/api/recipes', {
				headers: {'Content-Type': 'application/json'},
				method: 'POST',
				body: JSON.stringify(recipe),
				credentials: 'include'
			});
		},

		onEdit: recipe => {
			dispatch(editRecipe(recipe));

			return fetch('/api/recipes', {
				headers: {'Content-Type': 'application/json'},
				method: 'PUT',
				body: JSON.stringify(recipe),
				credentials: 'include'
			});
		}
	};
};

class RecipeForm extends Component {
	constructor(props){
		super()

		let isEditing = !!props.params.recipeId,
			recipe = props.recipes.filter(recipe => recipe.id === parseInt(props.params.recipeId, 10))[0];

		this.state = {
			isEditing,
			appBarTitle: isEditing ? 'Edit recipe' : 'Create recipe',
			recipe: Object.assign({
				name: '',
				category: null,
				ingredients: [],
				method: []
			}, recipe)
		}

		if(isEditing && !recipe){
			fetch('/api/recipes', {credentials: 'include'})
				.then(res => res.ok ? res.json() : null)
				.then(recipes => recipes.forEach(recipe => props.addRecipe(recipe)))
				.then(() => {
					this.props.recipes.forEach(recipe => {
						if(recipe.id === parseInt(props.params.recipeId, 10)){
							this.setState({
								recipe: Object.assign({
									name: '',
									category: null,
									ingredients: [],
									method: []
								}, recipe)
							})
						}
					})
				});
		}
	}

	onClickBack(){
		browserHistory.goBack();
	}

	handleChange = e => {
		var newState = {};
		newState[e.target.name] = e.target.value;
		this.setState({
			recipe: Object.assign(this.state.recipe, newState)
		});
	}

	onCategoryChange = (e, index, value) => {
		this.setState({
			recipe: Object.assign(this.state.recipe, {
				category: value
			})
		});
	}

	addIngredient = () => {
		this.setState({
			recipe: Object.assign({}, this.state.recipe, {
				ingredients: this.state.recipe.ingredients.concat({quantity: '', unit: '', text: ''})
			})
		});
	}

	addMethodStep = () => {
		this.setState({
			recipe: Object.assign({}, this.state.recipe, {
				method: this.state.recipe.method.concat({text: ''})
			})
		});
	}

	onIngredientChange = (ingredientIndex, changes) => {
		this.setState({
			recipe: Object.assign({}, this.state.recipe, {
				ingredients: this.state.recipe.ingredients.map((ingredient, index) => {
					if(index === ingredientIndex){
						return Object.assign(ingredient, changes)
					}
					return ingredient;
				})
			})
		});
	}

	onMethodStepChange = (stepIndex, changes) => {
		this.setState({
			recipe: Object.assign({}, this.state.recipe, {
				method: this.state.recipe.method.map((step, index) => {
					if(index === stepIndex){
						return Object.assign(step, changes)
					}
					return step;
				})
			})
		});
	}

	onSubmit = e => {
		e.preventDefault();

		if(this.state.recipe.name){
			let saveMethod = this.state.isEditing ? 'onEdit' : 'onAdd';

			this.props[saveMethod](this.state.recipe).then(function(){
				browserHistory.push('/');
			});

		}
	}

	render(){
		if(this.state.isEditing && !this.state.recipe.id){
			return null;
		}

		return (
			<div>
				{Children.map(this.props.children, child => {
					return React.cloneElement(child, Object.assign({}, child.props, {
						title: this.state.appBarTitle,
						onLeftIconButtonTouchTap: null,
						iconElementLeft: <IconButton onClick={this.onClickBack}><NavigationBack /></IconButton>,
						iconElementRight: <IconButton onClick={this.onSubmit}><DoneIcon /></IconButton>
					}));
				})}

				<Paper rounded={false} style={{maxWidth:600, margin:'0 auto'}}>
					<form name="createRecipe">
						<fieldset className="name description">
							<div>
								<TextField name="name" floatingLabelText="Recipe name" fullWidth={true} autoFocus style={{fontSize:'20px', height:'78px'}}
								 	onChange={this.handleChange} value={this.state.recipe.name}/>
							</div>
						</fieldset>
						<Ingredients
							ingredients={this.state.recipe.ingredients}
							add={this.addIngredient}
							onChange={this.onIngredientChange}
						/>
						<RecipeMethod
							method={this.state.recipe.method}
							add={this.addMethodStep}
							onChange={this.onMethodStepChange}
						/>
						<fieldset className="description">
			                <div>
								<SelectField name="category" value={this.state.recipe.category} onChange={this.onCategoryChange} floatingLabelText="Category">
									{categories.map(c => <MenuItem value={c.value} primaryText={c.label} />)}
								</SelectField>
			                </div>
			                <div>
								<TextField name="tags" floatingLabelText="Tags" hintText="Add tags..." />
			                </div>
			            </fieldset>
						<RaisedButton label="Done" secondary={true} onClick={this.onSubmit} />
					</form>
				</Paper>
			</div>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm);
