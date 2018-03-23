import React, { Component } from 'react';
import RecipeList from '../component/RecipeList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setDrawer, addRecipe } from '../model/actions';
import categories from '../data/categories';

const mapStateToProps = state => {
	return {
		app: state.app,
		recipes: state.recipes
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addRecipe: recipe => {
			dispatch(addRecipe(recipe));
		},
		onSetDrawer: open => {
			dispatch(setDrawer(open));
		}
	};
};

class Home extends Component {
	constructor(){
		super();

		fetch('/api/recipes', {credentials: 'include'})
			.then(res => res.ok ? res.json() : null)
			.then(recipes => {
				if(recipes.length){
					recipes.forEach(recipe => {
						this.props.addRecipe(recipe);
					});
				}
			});
	}

	onClickFab(){
		browserHistory.push('/create');
	}

	toggleDrawer = () => {
		this.props.onSetDrawer(!this.props.app.isDrawerOpen);
	}

	render(){
		let categoryId = this.props.params.category ? categories.filter(c => c.slug === this.props.params.category)[0].value : null;
		let recipes = categoryId ? this.props.recipes.filter(r => r.category === categoryId) : this.props.recipes;
		return (
			<div>
				{this.props.children}
				<div className="content">
					<RecipeList recipes={recipes} />
				</div>
				<FloatingActionButton secondary={true} onClick={this.onClickFab} style={{position: 'fixed', bottom: 20, right: 20}}>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
