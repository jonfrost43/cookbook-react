import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Home from './container/Home';
import RecipeForm from './container/RecipeForm';
import Recipe from './container/Recipe';
import { connect } from 'react-redux';
import { setDrawer } from './model/actions';

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
	toggleDrawer = () => {
		this.props.onSetDrawer(!this.props.app.isDrawerOpen);
	}

	render(){
		console.log(this);
		return (
			<div>
				<AppBar title="Cookbook" onLeftIconButtonTouchTap={this.toggleDrawer} />
				<Drawer
					docked={false}
					open={this.props.app.isDrawerOpen}
					onRequestChange={this.props.app.toggleDrawer}
					>
					<AppBar title="Cookbook" onLeftIconButtonTouchTap={this.toggleDrawer} />
					<MenuItem onTouchTap={this.toggleDrawer}>View all recipes</MenuItem>
					<MenuItem onTouchTap={this.toggleDrawer}>Create new recipe</MenuItem>
					<MenuItem onTouchTap={this.toggleDrawer}>Meal planner</MenuItem>
				</Drawer>
				{this.props.children}
			</div>
		);
	}
}

const Shell = connect(mapStateToProps, mapDispatchToProps)(_Shell);

let handleChange = (p, n) => {
	console.log(p, n);
}

class App extends Component {
	render(){
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Shell} onChange={handleChange}>
					<IndexRoute activeClassName="active" component={Home} />
					<Route name="create" path="/create" activeClassName="active" component={RecipeForm} appBarTitle={'Create recipe'} />
					<Route path="/edit/:recipeId/:recipeName" activeClassName="active" component={RecipeForm} />
					<Route path="/recipe/:recipeId/:recipeName" activeClassName="active" component={Recipe} />
				</Route>
			</Router>
		);
	}
}

export default App;
