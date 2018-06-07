import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { setDrawer } from '../model/actions';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import categories from '../data/categories';

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

class NavTop extends Component {
	state = {
		user: null
	}

	constructor(){
		super();

		fetch('/api/user', {credentials: 'include'})
			.then(res => res.ok ? res.json() : null)
			.then(user => this.setState({user: user}));
	}

	goTo = path => {
		this.props.history.push(path);
		this.toggleDrawer();
	}

	toggleDrawer = () => {
		this.props.onSetDrawer(!this.props.app.isDrawerOpen);
	}

	handleAuthClick = () => {
		window.location = this.state.user ? '/auth/logout' : 'auth/google';
	}

	render(){
		let AuthLink = props => <MenuItem onTouchTap={this.handleAuthClick}>{this.state.user ? 'Sign out' : 'Sign in with Google'}</MenuItem>;

		return (
			<Drawer docked={false} open={this.props.app.isDrawerOpen} onRequestChange={this.props.app.toggleDrawer}>
				<AppBar title="Cookbook" onLeftIconButtonClick={this.toggleDrawer} />
				<AuthLink />
				<MenuItem onTouchTap={() => this.goTo('/')}>View all recipes</MenuItem>
				<MenuItem onTouchTap={() => this.goTo('/my')}>View my recipes</MenuItem>
				<List>
					<ListItem primaryText="Find by category" primaryTogglesNestedList={true}
						nestedItems={categories.map(c => <ListItem key={c.value} onTouchTap={() => this.goTo('/find/' + c.slug)} primaryText={c.label} />)}
					/>
				</List>
				<MenuItem onTouchTap={() => this.goTo('/create')}>Create new recipe</MenuItem>
				<MenuItem onTouchTap={this.toggleDrawer}>Meal planner</MenuItem>
			</Drawer>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavTop));
