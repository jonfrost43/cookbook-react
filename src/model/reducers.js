import { SET_DRAWER, ADD_RECIPE, EDIT_RECIPE, DELETE_RECIPE } from './actions.js'

const initialState = {
	app: {
		isDrawerOpen: false
	},
	recipes: []
}

let nextRecipeId = 1;

export function cookbookApp(state = initialState, action){
	switch (action.type) {
		case SET_DRAWER:
			return Object.assign({}, state, {
				app: Object.assign({}, state.app, {
					isDrawerOpen: action.open
				})
			})

		case ADD_RECIPE:
			if(state.recipes.length){
				nextRecipeId = Math.max.apply(Math, state.recipes.map(recipe => recipe.id)) + 1;
			}

			action.recipe.id = nextRecipeId;

			return Object.assign({}, state, {
				recipes: state.recipes.concat(action.recipe)
			})

		case EDIT_RECIPE:
			return Object.assign({}, state, {
				recipes: state.recipes.map(recipe => {
					if(recipe.id === action.recipe.id){
						return action.recipe
					}
					return recipe
				})
			})

		case DELETE_RECIPE:
			return Object.assign({}, state, {
				recipes: state.recipes.filter(recipe => recipe.id !== action.recipeId)
			})

		default:
			return state
	}
}
