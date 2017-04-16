import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class RecipeMethodStep extends Component {
	render(){
		let index = this.props.index;
		return (
			<li>
				<TextField name={'methodStep'+index} multiLine={true} rows={2} style={{width:'100%'}} />
			</li>
		);
	}
}

class RecipeMethod extends Component {
	state = {
		steps: [{text: ''}]
	}

	add = () => {
		this.setState({
			steps: this.state.steps.concat({text: ''})
		});
	}

	render(){
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
}

export default RecipeMethod;
