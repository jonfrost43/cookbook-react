import { ADD_RECIPE } from './actions.js'

const initialState = {
	recipes: []
}

export function cookbookApp(state = initialState, action){
	switch (action.type) {
		case ADD_RECIPE:
			return Object.assign({}, state, {
				recipes: state.recipes.concat(action.recipe)
			})
		default:
			return state
	}
}
