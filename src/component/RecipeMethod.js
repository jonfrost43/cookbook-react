import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

var RecipeMethodStep = React.createClass({
	render: function () {
		var index = this.props.index;
		return (
			<li>
				<TextField name={'methodStep'+index} multiLine={true} rows={2} style={{width:'100%'}} />
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
				<RaisedButton label="Add step" primary={true} onClick={this.add} style={{float:'right'}} />
            </fieldset>
		);
	}
});

export default RecipeMethod;
