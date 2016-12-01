//action types

export const ADD_RECIPE = 'ADD_RECIPE'

//action creators

let nextRecipeId = 1;

export function addRecipe(recipe){
	return {
		type: ADD_RECIPE,
		recipe: Object.assign({
			id: nextRecipeId++,
			ingredients: []
		}, recipe)
	}
}
