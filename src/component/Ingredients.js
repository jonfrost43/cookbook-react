import React from 'react';

var Ingredients = React.createClass({
	render: function(){
		return (
			<fieldset className="ingredients">
				<legend>Ingredients</legend>
				<div>
					<input type="number" name="iQuantity1" />
					<select name="iUnit1">
						<option></option>
						<option>g</option>
						<option>kg</option>
						<option>oz</option>
						<option>ml</option>
						<option>fl oz</option>
						<option>fl oz</option>
						<option>tbsp</option>
						<option>tsp</option>
					</select>
					<input type="text" name="iText1" />
				</div>
				<button type="button">Add ingredient</button>
			</fieldset>
		);
	}
});

export default Ingredients;
