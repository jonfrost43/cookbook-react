import React, { Component, Children } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import Home from './container/Home';
import RecipeForm from './container/RecipeForm';
import Recipe from './container/Recipe';
import { connect } from 'react-redux';
import { setDrawer } from './model/actions';
import recipes from './data/recipes';
import categories from './data/categories';

const mapStateToProps = state => {
	return {
		app: state.app
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSetDrawer: open => {
			dispatch(setDrawer(open));
		}
	};
};

class _Shell extends Component {
	state = {
		user: null
	}

	constructor(){
		super();

		fetch('/api/user', {credentials: 'include'})
			.then(res => res.ok ? res.json() : null)
			.then(user => this.setState({user: user}));
	}

	handleClick = data => {
		browserHistory.push('/find/'+data.category);
		this.toggleDrawer();
	}

	handleAuthClick = () => {
		window.location = this.state.user ? '/auth/logout' : 'auth/google';
	}

	toggleDrawer = () => {
		this.props.onSetDrawer(!this.props.app.isDrawerOpen);
	}

	render(){
		let AuthLink = props => <MenuItem onTouchTap={this.handleAuthClick}>{this.state.user ? 'Sign out' : 'Sign in with Google'}</MenuItem>;

		return (
			<div>
				<Drawer docked={false} open={this.props.app.isDrawerOpen} onRequestChange={this.props.app.toggleDrawer}>
					<AppBar title="Cookbook" onLeftIconButtonTouchTap={this.toggleDrawer} />
					<AuthLink />
					<MenuItem onTouchTap={this.toggleDrawer}>View all recipes</MenuItem>
					<List>
						<ListItem primaryText="Find by category" primaryTogglesNestedList={true}
							nestedItems={categories.map(c => <ListItem key={c.value} onTouchTap={() => this.handleClick({category: c.slug})} primaryText={c.label} />)}
						/>
					</List>
					<MenuItem onTouchTap={this.toggleDrawer}>Create new recipe</MenuItem>
					<MenuItem onTouchTap={this.toggleDrawer}>Meal planner</MenuItem>
				</Drawer>
				{Children.map(this.props.children, child => {
					return React.cloneElement(child, null, <AppBar title="Cookbook" onLeftIconButtonTouchTap={this.toggleDrawer} />)
				})}
			</div>
		);
	}
}

const Shell = connect(mapStateToProps, mapDispatchToProps)(_Shell);

class App extends Component {
	render(){
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Shell}>
					<IndexRoute activeClassName="active" component={Home} />
					<Route path="/find/:category" activeClassName="active" component={Home} />
					<Route path="/create" activeClassName="active" component={RecipeForm} />
					<Route path="/edit/:recipeId/:recipeName" activeClassName="active" component={RecipeForm} />
					<Route path="/recipe/:recipeId/:recipeName" activeClassName="active" component={Recipe} />
				</Route>
			</Router>
		);
	}
}

export default App;
