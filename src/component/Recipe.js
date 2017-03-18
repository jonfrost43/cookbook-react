import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		recipes: state.recipes
	};
};

export default connect(mapStateToProps)(React.createClass({
	onClickBack: function () {
		browserHistory.goBack();
	},

	onClickEdit: function () {
		var recipe = this.props.recipes.filter(recipe => recipe.id === parseInt(this.props.params.recipeId, 10))[0];
		var path = '/edit/'+recipe.id+'/'+recipe.name.replace(/\s/g, '-').toLowerCase();
		browserHistory.push(path);
	},

	render: function(){
		var recipe = this.props.recipes.filter(recipe => recipe.id === parseInt(this.props.params.recipeId, 10))[0];

		return (
			<div className="recipe">
				<AppBar
					title={recipe.name}
					iconElementLeft={<IconButton onClick={this.onClickBack}><NavigationBack /></IconButton>}
					iconElementRight={<IconButton onClick={this.onClickEdit}><EditIcon /></IconButton>}
				/>
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
}));
