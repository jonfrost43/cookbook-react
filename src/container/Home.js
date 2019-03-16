import React, { Component, Children } from 'react';
import RecipeList from '../component/RecipeList';
import FloatingActionButton from '@material-ui/core/Fab';
import ContentAdd from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { setDrawer, addRecipe, clearRecipes } from '../model/actions';
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
		clearRecipes: () => {
			dispatch(clearRecipes());
		},
		onSetDrawer: open => {
			dispatch(setDrawer(open));
		}
	};
};

class Home extends Component {
	state = {
		user: null
	}

	constructor(props){
		super();

		console.log(props);

		fetch('/api/user', {credentials: 'include'})
			.then(res => res.ok ? res.json() : null)
			.then(user => this.setState({user: user}));
	}

	componentDidMount(){
		this.fetchRecipes();
	}

	componentDidUpdate(prevProps){
		if(prevProps.location.pathname !== this.props.location.pathname){
			this.props.clearRecipes();
			this.fetchRecipes();
		}
	}

	fetchRecipes(){
		let serviceUrl = '/api/recipes',
			user = '',
			categoryId = '';

		if(this.props.match.path === '/my'){
			user = '/user';
		}

		if(this.props.match.params.category){
			categoryId = '/' + categories.filter(c => c.slug === this.props.match.params.category)[0].value;
		}

		return fetch(`/api${user}/recipes${categoryId}`, {credentials: 'include'})
				.then(res => res.ok ? res.json() : null)
				.then(recipes => {
					if(recipes.length){
						recipes.forEach(this.props.addRecipe);
					}
				});
	}

	onClickFab = () => {
		this.props.history.push('/create');
	}

	toggleDrawer = () => {
		this.props.onSetDrawer(!this.props.app.isDrawerOpen);
	}

	render(){
		let appBar = Children.only(this.props.children);

		return (
			<div>
				{React.cloneElement(appBar, Object.assign({}, appBar.props, {
					onLeftIconButtonClick: this.toggleDrawer
				}))}

				<div className="content">
					<RecipeList recipes={this.props.recipes} />
				</div>
				<FloatingActionButton className={!this.state.user ? 'hidden' : ''} secondary={true} onClick={this.onClickFab} style={{position: 'fixed', bottom: 20, right: 20}}>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
