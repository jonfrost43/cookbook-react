import React from 'react';
import RecipeList from '../component/RecipeList';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setDrawer } from '../model/actions';

const mapStateToProps = state => {
	return {
		app: state.app,
		recipes: state.recipes
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSetDrawer: open => {
			dispatch(setDrawer(open));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({
	onClickFab: function () {
		browserHistory.push('/create');
	},
	toggleDrawer: function(){
		this.props.onSetDrawer(!this.props.app.isDrawerOpen);
	},
	render: function(){
		return (
			<div>
				<AppBar title="Cookbook" onLeftIconButtonTouchTap={this.toggleDrawer} />
				<Drawer
					docked={false}
					open={this.props.app.isDrawerOpen}
					onRequestChange={this.toggleDrawer}
				>
					<AppBar title="Cookbook" onLeftIconButtonTouchTap={this.toggleDrawer} />
					<MenuItem onTouchTap={this.toggleDrawer}>View all recipes</MenuItem>
					<MenuItem onTouchTap={this.toggleDrawer}>Create new recipe</MenuItem>
					<MenuItem onTouchTap={this.toggleDrawer}>Meal planner</MenuItem>
				</Drawer>
				<div className="content">
					<RecipeList recipes={this.props.recipes} />
				</div>
				<FloatingActionButton secondary={true} onClick={this.onClickFab} style={{position: 'fixed', bottom: 12, right: 12}}>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
}));
