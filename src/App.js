import React, { Component, Children } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import AppBar from 'material-ui/AppBar';
import NavTop from './component/NavTop';

const RouteWithAppBar = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		<Component {...props}>
			<AppBar title="Cookbook" />
		</Component>
	)} />
)

const Loading = () => <div>Loading...</div>

const Home = Loadable({
	loader: () => import('./container/Home'),
	loading: Loading
})

const Recipe = Loadable({
	loader: () => import('./container/Recipe'),
	loading: Loading
})

const RecipeForm = Loadable({
	loader: () => import('./container/RecipeForm'),
	loading: Loading
})

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
