//action types

export const ADD_RECIPE = 'ADD_RECIPE'

//action creators

export function addRecipe(recipe){
	return {
		type: ADD_RECIPE,
		recipe: Object.assign({
			ingredients: []
		}, recipe)
	}
}
