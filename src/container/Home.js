import React, { Component } from 'react';
import RecipeList from '../component/RecipeList';
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

class Home extends Component {
	onClickFab(){
		browserHistory.push('/create');
	}

	toggleDrawer = () => {
		this.props.onSetDrawer(!this.props.app.isDrawerOpen);
	}

	render(){
		return (
			<div>
				{this.props.children}
				<div className="content">
					<RecipeList recipes={this.props.recipes} />
				</div>
				<FloatingActionButton secondary={true} onClick={this.onClickFab} style={{position: 'fixed', bottom: 12, right: 12}}>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
