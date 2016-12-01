import React from 'react';
import RecipeList from './RecipeList';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		recipes: state.recipes
	};
};

export default connect(mapStateToProps)(React.createClass({
	onClickFab: function () {
		browserHistory.push('/create');
	},
	render: function(){
		console.log(this);
		return (
			<div>
				<AppBar title={'Cookbook'} />
				<div className="content">
					<RecipeList data={this.props.recipes} />
				</div>
				<FloatingActionButton secondary={true} onClick={this.onClickFab} style={{position: 'fixed', bottom: 12, right: 12}}>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
}));
