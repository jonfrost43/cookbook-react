import React from 'react';
import { Link } from 'react-router';

module.exports = React.createClass({
	render: function(){
		return (
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/create">Create new recipe</Link></li>
			</ul>
		);
	}
});
