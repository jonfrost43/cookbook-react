import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

var Ingredient = React.createClass({
	getInitialState: function(){
		return {
			unit: null
		};
	},

	onUnitChange: function(evt, index, value){
		this.setState({
			unit: value
		});
	},

	render: function(){
		var index = this.props.index;
		return (
			<li>
				<TextField type="number" name={'iQuantity'+index} style={{width:60}} hintText={100} />
				<SelectField name={'iUnit'+index} value={this.state.unit} onChange={this.onUnitChange} hintText={'unit'} style={{width:80}}>
					<MenuItem value={0} primaryText="g" />
					<MenuItem value={1} primaryText="kg" />
					<MenuItem value={2} primaryText="oz" />
					<MenuItem value={3} primaryText="ml" />
					<MenuItem value={4} primaryText="fl oz" />
					<MenuItem value={5} primaryText="tbsp" />
					<MenuItem value={6} primaryText="tsp" />
					<MenuItem value={7} primaryText="n/a" />
				</SelectField>
				<TextField name={'iText'+index} hintText={'flour'} />
			</li>
		);
	}
});

var Ingredients = React.createClass({
	getInitialState: function(){
		return {
			ingredients: [{quantity: '', unit: 0, text: ''}]
		};
	},

	add: function(){
		this.setState({
			ingredients: this.state.ingredients.concat({quantity: '', unit: 0, text: ''})
		});
	},

	render: function(){
		return (
			<fieldset className="ingredients">
				<legend>Ingredients</legend>
				<ol>
				{this.state.ingredients.map(function(ingredient, index){
					return <Ingredient key={index} index={index}></Ingredient>;
				})}
				</ol>
				<FlatButton label="Add ingredient" primary={true} onClick={this.add} />
			</fieldset>
		);
	}
});

export default Ingredients;
