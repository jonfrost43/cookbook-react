import React from 'react';
import { Link } from 'react-router';

module.exports = React.createClass({
	render: function(){
		return (
			<ul className="recipeList">
				{this.props.data.map(function(recipe){
					var path = '/recipe/'+recipe.id+'/'+recipe.name.replace(' ', '-').toLowerCase();
					return <li key={recipe.id}><Link to={path}>{recipe.name}<img src={recipe.image} /></Link></li>;
				})}
			</ul>
		);
	}
});
