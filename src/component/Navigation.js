import React from 'react';
import { Link } from 'react-router';

export default function(){
	return (
		<ul>
			<li><Link to="/">Home</Link></li>
			<li><Link to="/create">Create new recipe</Link></li>
		</ul>
	);
}
