import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import Ingredients from './Ingredients';
import RecipeMethod from './RecipeMethod';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { addRecipe } from '../model/actions';

const mapDispatchToProps = dispatch => {
	return {
		onAdd: recipe => {
			dispatch(addRecipe(recipe));
		}
	};
};

export default connect(null, mapDispatchToProps)(React.createClass({
	getInitialState: function () {
		return {
			recipeName: '',
			category: null
		}
	},

	onClickBack: function () {
		browserHistory.goBack();
	},

	handleChange: function(e){
		var newState = {};
		newState[e.target.name] = e.target.value;
		this.setState(newState);
	},

	onCategoryChange: function(e, index, value){
		this.setState({
			category: value
		});
	},

	onSubmit: function(e){
		e.preventDefault();

	    var elements = Array.prototype.slice.call(document.forms.createRecipe);

	    var formData = elements.reduce(function(prev, el){
	        if(el.name) {
	            prev[el.name] = el.value;
	        }

	        return prev;
	    }, {});

		this.props.onAdd(this.state);

		browserHistory.push('/');
	},

	render: function(){
		return (
			<div>
				<AppBar title={'Create recipe'} iconElementLeft={<IconButton onClick={this.onClickBack}><NavigationBack /></IconButton>} />
				<Paper rounded={false} style={{maxWidth:600, margin:'0 auto'}}>
					<form name="createRecipe">
						<fieldset className="name description">
							<div>
								<TextField name="name" floatingLabelText="Recipe name" fullWidth={true} autoFocus style={{fontSize:'20px', height:'78px'}}
								 	onChange={this.handleChange}/>
							</div>
						</fieldset>
						<Ingredients />
						<RecipeMethod />
						<fieldset className="description">
			                <div>
								<SelectField name="category" value={this.state.category} onChange={this.onCategoryChange} floatingLabelText="Category">
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
						<RaisedButton label="Create recipe" secondary={true} onClick={this.onSubmit} />
					</form>
				</Paper>
			</div>
		);
	}
}));
