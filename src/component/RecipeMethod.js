import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

var RecipeMethodStep = React.createClass({
	render: function () {
		var index = this.props.index;
		return (
			<li>
				<TextField name={'methodStep'+index} multiLine={true} rows={2} />
			</li>
		);
	}
});

var RecipeMethod = React.createClass({
	getInitialState: function(){
		return {
			steps: [{text: ''}]
		};
	},

	add: function(){
		this.setState({
			steps: this.state.steps.concat({text: ''})
		});
	},

	render: function(){
		return (
			<fieldset className="method">
                <legend>Method</legend>
				<ol>
				{this.state.steps.map(function(step, index){
					return <RecipeMethodStep key={index} index={index}></RecipeMethodStep>;
				})}
				</ol>
				<FlatButton label="Add step" primary={true} onClick={this.add} />
            </fieldset>
		);
	}
});

export default RecipeMethod;
