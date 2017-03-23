import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import './ingredients.css';

var Ingredient = React.createClass({
	onQuantityChange: function(e, value){
		this.props.onChange(this.props.index, {quantity: value});
	},

	onUnitChange: function(e, index, value){
		this.props.onChange(this.props.index, {unit: value});
	},

	onTextChange: function(e, value){
		this.props.onChange(this.props.index, {text: value});
	},

	render: function(){
		var index = this.props.index;
		return (
			<li>
				<TextField type="number" name={'iQuantity'+index} value={this.props.quantity} onChange={this.onQuantityChange} style={{width:100}} hintText={100} />
				<SelectField name={'iUnit'+index} value={this.props.unit} onChange={this.onUnitChange} hintText={'unit'} floatingLabelFixed={false} style={{width:140}}>
					<MenuItem value={null} primaryText="" />
					<MenuItem value={'g'} primaryText="g" />
					<MenuItem value={'ml'} primaryText="kg" />
					<MenuItem value={'oz'} primaryText="oz" />
					<MenuItem value={'ml'} primaryText="ml" />
					<MenuItem value={'fl oz'} primaryText="fl oz" />
					<MenuItem value={'tbsp'} primaryText="tbsp" />
					<MenuItem value={'tsp'} primaryText="tsp" />
				</SelectField>
				<TextField name={'iText'+index} value={this.props.text} onChange={this.onTextChange} hintText={'flour'} style={{width:'100%'}} />
			</li>
		);
	}
});

var Ingredients = function(props){
	return (
		<fieldset className="ingredients">
			<legend>Ingredients</legend>
			<ol>
			{props.ingredients.map((ingredient, index) => {
				return <Ingredient key={index} index={index} quantity={ingredient.quantity} unit={ingredient.unit} text={ingredient.text} onChange={props.onChange}></Ingredient>
			})}
			</ol>
			<RaisedButton label="Add ingredient" primary={true} onClick={props.add} style={{float:'right'}} />
		</fieldset>
	);
};

export default Ingredients;
