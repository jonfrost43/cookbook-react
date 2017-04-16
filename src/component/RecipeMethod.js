import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class RecipeMethodStep extends Component {
	onTextChange = (e, value) => {
		this.props.onChange(this.props.index, {text: value});
	}

	render(){
		let index = this.props.index;
		return (
			<li>
				<TextField
					name={'methodStep'+index}
					value={this.props.text}
					multiLine={true}
					rows={2}
					style={{width:'100%'}}
					onChange={this.onTextChange}
				/>
			</li>
		);
	}
}

const RecipeMethod = props => {
	return (
		<fieldset className="method">
            <legend>Method</legend>
			<ol>
			{props.method.map((step, index) => {
				return <RecipeMethodStep key={index} index={index} text={step.text} onChange={props.onChange}></RecipeMethodStep>;
			})}
			</ol>
			<RaisedButton label="Add step" primary={true} onClick={props.add} style={{float:'right'}} />
        </fieldset>
	);
}

export default RecipeMethod;
