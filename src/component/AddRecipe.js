import React from 'react';
import Navigation from './Navigation';
import Ingredients from './Ingredients';
import RecipeMethod from './RecipeMethod';

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<Navigation />
				<h2>Create recipe</h2>
				<form onSubmit={this.handleSubmit}>
					<fieldset className="name description">
						<div>
							<label for="name" className="accessible">Recipe name</label>
							<input type="text" id="name" name="name" placeholder="Name your recipe" autocomplete="off" required />
						</div>
					</fieldset>
					<Ingredients />
					<RecipeMethod />
					<fieldset className="description">
		                <div>
		                    <label for="category" className="accessible">Category</label>
		                    <select id="category" name="category" required>
		                        <option value="">Select a category</option>
		                        <option>Canapes & cocktails</option>
		                        <option>Starters, soups & salads</option>
		                        <option>Sides & sauces</option>
		                        <option>Vegetarian</option>
		                        <option>Meat & game</option>
		                        <option>Fish & seafood</option>
		                        <option>Poultry</option>
		                        <option>Baking</option>
		                        <option>Desserts</option>
		                    </select>
		                </div>
		                <div>
		                    <input type="text" placeholder="Add tags..." />
		                </div>
		            </fieldset>
		            <input type="submit" />
				</form>
			</div>
		);
	},
	handleSubmit: function(e){
		e.preventDefault();

	    var elements = Array.prototype.slice.call(e.currentTarget.elements);

	    var formData = elements.reduce(function(prev, el){
	        if(el.name) {
	            prev[el.name] = el.value;
	        }

	        return prev;
	    }, {});

	    alert(JSON.stringify(formData));
	}
});
