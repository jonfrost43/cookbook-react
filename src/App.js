import React, { Component, Children } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import NavTop from './component/NavTop';
import Home from './container/Home';
import RecipeForm from './container/RecipeForm';
import Recipe from './container/Recipe';

const RouteWithAppBar = props => (
	<Route path={props.path} exact={props.exact} render={props2 => (
		<props.component match={props2.match} location={props2.location} history={props2.history}>
			<AppBar title="Cookbook" />
		</props.component>
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
