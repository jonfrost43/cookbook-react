import { ADD_RECIPE } from './actions.js'

const initialState = {
	recipes: []
}

let nextRecipeId = 1;

export function cookbookApp(state = initialState, action){
	switch (action.type) {
		case ADD_RECIPE:
			if(state.recipes.length){
				nextRecipeId = Math.max.apply(Math, state.recipes.map(recipe => recipe.id)) + 1;
			}

			action.recipe.id = nextRecipeId;

			return Object.assign({}, state, {
				recipes: state.recipes.concat(action.recipe)
			})
		default:
			return state
	}
}
