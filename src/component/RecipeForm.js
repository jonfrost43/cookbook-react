import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import DoneIcon from 'material-ui/svg-icons/action/done';
import Ingredients from './Ingredients';
import RecipeMethod from './RecipeMethod';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { addRecipe, editRecipe } from '../model/actions';

const mapStateToProps = state => {
	return {
		recipes: state.recipes
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAdd: recipe => {
			dispatch(addRecipe(recipe));
		},
		onEdit: recipe => {
			dispatch(editRecipe(recipe));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({
	getInitialState: function () {
		var recipe = this.props.recipes.filter(recipe => recipe.id === parseInt(this.props.params.recipeId, 10))[0];

		return {
			isEditing: !!recipe,
			appBarTitle: recipe ? 'Edit recipe' : 'Create recipe',
			recipe: Object.assign({
				name: '',
				category: null,
				ingredients: []
			}, recipe)
		}
	},

	onClickBack: function () {
		browserHistory.goBack();
	},

	handleChange: function(e){
		var newState = {};
		newState[e.target.name] = e.target.value;
		this.setState({
			recipe: Object.assign(this.state.recipe, newState)
		});
	},

	onCategoryChange: function(e, index, value){
		this.setState({
			recipe: Object.assign(this.state.recipe, {
				category: value
			})
		});
	},

	addIngredient: function(){
		this.setState({
			recipe: Object.assign({}, this.state.recipe, {
				ingredients: this.state.recipe.ingredients.concat({quantity: '', unit: '', text: ''})
			})
		});
	},

	onIngredientChange: function(ingredientIndex, changes){
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
	},

	onSubmit: function(e){
		e.preventDefault();

		if(this.state.recipe.name){
			if(this.state.isEditing){
				this.props.onEdit(this.state.recipe)
			}
			else {
				this.props.onAdd(this.state.recipe);
			}

			browserHistory.push('/');
		}
	},

	render: function(){
		return (
			<div>
				<AppBar
					title={this.state.appBarTitle}
					iconElementLeft={<IconButton onClick={this.onClickBack}><NavigationBack /></IconButton>}
					iconElementRight={<IconButton onClick={this.onSubmit}><DoneIcon /></IconButton>}
				/>
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
						<RecipeMethod />
						<fieldset className="description">
			                <div>
								<SelectField name="category" value={this.state.recipe.category} onChange={this.onCategoryChange} floatingLabelText="Category">
									<MenuItem value={0} primaryText="Canapes & cocktails" />
									<MenuItem value={1} primaryText="Starters, soups & salads" />
									<MenuItem value={2} primaryText="Sides & sauces" />
									<MenuItem value={3} primaryText="Vegetarian" />
									<MenuItem value={4} primaryText="Meat & game" />
									<MenuItem value={5} primaryText="Fish & seafood" />
									<MenuItem value={6} primaryText="Poultry" />
									<MenuItem value={7} primaryText="Baking" />
									<MenuItem value={8} primaryText="Desserts" />
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
}));
