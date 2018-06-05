import React, { Component, Children } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import NavTop from './component/NavTop';
import Home from './container/Home';
import RecipeForm from './container/RecipeForm';
import Recipe from './container/Recipe';

const RouteWithAppBar = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		<Component {...props}>
			<AppBar title="Cookbook" />
		</Component>
	)} />
)

class App extends Component {
	render(){
		return (
			<div>
				<NavTop />
				<Switch>
					<RouteWithAppBar exact path="/" component={Home} />
					<RouteWithAppBar path="/my" component={Home} />
					<RouteWithAppBar path="/find/:category" component={Home} />
					<RouteWithAppBar path="/create" component={RecipeForm} />
					<RouteWithAppBar path="/recipe/:recipeName/:recipeId/edit" component={RecipeForm} />
					<RouteWithAppBar path="/recipe/:recipeName/:recipeId" component={Recipe} />
				</Switch>
			</div>
		);
	}
}

export default App;
